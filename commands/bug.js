const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        if (!args[0]) return client.cmdError(message, cmd);

        const report = args.join(" ");

        // Instead of using the cmd.help.name, we'll use the action that was
        // actually called
        const command = message.content.slice(message.settings.prefix.length).trim().split(/ +/g).shift().toLowerCase();

        const embed = new RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0x7289DA)
            .setTimestamp()
            .setDescription(`**${command.toProperCase()}:** ${report}`);

        // Change the color of the embed to easily differentiate between bugs and
        // suggestions
        if (command === "bug" || command === "bugs") embed.setColor(0xE68D60);
        if (command === "suggestion" || command === "suggestions") embed.setColor(0x009800);

        // Here we'll send the report to the Bot Owner and also to the botlog database
        try {
            const permLevel = client.config.permLevels.find(l => l.level === level).name;
            await client.users.get(client.config.ownerID).send({embed});
            await client.doSQL(
                "INSERT INTO buglog (timestamp, type, userId, permLevel, report) VALUES (?, ?, ?, ?, ?)",
                [new Date(), command, message.author.id.toString(), permLevel, report]
            );
        } catch (error) {
            client.errlog(cmd, message, level, error);
            client.logger.error(client, `Couldn't send bug to Necavit\n${error.stack}`);
        }
        await message.reply(`I just sent **Necavit#0540** the **${command}**! Thank you for your feedback!`);

        // Let's reward anyone who submits bugs or suggestions with double pionts
        client.addPoints(message, client.config.messagePoints*2);

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `bug command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bugs", "report", "suggestion", "suggestions", "complaint", "typo", "typos"],
    arguments: [],
    permLevel: "User"
};

exports.help = {
    name: "bug",
    category: "Miscellaneous",
	description: "Report bugs, typos or suggestions about this bot",
	usage: "<bug|suggestion> <message>",
    examples: ["bug The ping command doesn't pong", "suggestion Make an Order 66 command!"]
};
