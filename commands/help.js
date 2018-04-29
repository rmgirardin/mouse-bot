exports.run = async (client, message, cmd, args, level) => {

    try {

        // If no specific command is called, show all filtered commands
        if (!args[0]) {
            // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
            const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.enabled) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true && cmd.conf.enabled);

            let currentCategory = "";
            let output = `**__COMMAND LIST__**\nUse \`${message.settings.prefix}help <command-name>\` for details\n`;

            const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
            sorted.forEach( c => {
                const cat = c.help.category.toProperCase();
                if (currentCategory !== cat) {
                    output += `\n**${cat.toUpperCase()}:**\n`;
                    currentCategory = cat;
                }
                output += `**\`${message.settings.prefix}${c.help.name}\`** - ${c.help.description}\n`;
            });

            await message.channel.send(output);
            await message.channel.send("Visit the User Guide for more info: <https://rmgirardin.gitbooks.io/mouse-bot-user-manual/>");
        }

        // If command is specified, show the command details
        else {
            const commandName = args[0];
            if (client.commands.has(commandName) || client.commands.get(client.aliases.get(commandName))) {
                const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
                if (level < client.levelCache[command.conf.permLevel]) return await message.channel.send(`${message.author}, you don't have the permissions to use that command.`);
                if (!command.conf.enabled) return await message.channel.send(`${message.author}, I can't find that command.`);
                let output = `Command:  **__${command.help.name}__**
Description:  **${command.help.description}**
Permission:  **${command.conf.permLevel.replace("User", "Everyone")}**`;
                if (command.conf.aliases.length >= 1) output += `\nAliases:  **${command.conf.aliases.join(", ")}**`;
                output += `\nUsage:\`\`\`${message.settings.prefix}${command.help.usage}\n\`\`\`
Examples:\`\`\`\n${message.settings.prefix}${command.help.examples.join(`\n${message.settings.prefix}`)}\n\`\`\`
<https://rmgirardin.gitbooks.io/mouse-bot-user-manual/content/${command.help.name}.html>`;

                await message.channel.send(output);
            }

            else return await message.channel.send(`${message.author}, I can't find that command.`);
        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `help command failure:\n${error.stack}`);
        client.codeError(message);
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
