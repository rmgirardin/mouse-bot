// This command uses the user's collection on swgoh.gg and compares it to the
// characters list in the shipments file. Any matching characters that are less
// than 7* will be reported as still needed.

const { RichEmbed } = require("discord.js");
const shipments = require("../modules/shipments.js");
const fuzzy = require("fuzzy-predicate");

const shardsRemainingAtStarLevel = {
    0: 330,
    1: 320,
    2: 305,
    3: 280,
    4: 250,
    5: 185,
    6: 100,
    7: 0
};

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        if (!args[0]) return client.cmdError(message, cmd);

        let [id, searchTerm, error] = await client.profileCheck(message, args); // eslint-disable-line prefer-const
        if (id === undefined) return await message.reply(error).then(client.cmdError(message, cmd));

        // Pull in our swgoh databases
        const charactersData = client.swgohData.get("charactersData");
        const shipsData = client.swgohData.get("shipsData");

        const needMessage = await message.channel.send("Checking... One moment. 👀"); // wait message

        // Cache check and pull the user's data
        const [username, updated] = await client.cacheCheck(message, id, "cs");
        const characterCollection = client.cache.get(id + "_collection");
        if (characterCollection.length < 1) return await needMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));
        const shipCollection = client.cache.get(id + "_ships");

        // Clean text
        searchTerm = searchTerm.toLowerCase().replace(/shop|store|shipment|squad|all/g, "")
            .replace(/gw/g, "galactic war").replace(/ship|fleet arena/g, "fleet")
            .trim();
        if (searchTerm == "guild") searchTerm = "guild shop";

        // Search for a shipments image, because it looks nice in the embed
        const shopCheck = shipments[searchTerm];
        let shopImage;
        if (shopCheck || shopCheck != undefined) shopImage = shipments[searchTerm]["image"];
        let chLookup; let sLookup;

        // Okay, lets finally do some searching
        if (searchTerm.toLowerCase() == "battles") {
            chLookup = charactersData.filter(fuzzy("-", ["light", "dark"]));
            sLookup = shipsData.filter(fuzzy("-", ["light", "dark"]));
        } else if (searchTerm.toLowerCase() == "cantina battles") {
            chLookup = charactersData.filter(fuzzy("-", ["cantina"]));
            sLookup = shipsData.filter(fuzzy("-", ["cantina"]));
        } else if (searchTerm.toLowerCase() == "ship battles" ||
            searchTerm.toLowerCase() == "fleet battles") {

            chLookup = charactersData.filter(fuzzy("-", ["ships"]));
            sLookup = shipsData.filter(fuzzy("-", ["ships"]));
        } else {
            chLookup = charactersData.filter(fuzzy(searchTerm, ["faction", "shops"]));
            sLookup = shipsData.filter(fuzzy(searchTerm, ["faction", "shops"]));
        }

        // Creating the embed
        let embed = new RichEmbed() // eslint-disable-line prefer-const
            .setAuthor(`${username}'s Needs for ${searchTerm.toProperCase()}`, shopImage)
            .setColor(0xEE7100)
            .setDescription("*Need Shards (current rank)*")
            .setURL("https://swgoh.gg/db/shipments/")
            .setFooter(`Last updated ${updated}`, "https://swgoh.gg/static/img/bb8.png");
        if (searchTerm == "") embed.setAuthor(`${id.toProperCase()}'s Needs`);
        if (searchTerm.toLowerCase() == "battles") embed.setAuthor(`${id.toProperCase()}'s Needs for Light & Dark Side Battles`);

        const charArray = [];
        const shipArray = [];
        const totalShards = (chLookup.length + sLookup.length) * shardsRemainingAtStarLevel[0];
        let shardsRemaining = totalShards; // start out with the max and subtract as we go


        const iterateLookup = function(lookupList, accountCollection, resultArray) {
            // Now we crosscheck with the swgoh.gg account and update the embeds
            for (let i = 0; i < lookupList.length; i++) {
                const charName = lookupList[i].name;

                const foundCharacter = accountCollection.find(c => (c.description).trim() === charName);
                const rank = (foundCharacter) ? Number(foundCharacter.star) : 0;
                const rankDisplay = rank || "n.a.";

                if (rank < 7) {
                    resultArray.push(`${client.checkClones(charName)} (${rankDisplay})`);
                }

                shardsRemaining -= shardsRemainingAtStarLevel[rank];
            }
        };

        iterateLookup(chLookup, characterCollection, charArray);
        iterateLookup(sLookup, shipCollection, shipArray);

        const charDescription = "" + charArray.join("\n");
        const shipDescription = "" + shipArray.join("\n");

        if (charDescription === "" && shipDescription === "" && shopCheck) embed.setDescription(`\`100% complete\`
Congrats! You've maxed out all the shards in the shop!
Now go find another one to finish.`);
        else if (charDescription === "" && shipDescription === "") {
            embed.setDescription(`Nothing found!
Either all characters/ships have been maxed out, or I cannot find a shop or faction for __${searchTerm}__.`);
        } else {
            const storeProgress = ((shardsRemaining / totalShards) * 100).toFixed(1);
            embed.setDescription(`\`~${storeProgress}% complete\``);
        }

        // Check if fields are too long before sending
        if (charDescription != "") {
            if (charDescription.length > 950) client.splitText("__Characters:__", charDescription, embed);
            else embed.addField("__Characters:__", charDescription);
        }
        if (shipDescription != "") {
            if (shipDescription.length > 950) client.splitText("__Ships:__", shipDescription, embed);
            else embed.addField("__Ships:__", shipDescription);
        }

        await needMessage.edit({ embed });

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `need command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["shops", "shipment", "shipments"],
    arguments: ["user mention"],
    permLevel: "User"
};

exports.help = {
    name: "need",
    category: "Game",
    description: "Let user know which characters they need in shipments",
    usage: "need <show|faction|name|nickname>",
    examples: ["need gw", "need jedi", "need ~necavit fleet"]
};
