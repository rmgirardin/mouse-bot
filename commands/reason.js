// This command changes the reason of any modlog embed based on the case number
// CAUTION: As of now, this command removes the author image and the timestamp

async function embedSan(embed) {
    embed.message ? delete embed.message : null;
    embed.footer ? delete embed.footer.embed : null;
    embed.provider ? delete embed.provider.embed : null;
    embed.thumbnail ? delete embed.thumbnail.embed : null;
    embed.image ? delete embed.image.embed : null;
    embed.author ? delete embed.author.embed : null;
    embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
    return embed;
}

exports.run = async  (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);
    const modlog = message.guild.channels.find("name", settings.modLogChannel);
    const caseNumber = args.shift();
    const newReason = args.join(" ");

    await modlog.fetchMessages({limit:100}).then((messages) => {
        const caseLog = messages.filter(m => m.author.id === client.user.id &&
            m.embeds[0] &&
            m.embeds[0].type === "rich" &&
            m.embeds[0].footer &&
            m.embeds[0].footer.text === `Case ${caseNumber}`
        ).first();
        modlog.fetchMessage(caseLog.id).then(logMsg => {
            const embed = logMsg.embeds[0];
            embedSan(embed);
            const reasonIndex = embed.description.indexOf("Reason:");
            embed.description = embed.description.slice(0, reasonIndex + 10) + newReason;
            logMsg.edit({embed});
        });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
  name: "reason",
  category: "System",
  description: "Updates the reason of a mod action",
  usage: "reason <case-number> <new-reason>",
  examples: ["reason 21 He was getting out of control", "reason 66 The Jedi had to be eliminated"]
};
