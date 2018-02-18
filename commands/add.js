const adduser = require("./adduser.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (args.length === 1) {

        let swName = args.join(" ");
        if (swName.startsWith("~")) swName = swName.replace("~", "");
        if (swName.startsWith("--")) swName = swName.replace("--", "");
        const id = client.profileTable.get(message.author.id);

        // Save the username
        client.profileTable.set(message.author.id, swName);

        // Notify the user
        if (!id) {
            return message.reply(`I've added **${swName}** to your record.`);
        } else {
            return message.reply(`I've changed your record from **${id}** to **${swName}**.`);
        }

    }

    // If more than one arg, offload to the adduser.js command
    // This command allows moderators to add other user's swgoh.gg usernames
    else if (args.length > 1) {

        adduser.run(client, message, cmd, args, level);

    }

    else return client.cmdError(message, cmd);

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
    examples: ["add necavit", "add hanshotfirst"]
};
