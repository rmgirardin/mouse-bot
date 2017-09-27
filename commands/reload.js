// The Reload command deletes the cache so the next time that specific command
// is run, it'll refresh its code from the file.
// This command can only be run by the bot owner

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args.join() || args.join().size < 1) return client.cmdError(message, cmd);

    let command;
    if (client.commands.has(args[0])) {
        command = client.commands.get(args[0]);
    } else if (client.aliases.has(args[0])) {
        command = client.commands.get(client.aliases.get(args[0]));
    }
    if (!command) return message.channel.send(`${message.author}, the command \`${args[0]}\` doesn't seem to exist, nor is it an alias. Try again!`);
    command = command.help.name;

    delete require.cache[require.resolve(`./${command}.js`)];
    const cmds = require(`./${command}`);
    client.commands.delete(command);
    client.aliases.forEach((cmds, alias) => {
        if (cmds === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmds);
    cmds.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmds.help.name);
    });

    message.channel.send(`${message.author}, the command \`${command}\` has been reloaded.`);

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
