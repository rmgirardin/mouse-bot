const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!args[0]) return client.cmdError(message, cmd);

    const [profile, character, error] = client.profileCheck(message, args);
    if (profile === undefined) return message.reply(error).then(client.cmdError(message, cmd));

    // The courtious "checking" message while the user waits
    const chMessage = await message.channel.send("Checking... This may take a minute. 👀");

    const collection = await swgoh.collection(profile);
    const mods = await swgoh.mods(profile);
    if (collection.length < 1) return chMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));

    // Start off my setting these variables so we can fill them when we do a
    // search for the character from the args
    // Variables for collection lookup
    const chName = [];
    const image = [];
    const stars = [];
    const chLevel = [];
    const gearLevel = [];
    const galacticPower = [];
    const maxGalacticPower = [];

    // Variables for mods lookup
    let modChName = [];
    let description = [];
    let slot = [];
    let modLevel = [];
    let primaryValue = [];
    let secondaryValue = [];

    // Now we start the search. We search the mods collection from the given
    // profile and as we find a match for the character, add it to the variables
    // we declared above
    // Search through collection
    for (var b = 0; b < collection.length; b++) {
        if (collection[b]["description"].includes(character.toProperCase())) {
            chName.push(collection[b]["description"]);
            image.push(collection[b]["imageSrc"]);
            stars.push(collection[b]["star"]);
            chLevel.push(collection[b]["level"]);
            gearLevel.push(collection[b]["gearLevel"]);
            galacticPower.push(collection[b]["galacticPower"]);
            maxGalacticPower.push(collection[b]["maxGalacticPower"]);
        }
    }

    // Search through mods
    for (var i = 0; i < mods.length; i++) {
        if (mods[i]["character"].includes(character.toProperCase())) {
            modChName.push(mods[i]["character"]);
            description.push(mods[i]["description"]);
            slot.push(mods[i]["slot"]);
            modLevel.push(mods[i]["level"]);
            primaryValue.push(`${mods[i]["primary"]["value"]} ${mods[i]["primary"]["type"]}`);
            let secondaryText = "";
            for (var z = 0; z < mods[i]["secondary"].length; z++) {
                secondaryText = `${secondaryText}${mods[i]["secondary"][z]["value"]} ${mods[i]["secondary"][z]["type"]}\n`;
            }
            secondaryValue.push(secondaryText);
        }
    }

    // Because the search may turn up multiple different characters, lets sort
    // and filter the mods by character so we can display them neatly. We will
    // use the colletion names to filter the mod names
    for (var a = 0; a < chName.length; a++) {
        const notModChName = [];
        const notDescription = [];
        const notSlot = [];
        const notModLevel = [];
        const notPrimaryValue =[];
        const notSecondaryValue = [];
        let fieldTitle;
        let fieldText;

        // Finally we can start creating the embed to be displayed PER character
        let embed = new RichEmbed() // eslint-disable-line prefer-const
            .setTitle(`${profile.toProperCase()}'s ${chName[a]}`)
            .setDescription(`${stars[a]}*  |  Level ${chLevel[a]}  |  Gear ${gearLevel[a]}
Galactic Power: ${galacticPower[a].toLocaleString()} *(${Math.round(galacticPower[a]/maxGalacticPower[a]*100)}% of max)*`)
            .setColor(0xEE7100)
            .setThumbnail(`https://${image[a]}`)
            .setFooter(`https://swgoh.gg/u/${profile.toLowerCase()}/collection/`, "https://swgoh.gg/static/img/bb8.png");

        for (var j = modChName.length; j > 0; j--) {

            // Compare to the first character name, if it's the same, keep it
            if (modChName[j] === chName[a]) continue;

            // If the character name is different, add it to the notVariables
            // to be used later and cut it from the regular variable
            notModChName.unshift(modChName[j]);
            modChName.splice(j, 1);
            notDescription.unshift(description[j]);
            description.splice(j, 1);
            notSlot.unshift(slot[j]);
            slot.splice(j, 1);
            notModLevel.unshift(modLevel[j]);
            modLevel.splice(j, 1);
            notPrimaryValue.unshift(primaryValue[j]);
            primaryValue.splice(j, 1);
            notSecondaryValue.unshift(secondaryValue[j]);
            secondaryValue.splice(j, 1);
        }

        // Since there are multiple mods for each character, we need to run
        // through and display them with all the correct data
        if (modChName[0] != undefined) {
            for (var k = 0; k < description.length; k++) {
                fieldTitle = `${slot[k]} (Lv ${modLevel[k]})`;
                fieldText = `__${description[k]}__\n**${primaryValue[k]}**\n${secondaryValue[k]}`;
                embed.addField(fieldTitle, fieldText, true);
            }
        }

        // Now that the embed is fully created for one character, we can send it
        message.channel.send({ embed });

        // Before we begin the loop again to check if there is another different
        // character name, lets get rid of the character we just created an
        // embed for and replace the regular variables with the notVariables we
        // were storing for later
        modChName = notModChName;
        description = notDescription;
        slot = notSlot;
        modLevel = notModLevel;
        primaryValue = notPrimaryValue;
        secondaryValue = notSecondaryValue;
    }

    // This edits the "Checking... One moment" text
    chMessage.edit("Here's what I found:");

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mods", "ch"],
    permLevel: "User"
};

exports.help = {
    name: "character",
    category: "Game",
    description: "Looks up character stats and mods on swgoh.gg",
    usage: "character ~[swgoh.gg-username] <character>",
    examples: ["character ~necavit Luke", "ch @Necavit#0540 leia", "mods r2", "character han"]
};
