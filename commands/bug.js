const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    const settings = client.settings.get(message.guild.id);
    const report = args.join(" ");

    // Instead of using the cmd.help.name, we'll use the action that was
    // actually called
    const command = message.content.slice(settings.prefix.length).trim().split(/ +/g).shift().toLowerCase();

    const embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(0x7289DA)
        .setTimestamp()
        .setDescription(`**${command.toProperCase()}:** ${report}`);

    // Change the color of the embed to easily differentiate between bugs and
    // suggestions
    if (command === "bug" || command === "bugs") embed.setColor(0xE68D60);
    if (command === "suggestion" || command === "suggestions") embed.setColor(0x009800);


    client.users.get(client.config.ownerID).send({embed}).catch(console.error);

    // Let's reward anyone who submits bugs or suggestions with double pionts
    client.addPoints(message, client.config.messagePoints*2);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bugs", "report", "suggestion", "suggestions", "complaint", "typo", "typos"],
    permLevel: "User"
};

exports.help = {
    name: "bug",
    category: "Miscelaneous",
	description: "Report bugs, typos or suggestions about this bot",
	usage: "<bug/suggestion> <message>"
};
