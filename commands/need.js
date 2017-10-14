// This command uses the user's collection on swgoh.gg and compares it to the
// characters list in the shipments file. Any matching characters that are less
// than 7* will be reported as still needed.

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");
const shipments = require("../modules/shipments.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    let [profile, shop, error] = client.profileCheck(message, args); // eslint-disable-line prefer-const
    if (profile === undefined) return message.reply(error).then(client.cmdError(message, cmd));

    // The courtious "checking" message while the user waits
    const needMessage = await message.channel.send("Checking... One moment. 👀");

    const collection = await swgoh.collection(profile);
    if (collection.length < 1) return needMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));
    const shipCollection = await swgoh.ship(profile);

    shop = shop.toLowerCase().replace(/shop|shops|store|stores|shipment|shipments|squad|squads|battle|battles/g, "")
        .replace(/gw/g, "galactic war").replace(/ship|ships|fleet arena/g, "fleet")
        .trim();

    const shopCheck = shipments[shop];
    if (!shopCheck || shopCheck === undefined) return needMessage.edit(`${message.author}, I can't find that shop. Try using gw | cantina | arena | guild | fleet | shard`).then(client.cmdError(message, cmd));
    const shopCharacters = shipments[shop]["characters"];
    const shopShips = shipments[shop]["ships"];

    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setAuthor(`${profile.toProperCase()}'s Needs for ${shop.toProperCase()} Shop:`, shipments[shop]["image"])
        .setColor(0xEE7100)
        .setURL("https://swgoh.gg/db/shipments/");

    let description = "__***Needed** (current status)*__";

    for (let i = 0; i < shopCharacters.length; i++) {

        const character = collection.find(c => c.code === shopCharacters[i]);

        if (character) {
            const rank = Number(character.star);
            if (rank < 7) description = `${description}\n**${client.checkClones(character.description)}** (${rank} star)`;
        } else {
            description = `${description}\n**${client.checkClones(shopCharacters[i].replace(/-/g, " "))}** (locked)`;
        }
    }

    for (let i = 0; i < shopShips.length; i++) {

        const ship = shipCollection.find(s => s.code === shopShips[i]);

        if (ship) {
            const rank = Number(ship.star);
            if (rank < 7 && rank != 0) description = `${description}\n**${ship.description.replace(/\\/g, "'")}** (${rank} star)`;
        } else {
            description = `${description}\n**${shopShips[i].replace(/-/g, " ").toProperCase().replace("Arc 170", "ARC-170").replace("Tie", "TIE").replace(" Ii", " II")}** (locked)`;
        }
    }

    if (description === "__*Needed (current status)*__") description = `You currently have maxed all the characters/ships in **${shop}** shipments!`;
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
    usage: "need ~[swgoh.gg-username] <shop>",
    examples: ["need ~necavit gw", "shipments @Necavit#0540 fleet shop", "need arena shipments"]
};
