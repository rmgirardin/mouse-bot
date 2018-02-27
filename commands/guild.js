function splitText(title, text, embed) {

    let bool = true;
    while (bool) {

        // Find where to split the text without cutting anything off
        const index = text.lastIndexOf("\n", 950);

        const first = text.substr(0, index);
        const second = text.substr(index + 1);

        embed.addField(title, first, false);

        // Test if the second part of the text is still too long
        if (second.length > 950) {
            text = second;
            title = "-";
        } else {
            embed.addField("-", second, false);
            bool = false;
        }

    }
}

const { RichEmbed } = require("discord.js");
const request = require("request-promise-native");
const fuzzy = require("fuzzy-predicate");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // Cool star emojis! Just like in the game!
    const starEmoji = client.emojis.get("416420499078512650");
    const inactiveStarEmoji = client.emojis.get("416422867606044683");

    // Pull in our swgoh databases
    const charactersData = client.swgohData.get("charactersData");

    const [id, searchText, error] = await client.profileCheck(message, args); // eslint-disable-line no-unused-vars
    if (id === undefined) return message.reply(error).then(client.cmdError(message, cmd));
    const splitSearchText = searchText.split(" ");

    const guildMessage = await message.channel.send("Checking... One moment. 👀");

    // Break down the given variables from args
    const searchRarity = parseFloat(splitSearchText.filter(arg => Number.isInteger(parseFloat(arg)))) ? parseFloat(splitSearchText.filter(arg => Number.isInteger(parseFloat(arg)))) : 1;
    const searchTerm = splitSearchText.filter(arg => !Number.isInteger(parseFloat(arg))).join(" ");
    if (searchTerm.length < 3) return guildMessage.edit(`${message.author}, please use 3 or more letters to search for characters, I don't want to spam your channel with every character.`);

    // Setting up guild id and url for swgoh.gg/api
    let profile = client.cache.get(id + "_profile");
    // Only cache if needed to
    if (profile == undefined) {
        await client.cacheCheck(message, id, "");
        profile = client.cache.get(id + "_profile");
    } else client.cacheCheck(message, id, ""); // But if we don't need to cache, just do it in the background
    const guildInfo = profile.guildUrl.split("/");
    const guildNum = guildInfo[2];
    const guildName = guildInfo[3].replace(/-/g, " ").toProperCase();
    const url = `https://swgoh.gg/api/guilds/${guildNum}/units/`;
    let guildData = {};

    const lookup = charactersData.filter(fuzzy(searchTerm));

    // Error message if no characters are found
    if (lookup.length == 0) return guildMessage.edit(`${message.author}, I can't find any characters, ships or factions with __${searchTerm}__ in it.`).then(client.cmdError(message, cmd));

    // Request options for swgoh.gg API
    const options = {
        uri: url,
        json: true
    };

    // Pull data from swgoh.gg/api
    await request(options)
        .then(function(body) {
            guildData = body;
        })
        .catch(function(err) {
            message.channel.send("Failure to get guild data.");
            client.log = ("log", `Guild Request Failure: ${err}`, "Error");
        });

    // We will need to iterate over every character or ship found
    // and create a new embed for each one
    for (var k = 0; k < lookup.length; k++) {

        // Now we start pulling the character from the data
        const character = lookup[k].base_id;

        // Error message if that base_id isn't matched with anything in the guildData
        if (guildData[character] === undefined) {
            guildMessage.edit(`${message.author}, I don't think anyone in ${guildName} has __${lookup[k].name}__.`);
            continue;
        }

        const sortedCharacterData = guildData[character].sort( (p, c) => p.rarity > c.rarity ? 1 :  p.power > c.power && p.rarity === c.rarity ? 1 :  p.player > c.player && p.power === c.power ? 1 : -1 );
        let loopStar = "";
        let fieldTitle;
        let fieldText;
        let count = 0;
        const playerArray = [];

        // Creating the embed
        const embed = new RichEmbed()
            .setAuthor(`${guildName}`)
            .setColor(0xEE7100)
            .setTitle(lookup[k].name)
            .setThumbnail(`https:${lookup[k].image}`)
            .setURL(`https://swgoh.gg/g/1044/lightsaber-order/unit-search/#${lookup[k].base_id}`);

        // Here we're just getting an array of everyone in the guild to use for
        // the "Not Activated" section
        guildData["CLONEWARSCHEWBACCA"].forEach(d => {
            playerArray.push(d.player);
        });
        sortedCharacterData.forEach(a => {
            const removePlayer = playerArray.indexOf(a.player);
            playerArray.splice(removePlayer, 1);
        });

        // Add the "Not Activated" field to the embed
        if (playerArray.length > 0 && searchRarity == 1) {
            const playerArraySJ = playerArray.sort().join("\n");
            const iStarString = `${inactiveStarEmoji}`.repeat(7);
            // If there's more than five names, split it into two columns
            if (playerArray.length > 3) {
                const half = Math.round(playerArray.length / 2);
                embed.addField(`Not Activated (x${playerArray.length})`, playerArray.sort().slice(0, half).join("\n"), true);
                embed.addField("-", playerArray.sort().slice(half).join("\n"), true);
            }
            else embed.addField(`${iStarString}(x${playerArray.length})`, playerArraySJ, false);
        }

        sortedCharacterData.forEach(c => {
            const characterStar = c.rarity;
            if (characterStar >= searchRarity) {

                if (loopStar !== characterStar) {

                    if (fieldText != undefined) {
                        if (fieldText.length > 950) splitText(fieldTitle, fieldText, embed);
                        else embed.addField(fieldTitle, fieldText, false);
                    }

                    loopStar = characterStar;
                    fieldText = "";
                    count = 0;
                }

                fieldText += `${c.level}-g${c.gear_level} (${c.power.toLocaleString()}) - ${c.player}\n`;
                count++;
                const starString = `${starEmoji}`.repeat(characterStar) + `${inactiveStarEmoji}`.repeat(7 - characterStar);
                fieldTitle = `${starString} (x${count})`;
            }
        });

        // Can't forget to add the last loop
        if (fieldText == undefined && searchRarity > 1 && searchRarity != 7) return guildMessage.edit(`${message.author}, no one in ${guildName} has ${searchTerm} at ${searchRarity}${starEmoji} or higher.`);
        else if (fieldText == undefined && searchRarity > 1 && searchRarity == 7) return guildMessage.edit(`${message.author}, no one in ${guildName} has ${searchTerm} at ${searchRarity}${starEmoji}.`);
        else if (fieldText.length > 950) splitText(fieldTitle, fieldText, embed);
        else embed.addField(fieldTitle, fieldText, false);

        guildMessage.edit("Here's what I found:");
        message.channel.send({ embed });
    }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["guildlookup"],
    permLevel: "User"
};

exports.help = {
    name: "guild",
    category: "Game",
    description: "Looks up and returns guild data for characters/factions",
    usage: "guild <character/faction> [rarity]",
    examples: ["guild han", "guild han 6", "guildlookup jedi"]
};
