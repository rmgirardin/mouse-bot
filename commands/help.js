exports.run = (client, message, cmd, args, level) => {

    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

    // If no specific command is called, show all filtered commands
    if (!args[0]) {
        // Load guild settings (for prefixes and eventually per-guild tweaks)
        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

        // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

        // Here we have to get the command names only, and we use that array to get the longest name.
        // This make the help commands "aligned" in the output.
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let output = `[ COMMAND LIST ]\n\nUse \`${settings.prefix}help <command-name>\` for details\nCommand Structure: \`${settings.prefix}<command-name> <required-key> [optional-key]\`\n`;

        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\n[ ${cat.toUpperCase()} ]\n`;
                currentCategory = cat;
            }
            output += `${c.help.name}${" ".repeat(longest - c.help.name.length)} = ${c.help.description.replace(/'/g, "")}\n`;
        });

        message.channel.send(output, {code:"ini"});
        message.channel.send("Visit the User Guide for more info: <https://rmgirardin.gitbooks.io/mouse-bot-user-manual/>");
    }

    // If command is specified, show the command details
    else {
        let command = args[0];
        if (client.commands.has(command) || client.commands.get(client.aliases.get(command))) {
            command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (level < client.levelCache[command.conf.permLevel]) return;
            let output = `[ Command: ${command.help.name} ]\n
Description\n=  ${command.help.description}\n
Usage\n=  ${settings.prefix}${command.help.usage}`;
            if (command.conf.aliases.length >= 1) output += `\n\nAliases\n=  ${command.conf.aliases.join(", ")}`;
            output += `\n\nExamples\n=  ${settings.prefix}${command.help.examples.join(`\n=  ${settings.prefix}`)}\n
Permission\n=  ${command.conf.permLevel.replace("User", "Everyone")}`;

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
	usage: "help [command-name]",
    examples: ["help", "help halp", "help convert"]
};
