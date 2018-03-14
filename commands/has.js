// This command checks to see if a specified or mentioned user has characters
// which are predefined in the config file through "hasCommand"
// If no args is submitted, the command attempts to search for the author's
// collection

const { RichEmbed } = require("discord.js");
const fuzzy = require("fuzzy-predicate");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    const [id, searchTerm, error] = client.profileCheck(message, args); // eslint-disable-line no-unused-vars
    if (id === undefined) return message.reply(error).then(client.cmdError(message, cmd));

    const hasMessage = await message.channel.send("Checking... One moment. 👀"); // wait message

    // Cache check and pull the user's data
    const [username, updated] = await client.cacheCheck(message, id, "cs");
    const characterCollection = client.cache.get(id + "_collection");
    if (characterCollection.length < 1) return hasMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));
    const shipCollection = client.cache.get(id + "_ships");

    const charactersData = client.swgohData.get("charactersData");
    const shipsData = client.swgohData.get("shipsData");
    let lookup;
    let has = "";
    let notHas = "";

    if (searchTerm.length == 2) lookup = charactersData.filter(fuzzy(searchTerm, "nickname")).concat(shipsData.filter(fuzzy(searchTerm, "nickname")));
    else if (searchTerm.length == 3) lookup = charactersData.filter(fuzzy(searchTerm, ["name", "nickname"])).concat(shipsData.filter(fuzzy(searchTerm, ["name", "nickname"])));
    else lookup = charactersData.filter(fuzzy(searchTerm, ["name", "nickname", "faction"])).concat(shipsData.filter(fuzzy(searchTerm, ["name", "nickname", "faction"])));
    lookup = lookup.sort( (p, c) => p.combat_type > c.combat_type ? 1 : p.name > c.name && p.combat_type == c.combat_type ? 1 : -1 );

    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setTitle(`${username}'s Collection:`)
        .setColor(0xEE7100)
        .setURL(`https://swgoh.gg/u/${id.toLowerCase()}/`)
        .setFooter(`Last updated ${updated}`, "https://swgoh.gg/static/img/bb8.png");

    for (let i = 0; i < lookup.length; i++) {

        let found = characterCollection.find(c => c.description === lookup[i].name);
        if (!found) found = shipCollection.find(s => s.description == lookup[i].name);
        const urlFlip = lookup[i].combat_type == 1 ? "collection" : "ships";
        const isShip = lookup[i].combat_type == 2 ? "ⓢ " : "";

        if (found && found.star != 0) {
            const url = `https://swgoh.gg/u/${id}/${urlFlip}/${found.code}/`;
            has += `${isShip}[${client.checkClones(lookup[i].name)}](${url}) (${found.star})\n`;
        } else {
            notHas += `${isShip}${client.checkClones(lookup[i].name)}\n`;
        }
    }

    if (has != "") {
        if (has.length > 950) client.splitText("✅ ✅ ✅", has, embed);
        else embed.addField("✅ ✅ ✅", has, false);
    }
    if (notHas != "") {
        if (notHas.length > 950) client.splitText("❌ ❌ ❌", notHas, embed);
        else embed.addField("❌ ❌ ❌", notHas, false);
    }
    if (has == "" && notHas == "") return hasMessage.edit(`${message.author}, I couldn't find any characters/ships or factions with __${searchTerm}__ in it.`);
    hasMessage.edit({ embed });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "has",
    category: "Game",
    description: "Checks if the user has certain characters",
    usage: "has ~[swgoh.gg-username]",
    examples: ["has empire", "has tank", "has ~necavit jedi"]
};
