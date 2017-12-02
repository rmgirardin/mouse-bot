// This runs anytime a message is received
// Every event needs `client, other, args` when this function is run

module.exports = (client, message) => {

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

    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    if (message.content.indexOf(client.user) == 0) args = message.content.slice(client.user.toString().length).trim().split(/ +/g);
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

    // If the command exists **AND** the user has permission
    client.log("log", `${message.author.username} (${client.config.permLevels.find(l => l.level === level).name}, ${message.author.id}) ran ${cmd.help.name}`, "Command");
    cmd.run(client, message, cmd, args, level);

};
