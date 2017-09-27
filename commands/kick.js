exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const user = message.mentions.users.first();
    if (!user) return client.cmdError(message, cmd);
    if (!message.guild.member(user).kickable) return message.reply(`I cannot ${cmd.help.name} ${user}`);

    const reason = args.slice(1).join(" ");

    await message.guild.member(user).kick(reason).catch(console.error);

    client.modlogEmbed(message, cmd.help.name, 0xFF8300, user, reason);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["boot"],
    permLevel: "Moderator"
};

exports.help = {
    name: "kick",
    category: "System",
	description: "Gives specified user das boot!",
	usage: "kick <username> [reason]",
    examples: ["kick @Necavit0540", "kick @Necavit0540 We don't like him"]
};
