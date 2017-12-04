const { RichEmbed } = require("discord.js");

// This event executes when a member leaves a server

module.exports = (client, member) => {

    if (member.user.bot) return; // Prevents botception!

    const settings = client.settings.get(member.guild.id);

    // Here we delete the user's points from the guild
    // They have to start over from 0 if they rejoin
    const guildUser = member.guild.id + member.id;
    client.pointsTable.delete(guildUser);

    /*
    Send embed to mod-log channel that a member has left the server
    */
    const modlog = member.guild.channels.find("name", settings.modLogChannel);
    if (!modlog || !client.channels.get(modlog.id).permissionsFor(client.user).has("SEND_MESSAGES")) return;

    const embed = new RichEmbed()
        .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.avatarURL)
        .setColor(0xFFA500)
        .setTimestamp()
        .setFooter("User Left");
    return client.channels.get(modlog.id).send({embed});

};
