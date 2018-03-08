exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

   // Return and send error message if there are not 2 args
   if (args.length < 2) return client.cmdError(message, cmd);

    while (args.length > 0) {

        // user id in args has the form <@273421645828325377>, so strip of leading <@ and trailing >
        const userId = args.shift().replace(/[<@>]/g, "");

        const user = message.guild.members.get(userId);
        if (!user) return message.reply(`user ${userId} not found.`).then(client.cmdError(message,cmd));
        if (!args[0]) return message.reply(`You didn't provide a swgoh.gg username for ${user}.`).then(client.cmdError(message,cmd));

        let swName = args.shift();
        if (swName.startsWith("http")) {
            const start = swName.indexOf("/u/");
            if (start == -1) client.cmdError(message, cmd);
            const end = swName.lastIndexOf("/");
            swName = swName.slice(start + 3, end);
        }
        if (swName.startsWith("~")) swName = swName.replace("~", "");
        if (swName.startsWith("--")) swName = swName.replace("--", "");

        const id = client.profileTable.get(user.id);

        if (!id) {
            client.profileTable.set(user.id, swName);
            message.reply(`I've added **${swName}** to ${user}'s record.`);
        } else {
            client.profileTable.set(user.id, swName);
            message.reply(`I've changed ${user}'s record from **${id}** to **${swName}**.`);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["au", "addusers"],
    permLevel: "Moderator"
};

exports.help = {
    name: "adduser",
    category: "Game",
	description: "Add the swgoh.gg username for one or more Discord users to the database",
	usage: "adduser <discord-username> <swgoh.gg-username>",
    examples: ["adduser @necavit necavit", "adduser @kyloren sweetsaberdude @hoboyoda theGhost"]
};
