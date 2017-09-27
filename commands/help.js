exports.run = (client, message, cmd, args, level) => {

    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

    // If no specific command is called, show all filtered commands
    if (!args[0]) {
        // Load guild settings (for prefixes and eventually per-guild tweaks)
        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

        // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

        let currentCategory = "";
        let output = `__**COMMAND LIST**__\n(Use \`${settings.prefix}help <command-name>\` for details)\nCommand Structure: \`${settings.prefix}<command-name> <required-key> [optional-key]\`\nVisit the User Guide for more info: <https://rmgirardin.gitbooks.io/mouse-bot-user-manual/>\n`;

        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\n**${cat}:**\n`;
                currentCategory = cat;
            }
            output += `**\`${settings.prefix}${c.help.name}\`** = ${c.help.description}\n`;
        });

        message.channel.send(output);
    }

    // Iff command is specified, show the command details
    else {
        let command = args[0];
        if (client.commands.has(command) || client.commands.get(client.aliases.get(command))) {
            command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (level < client.levelCache[command.conf.permLevel]) return;
            let output = `[ Command: ${command.help.name} ]`;
            if (command.conf.aliases.length >= 1) output += `\n\nAliases\n=  ${command.conf.aliases.join(", ")}`;
            output += `\n\nDescription\n=  ${command.help.description}\n\nUsage\n=  ${settings.prefix}${command.help.usage}`;

            message.channel.send(output, {code:"ini"});
        }

        else return message.channel.send(`${message.author}, I can't find that command.`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp"],
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "System",
	description: "Help command gives help",
	usage: "help [command-name]"
};
