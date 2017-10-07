exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const user = message.mentions.users.first();

    if (!user) return client.cmdError(message, cmd);
    if (!message.guild.member(user).bannable) return message.reply(`I cannot ${cmd.help.name} ${user}`);

    const reason = args.slice(1).join(" ");

    await message.guild.ban(user, reason).catch(console.error);

    client.modlogEmbed(message, cmd.help.name, 0xFF1900, user, reason);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "ban",
    category: "System",
	description: "Bring down the hammer and ban a user!",
	usage: "ban <user-mention> [reason]",
    examples: ["ban @Necavit#0540", "ban @Necavit#0540 We really don't like him"]
};
