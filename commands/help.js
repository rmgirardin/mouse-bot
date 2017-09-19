exports.run = (client, message, cmd, args, level) => {

    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

    if (!args[0]) {
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
        let currentCategory = "";
        let output = `__**COMMAND LIST**__\n(Use \`${settings.prefix}help <command-name>\` for details)\nCommand Structure: \`${settings.prefix}<command-name> <required-key> [optional-key]\`\n`;
        const sorted = myCommands.sort((p, c) => p.help.category > c.help.category
            ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\n**${cat}:**\n`;
                currentCategory = cat;
            }
            output += `**\`${settings.prefix}${c.help.name}\`** = ${c.help.description}\n`;
        });
        message.channel.send(output);
    } else {
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            message.channel.send(`**${command.help.name}** - ${command.help.description}\n\`\`\`${settings.prefix}${command.help.usage}\`\`\``);
        }  else { client.cmdError(message, cmd); }
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
