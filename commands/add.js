const adduser = require("./adduser.js");
const swgoh = require("swgoh").swgoh;

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // If more than one arg, offload to the adduser.js command
    // This command allows moderators to add other user's swgoh.gg usernames
    const userId = message.mentions.users.firstKey();

    if (message.isMentioned(userId) && !message.guild.members.get(userId).user.bot) {

        adduser.run(client, message, cmd, args, level);

    }

    else {
        let swName = args.join(" ");
        if (swName.startsWith("http")) {
            const start = swName.indexOf("/u/");
            if (start == -1) client.cmdError(message, cmd);
            const end = swName.lastIndexOf("/");
            swName = swName.slice(start + 3, end);
            swName = swName.replace(/%20/g, " ");
        }
        if (swName.startsWith("~")) swName = swName.replace("~", "");
        if (swName.startsWith("--")) swName = swName.replace("--", "");
        const id = client.profileTable.get(message.author.id);

        // Save the username
        client.profileTable.set(message.author.id, swName);

        // Manually cache everything!
        client.cache.defer.then(async () => { client.cache.set(id + "_profile", await swgoh.profile(id)); });
        client.cache.defer.then(async () => { client.cache.set(id + "_collection", await swgoh.collection(id)); });
        client.cache.defer.then(async () => { client.cache.set(id + "_ships", await swgoh.ship(id)); });
        client.cache.defer.then(async () => { client.cache.set(id + "_mods", await swgoh.mods(id)); });

        // Notify the user
        if (!id) {
            return message.reply(`I've added **${swName}** to your record.`);
        } else {
            return message.reply(`I've changed your record from **${id}** to **${swName}**.`);
        }
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "add",
    category: "Game",
	description: "Add your swgoh.gg username to the database",
	usage: "add <swgoh.gg-username>",
    examples: ["add necavit", "add hanshotfirst", "add https://swgoh.gg/u/necavit/"]
};
