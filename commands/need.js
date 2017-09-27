// This command uses the user's collection on swgoh.gg and compares it to the
// characters list in the shipments file. Any matching characters that are less
// than 7* will be reported as still needed.

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");
const shipments = require("../modules/shipments.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const needMessage = await message.channel.send("Checking... One moment. 👀");

    if (!args[0]) return client.cmdError(message, cmd);

    // We need to find if there is a mentioned user to check if there a profile
    // for them in the profileTable, otherwise, lookup the manual user input
    const user = message.mentions.users.first();
    let id = args[0];
    let shop = args.slice(1).join(" ");
    if (user) id = client.profileTable.get(user.id);

    let collection = await swgoh.collection(id);
    if (collection.length < 1 || id === "gw"|"galactic war"|"cantina"|"arena"|"guild"|"fleet"|"shard") {
        id = client.profileTable.get(message.author.id);
        shop = args.join(" ");
        collection = await swgoh.collection(id);
    }
    if (collection.length < 1) return needMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));

    shop = shop.toLowerCase().replace(/shop|shops|store|stores|shipment|shipments|squad|squads|battle|battles/g, "")
        .replace(/gw/g, "galactic war").replace(/ship|ships|fleet arena/g, "fleet")
        .trim();

    const shopCharacters = shipments[shop];
    if (!shopCharacters || shopCharacters === undefined) return needMessage.edit(`${message.author}, I can't find that shop. Try using (gw|cantina|arena|guild|fleet|shard)`).then(client.cmdError(message, cmd));

    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setTitle(`${id.toProperCase()}'s Needs for ${shop.toProperCase()} Shop:`)
        .setColor(0xEE7100)
        .setURL("https://swgoh.gg/db/shipments/");

    let description = "__*Character (current status)*__";

    for (let i = 0; i < shopCharacters.length; i++) {

        const character = collection.find(c => c.code === shopCharacters[i]);

        if (character) {
            const rank = Number(character.star);
            if (rank < 7) description = `${description}\n**${client.checkClones(character.description)}** (${character.star} star)`;
            // else if (level === 7) description = `${description}\n${character.description.toProperCase()} ✅`
        } else {
            description = `${description}\n**${client.checkClones(shopCharacters[i].replace(/-/g, " "))}** (locked)`;
        }
    }

    if (description === "__*Character (current status)*__") description = `You currently have maxed all the characters in **${shop}** shipments!`;
    embed.setDescription(description);

    needMessage.edit({ embed });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["shops", "shipment", "shipments"],
    permLevel: "User"
};

exports.help = {
    name: "need",
    category: "Game",
    description: "Let user know which characters they need in shipments",
    usage: "need [swgoh.gg-username/mention] <shop>"
};
