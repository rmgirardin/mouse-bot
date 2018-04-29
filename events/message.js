// This runs anytime a message is received
// Every event needs `client, other, args` when this function is run

module.exports = async (client, message) => {

    if (message.author.bot) return; // Prevents botception!

    // Grab the settings for this server from the PersistentCollection
    // If there is no guild, get default conf (DMs)
    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    // For ease of use in commands and functions, we'll attach the settings
    // to the message object, so `message.settings` is accessible.
    message.settings = settings;

    // Add a point for a regular message
    client.addPoints(message, client.config.messagePoints);

    // If the bot can't send messages in that channel, let's not even attempt to
    // The user can still get a point, though ^
    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

    if (message.content.indexOf(settings.prefix) !== 0 && message.content.indexOf(client.user) !== 0) return; // Check for prefix or bot mention

    let args = message.content.slice(settings.prefix.length).trim().replace(/\n+/g," ").split(/ +/g);
    if (message.content.indexOf(client.user) == 0) args = message.content.slice(client.user.toString().length).trim().replace(/n+/g," ").split(/ +/g);
    const command = args.shift().toLowerCase();

    const level = client.permlevel(message); // Gets the user's permission level

    // Check whether the command, or alias, exist in the collections defined in index.js.
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    if (!cmd.conf.enabled) return;

    // Some commands may not be useable in DMs. This check prevents those commands from running
    if (cmd && !message.guild && cmd.conf.guildOnly)
        return message.channel.send("This command is unavailable through private message. Please run this command in a server channel.");

    if (level < client.levelCache[cmd.conf.permLevel])
        return message.channel.send(`You do not have permission to use this command.
Your permission level is ${level} **(${client.config.permLevels.find(l => l.level === level).name})**
This command requires level ${client.levelCache[cmd.conf.permLevel]} **(${cmd.conf.permLevel})**`);

    // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
    // The "level" command module argument will be deprecated in the future.
    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    }

    // Give an extra point if they are using a command!
    client.addPoints(message, client.config.messagePoints);

    // If the command exists **AND** the user has permission we can run it
    // but first we will logger and write the command to the database
    client.logger.cmd(client, `${message.author.username} (${client.config.permLevels.find(l => l.level === level).name}, ${message.author.id}) ran ${cmd.help.name}`);
    try {
        await client.doSQL(
            "INSERT INTO cmdlog (timestamp, command, channelId, userId, permLevel) VALUES (?, ?, ?, ?, ?)",
            [new Date(), cmd.help.name, message.channel.id.toString(), message.author.id.toString(), client.config.permLevels.find(l => l.level === level).name]
        );
    } catch (error) {
        client.logger.error(`Failed to write to cmdlog:\n${error.stack}`);
    }

    // And right before we run the command, let's check to see if they are registered
    try {
        const results = await client.doSQL("SELECT * FROM profiles WHERE discordId = ?", [message.author.id.toString()]);
        // If they don't have a stored username, then will send them an introduction
        // message and ask them to register their username before using any commands
        if (results.length === 0 && cmd.help.name != "add") {
            return message.channel.send(`Hello ${message.author}! Before you can use any of my commands, please run \`${settings.prefix}register <swgoh.gg-username>\` first (remember to remove the \`< >\`).\nMost of my commands use data from your profile; registering helps me run with fewer errors. Thanks!`);
        }
        // If they have registered in the past, we'll save the pulled information
        // and pass it to the command so we don't have to pull it again
        else {
            // We can assign the profile results to the message
            message.profile = results[0];
        }
    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(`Failed to write to cmdlog:\n${error.stack}`);
    }

    cmd.run(client, message, cmd, args, level);

};
