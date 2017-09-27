exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const user = message.mentions.users.first();
    const amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
    if (!amount || amount < 2 || amount > 100) return client.cmdError(message, cmd);

    const reason = args.slice(1).join(" ");
    message.channel.fetchMessages({
        limit: amount
    }).then(messages => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

    client.modlogEmbed(message, cmd.help.name, 0xFF8300, "", reason, "", amount);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "System",
  description: "Purges specified number of messages from the channel",
  usage: "purge [user] <number(2-100)> [reason]",
  examples: ["purge @Necavit 50 He was spamming", "purge 20 This channel is messy", "purge 2 @DarthSidious#0066"]
};
