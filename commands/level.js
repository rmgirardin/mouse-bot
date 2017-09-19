const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const settings = client.settings.get(message.guild.id);

    // If points system is off, let user know this is disabled
    // Welcome is on by default
    if (settings.pointsEnabled != "true") return message.channel.send("The points system is disabled for this server.");

    // Instead of just using author.id, we add guild.id to the begining
    // so that points are specific to each guild
    const guildUser = message.guild.id + message.author.id;
    const userPoints = client.pointsTable.get(guildUser);

    const userLevel = client.calcLevel(userPoints);

    // IMPORTANT! If you changed the calcLevel function, you MUST change the
    // equation below!
    const nextLevel = Math.floor(((userLevel+1) / 0.8)*((userLevel+1) / 0.8));

    const embed = new RichEmbed()
        .setAuthor(`${message.author.username} - Level ${userLevel.toLocaleString()}`, message.author.avatarURL)
        .setColor(0x009800)
        .addField("Total Points:", userPoints.toLocaleString(), true)
        .addField("Points to Next Level:", nextLevel.toLocaleString(), true);

    await message.channel.send({embed});

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["levels", "lvl", "points"],
    permLevel: "User"
};

exports.help = {
    name: "level",
    category: "Miscelaneous",
	description: "Reports the user's current points and level",
	usage: "level"
};
