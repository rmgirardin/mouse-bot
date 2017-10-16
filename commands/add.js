exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return message.reply("You entered nothing for me to save.").then(client.cmdError(message, cmd));

    let swName = args.join(" ");
    if (swName.startsWith("~")) swName = swName.replace("~", "");
    const id = client.profileTable.get(message.author.id);

    if (!id) {
        client.profileTable.set(message.author.id, swName);
        return message.reply(`I've added **${swName}** to your record.`);
    } else {
        client.profileTable.set(message.author.id, swName);
        return message.reply(`I've changed your record from **${id}** to **${swName}**.`);
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
    examples: ["add necavit", "add hanshotfirst"]
};
