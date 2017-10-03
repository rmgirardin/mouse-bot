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

    if (command.shutdown) {
        await command.shutdown(client);
    }

    const commandName = command.help.name;

    delete require.cache[require.resolve(`./${commandName}.js`)];
    const cmds = require(`./${commandName}`);
    client.commands.delete(cmds.help.name);
    client.aliases.forEach((cmdName, alias) => {
        if (cmdName === cmds.help.name) client.aliases.delete(alias);
    });
    client.commands.set(cmds.help.name, cmds);
    if (cmds.init) {
        cmds.init(client);
    }
    cmds.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmds.help.name);
    });

    message.channel.send(`${message.author}, the command \`${cmds.help.name}\` has been reloaded.`);

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
