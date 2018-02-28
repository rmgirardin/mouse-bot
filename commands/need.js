// This command uses the user's collection on swgoh.gg and compares it to the
// characters list in the shipments file. Any matching characters that are less
// than 7* will be reported as still needed.

const { RichEmbed } = require("discord.js");
const shipments = require("../modules/shipments.js");
const fuzzy = require("fuzzy-predicate");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    let [id, searchTerm, error] = client.profileCheck(message, args); // eslint-disable-line prefer-const
    if (id === undefined) return message.reply(error).then(client.cmdError(message, cmd));

    // Pull in our swgoh databases
    const charactersData = client.swgohData.get("charactersData");
    const shipsData = client.swgohData.get("shipsData");

    const needMessage = await message.channel.send("Checking... One moment. 👀"); // wait message

    // Cache check and pull the user's data
    const updated = await client.cacheCheck(message, id, "cs");
    const characterCollection = client.cache.get(id + "_collection");
    if (characterCollection.length < 1) return needMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));
    const shipCollection = client.cache.get(id + "_ships");

    // Clean text
    searchTerm = searchTerm.toLowerCase().replace(/shop|store|shipment|squad/g, "")
        .replace(/gw/g, "galactic war").replace(/ship|fleet arena/g, "fleet")
        .trim();

    // Search for a shipments image, because it looks nice in the embed
    const shopCheck = shipments[searchTerm];
    let shopImage;
    if (shopCheck || shopCheck != undefined) shopImage = shipments[searchTerm]["image"];

    // Okay, lets finally do some searching
    const chLookup = charactersData.filter(fuzzy(searchTerm, ["faction", "shops"]));
    const sLookup = shipsData.filter(fuzzy(searchTerm, ["faction", "shops"]));

    // Creating the embed
    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setAuthor(`${id.toProperCase()}'s Needs for ${searchTerm.toProperCase()}`)
        .setThumbnail(shopImage)
        .setColor(0xEE7100)
        .setDescription("*Need Shards (current status)*")
        .setURL("https://swgoh.gg/db/shipments/")
        .setFooter(`Last updated ${updated}`, "https://swgoh.gg/static/img/bb8.png");

    let charDescription = "";
    let shipDescription = "";

    // Now we crosscheck with the swgoh.gg account and update the embeds
    for (let i = 0; i < chLookup.length; i++) {

        const foundCharacter = characterCollection.find(c => c.description === chLookup[i].name);

        if (foundCharacter) {
            const rank = Number(foundCharacter.star);
            if (rank < 7) charDescription = `${charDescription}\n${client.checkClones(chLookup[i].name)} (${rank} star)`;
        } else {
            charDescription = `${charDescription}\n**${chLookup[i].name}** (not activated)`;
        }
    }

    for (let j = 0; j < sLookup.length; j++) {

        const foundShip = shipCollection.find(s => s.description === sLookup[j].name);

        if (foundShip) {
            const rank = Number(foundShip.star);
            if (rank < 7 && rank != 0) shipDescription = `${shipDescription}\n${foundShip.description.replace(/\\/g, "'")} (${rank} star)`;
            if (rank === 0) shipDescription = `${shipDescription}\n**${sLookup[j].name}** (not activated)`; // Pulls up data with rank 0 as well
        } else {
            shipDescription = `${shipDescription}\n**${sLookup[j].name}** (not activated)`;
        }
    }

    if (charDescription === "" && shipDescription === "") embed.setDescription(`Nothing found!
Either all characters/ships have been maxed out,
or I cannot find a shop or faction for __${searchTerm}__.`);
    if (charDescription != "") embed.addField("__Characters:__", charDescription);
    if (shipDescription != "") embed.addField("__Ships:__", shipDescription);

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
    examples: ["need ~necavit gw", "shipments @Necavit#0540 fleet", "need jedi"]
};
