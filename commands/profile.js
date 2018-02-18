// This command stores any string/username [value] for with the user's id [key]
// Anyone can recall another user's key if they wish
// The main purpose is to store the your username for swgoh.gg so that anyone
// can easily access quick information

const swgoh = require("swgoh").swgoh;
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const add = require("./add.js");
const adduser = require("./adduser.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // If they want to edit their stored swgoh.gg username, we'll let them here
    if (args[0] === "add" || args[0] === "edit") {

        // Remove the "add" or "edit"
        args = args.slice(1);

        // Now either run add or adduser commands
        if (args.length === 1) add.run(client, message, cmd, args, level);
        else if (args.length > 1) adduser.run(client, message, cmd, args, level);
        else client.cmdError(message, cmd);

        return;
    }

    //
    // Now we actually execute the profile command
    //

    let [id, swName, error] = client.profileCheck(message, args); // eslint-disable-line prefer-const, no-unused-vars

    // The courtious "checking" message while the user waits
    const profileMessage = await message.channel.send("Checking... One moment. 👀");

    // Here we pull the profile data from swgoh.gg
    const profile = await swgoh.profile(encodeURI(id));

    if (!profile.username || profile === undefined) return profileMessage.edit("I can't find a profile for that username").then(client.cmdError(message, cmd));

    // Some user's don't submit thier profile codes on swgoh.gg, if that's the
    // case, lets not display (undefined) next to their name
    let title = `${profile.username}'s Profile (${profile.allyCode})`;
    const lastUpdated = moment(profile.lastUpdatedUTC).fromNow();
    if (profile.allyCode === undefined) title = profile.username;

    const embed = new RichEmbed()
        .setTitle(title)
        .setColor(0x268BD2)
        .setThumbnail("https://swgoh.gg/static/img/swgohgg-nav-orange-2x.png")
        .setURL(`https://swgoh.gg/u/${encodeURI(id)}/`)
        .setDescription(`**Galactic Power:** ${profile.galacticPower.toLocaleString()}
**Characters Galactic Power:** ${profile.charactersGalacticPower.toLocaleString()}
**Ships Galactic Power:** ${profile.shipsGalacticPower.toLocaleString()}
**Arena Rank:** ${profile.arenaRank.toLocaleString()}
**7\* Characters:** ${profile.characters7}
**Gear 12 Characters:** ${profile.gearXII}
**Gear 11 Characters:** ${profile.gearXI}`)
        .setFooter(`https://swgoh.gg/u/${profile.username.toLowerCase()}/ (Last updated ${lastUpdated})`, "https://swgoh.gg/static/img/bb8.png");

    profileMessage.edit({embed});

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["swgoh", "swgoh.gg", "swgohgg", "profiles"],
    permLevel: "User"
};

exports.help = {
    name: "profile",
    category: "Game",
    description: "Returns swgoh.gg stats of specified/mentioned user",
    usage: "profile ~[swgoh.gg-username]",
    examples: ["profile ~hansolo", "profile", "profile @Necavit#0540", "profile add necavit", "profile edit hanshotfirst"]
};
