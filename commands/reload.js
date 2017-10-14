// The Reload command deletes the cache so the next time that specific command
// is run, it'll refresh its code from the file.
// This command can only be run by the bot owner

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args.join() || args.join().size < 1) return client.cmdError(message, cmd);

    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Error Unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.reply(`Error Loading: ${response}`);

    message.channel.send(`${message.author}, the command \`${args[0]}\` has been reloaded.`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "reload",
    category: "System",
	description: "Reloads a command that has been modified",
	usage: "reload <command>",
    examples: ["reload help", "reload convert"]
};
