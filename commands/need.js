// This command uses the user's collection on swgoh.gg and compares it to the
// characters list in the shipments file. Any matching characters that are less
// than 7* will be reported as still needed.

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (obj.name != undefined) obj[i].parent = obj.name;
        if (typeof obj[i] == "object") {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i].toLowerCase() == val || i == key && val == "") {
            objects.push(obj);
        } else if (obj[i].toLowerCase() == val && key == "") {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");
const shipments = require("../modules/shipments.js");
const characters = require("../modules/characters.js");
const ships = require("../modules/ships.js");


exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    let [profile, searchTerm, error] = client.profileCheck(message, args); // eslint-disable-line prefer-const
    if (profile === undefined) return message.reply(error).then(client.cmdError(message, cmd));

    // The courtious "checking" message while the user waits
    const needMessage = await message.channel.send("Checking... One moment. 👀");

    const characterCollection = await swgoh.collection(profile);
    if (characterCollection.length < 1) return needMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));
    const shipCollection = await swgoh.ship(profile);
    console.log(shipCollection);

    // Clean text
    searchTerm = searchTerm.toLowerCase().replace(/shop|store|shipment|squad/g, "")
        .replace(/gw/g, "galactic war").replace(/ship|fleet arena/g, "fleet")
        .trim();

    // Search for a shipments image, because it looks nice in the embed
    const shopCheck = shipments[searchTerm];
    let shopImage;
    if (shopCheck || shopCheck != undefined) shopImage = shipments[searchTerm]["image"];

    // Okay, lets finally do some searching
    const searchCharacters = getObjects(characters, "", searchTerm);
    const foundCharacters = [];
    for (var j in searchCharacters) {
        foundCharacters.push(searchCharacters[j].parent);
    }

    const searchShips = getObjects(ships, "", searchTerm);
    const foundShips = [];
    for (var k in searchShips) {
        foundShips.push(searchShips[k].parent);
    }

    // Creating the embed
    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setAuthor(`${profile.toProperCase()}'s Needs for ${searchTerm.toProperCase()}`, shopImage)
        .setColor(0xEE7100)
        .setDescription("*Need Shards (current status)*")
        .setURL("https://swgoh.gg/db/shipments/");

    let charDescription = "";
    let shipDescription = "";

    // Now we crosscheck with the swgoh.gg account and update the embeds
    for (let i = 0; i < foundCharacters.length; i++) {

        const swgohggCharacter = characterCollection.find(c => c.description === foundCharacters[i]);

        if (swgohggCharacter) {
            const rank = Number(swgohggCharacter.star);
            if (rank < 7) charDescription = `${charDescription}\n${client.checkClones(swgohggCharacter.description)} (${rank} star)`;
        } else {
            charDescription = `${charDescription}\n**${foundCharacters[i]}** (not activated)`;
        }
    }

    for (let i = 0; i < foundShips.length; i++) {

        const swgohggShip = shipCollection.find(s => s.description === foundShips[i]);

        if (swgohggShip) {
            const rank = Number(swgohggShip.star);
            if (rank < 7 && rank != 0) shipDescription = `${shipDescription}\n${swgohggShip.description.replace(/\\/g, "'")} (${rank} star)`;
            if (rank === 0) shipDescription = `${shipDescription}\n**${foundShips[i]}** (not activated)`; // For some reason, 'else' wasn't working
        } else {
            shipDescription = `${shipDescription}\n**${foundShips[i]}** (not activated)`;
        }
    }

    if (charDescription === "" && shipDescription === "") embed.setDescription(`Nothing found!
Either all characters/ships have been maxed out,
or I cannot find anything for __${searchTerm}__.`);
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
