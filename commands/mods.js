// These are the ID codes for the different mod emojis hosted
// on the Mouse Bot Support Server
const modsEmojis = {
    // Slots
    "Square": "418109875395231755",
    "Arrow": "418109874644189204",
    "Diamond": "418109874984058891",
    "Triangle": "418109875562872832",
    "Circle": "418109874682200066",
    "Cross": "418109874661097473",

    // Types
    "Health": "418109953560281104",
    "Defense": "418109953040187405",
    "Crit Damage": "418109953287520266",
    "Crit Chance": "418109952947650561",
    "Tenacity": "418109953996488715",
    "Offense": "418109953870397461",
    "Potency": "418109953895563264",
    "Speed": "418109954101346304"
};

function getModType(modDescription) {
    if (modDescription.includes("Health")) return "Health";
    if (modDescription.includes("Defense")) return "Defense";
    if (modDescription.includes("Crit Damage")) return "Crit Damage";
    if (modDescription.includes("Crit Chance")) return "Crit Chance";
    if (modDescription.includes("Tenacity")) return "Tenacity";
    if (modDescription.includes("Offense")) return "Offense";
    if (modDescription.includes("Potency")) return "Potency";
    if (modDescription.includes("Speed")) return "Speed";
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == "object") {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


const { RichEmbed } = require("discord.js");
const fuzzy = require("fuzzy-predicate");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    // Cool star emojis! Just like in the game!
    const starEmoji = client.emojis.get("416420499078512650");
    const inactiveStarEmoji = client.emojis.get("416422867606044683");

    // Check for a username
    const [id, searchTerm, error] = client.profileCheck(message, args);
    if (id === undefined) return message.reply(error).then(client.cmdError(message, cmd));
    if (searchTerm.length < 2) return message.reply("please use 2 or more letters to search for characters, I don't want to spam your channel with every character.");

    const chMessage = await message.channel.send("Checking... this may take a minute. 👀"); // wait message

    // Cache collection and mods ("cm") if needed
    const updated = await client.cacheCheck(message, id, "cm");
    const collection = client.cache.get(id + "_collection");
    const mods = client.cache.get(id + "_mods");

    const lookup = client.swgohData.get("charactersData").filter(fuzzy(searchTerm, ["name", "nickname"]));

    if (collection.length < 1) return chMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));

    // Loop through the collection array ("description") and add any matching
    // "characters" from the mods array
    const modsLookup = [];
    for (var z = 0; z < lookup.length; z++) {
        const chData = getObjects(collection, "description", lookup[z].name);
        Object.assign(lookup[z], chData[0]);

        modsLookup.push(getObjects(mods, "character", lookup[z].name));
    }

    for (var i = 0; i < lookup.length; i++) {
        const starString = `${starEmoji}`.repeat(lookup[i].star) + `${inactiveStarEmoji}`.repeat(7 - lookup[i].star);
        const embed = new RichEmbed()
            .setTitle(`${id.toProperCase()}'s ${lookup[i].description}`)
            .setDescription(`${starString}
Level ${lookup[i].level}  |  Gear ${lookup[i].gearLevel}
Galactic Power: ${lookup[i].galacticPower.toLocaleString()} *(${Math.round(lookup[i].galacticPower/lookup[i].maxGalacticPower*100)}% of max)*`)
            .setColor(0xEE7100)
            .setThumbnail(`https://${lookup[i].imageSrc}`)
            .setURL(`https://swgoh.gg/u/${id.toLowerCase()}/collection/${lookup[i].code}`)
            .setFooter(`Last updated ${updated}`, "https://swgoh.gg/static/img/bb8.png");

            // Iterate to get each mod
            for (var j = 0; j < modsLookup[i].length; j++) {
                if (lookup[i].name == modsLookup[i][j].character) {
                    const typeEmoji = client.emojis.get(modsEmojis[getModType(modsLookup[i][j].description)]); // Find the type of mod
                    const slotEmoji = client.emojis.get(modsEmojis[modsLookup[i][j].slot]); // Store the mod slot
                    const fieldTitle = `${slotEmoji}${typeEmoji} (Lv ${modsLookup[i][j].level})`;

                    let secondaryValue = "";

                    // Iterate to get the secondary values of each mod
                    for (var k = 0; k < modsLookup[i][j].secondary.length; k++) {
                        secondaryValue += `${modsLookup[i][j].secondary[k].value.replace("+", "")} ${modsLookup[i][j].secondary[k].type}\n`;
                    }

                    // Now display all the mod details
                    const fieldText = `**${modsLookup[i][j].primary.value.replace("+", "")} ${modsLookup[i][j].primary.type}**\n${secondaryValue}`;
                    embed.addField(fieldTitle, fieldText, true);
                }
            }

            // Now that the embed is fully created for one character, we can send it
            message.channel.send({ embed });
    }

    // Change the waiting message before we're done
    await chMessage.edit("Here's what I found:");

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["character", "ch", "mod"],
    permLevel: "User"
};

exports.help = {
    name: "mods",
    category: "Game",
    description: "Looks up character stats and mods on swgoh.gg",
    usage: "mods ~[swgoh.gg-username] <character>",
    examples: ["mods ~necavit Luke", "mods @Necavit#0540 leia", "mods r2", "ch han"]
};
