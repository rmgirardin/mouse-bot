// The warn command sends the mentioned user a DM letting him know that they
// have been warned and provides the reason if one is given.

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const user = message.mentions.users.first();
    if (!user) return client.cmdError(message, cmd);

    const reason = args.slice(1).join(" ");

    let warnMessage = `The ${client.config.permLevels.find(l => l.level === level).name} ${message.author} has warned you.`;
    if (reason) warnMessage = `${warnMessage} **Reason:** ${reason}`;

    user.send(warnMessage);
    client.modlogEmbed(message, cmd.help.name, 0xFFFF00, user, reason);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "warn",
    category: "System",
    description: "Issues a warning to the mentioned user",
    usage: "warn <user-mention> [reason]",
    examples: ["warn @Necavit#0540", "warn @Necavit#0540 You abused the rules", "warn @R2Z2#8512 He keeps stunning me!"]
};
