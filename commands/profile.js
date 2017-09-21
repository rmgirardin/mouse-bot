// This command stores any string/username [value] for with the user's id [key]
// Anyone can recall another user's key if they wish
// The main purpose is to store the your username for swgoh.gg so that anyone
// can easily access quick information

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    let id = client.profileTable.get(message.author.id);

    if (args[0] === "add" || args[0] === "edit") {
        const swName = args.slice(1).join(" ");

        if (!swName || swName.size < 1) return message.reply("You entered nothing for me to save.").then(client.cmdError(message, cmd));

        if (!id) {
            client.profileTable.set(message.author.id, swName);
            return message.reply(`I've added **${swName}** to your record.`);
        } else {
            client.profileTable.set(message.author.id, swName);
            return message.reply(`I've changed your record from **${id}** to **${swName}**.`);
        }
    }

    const profileMessage = await message.channel.send("Checking... One moment. 👀");
    const user = message.mentions.users.first();
    if (user) id = client.profileTable.get(user.id);
    if (!user && args[0]) id = args.join(" ");

    // Here we pull the profile data from swgoh.gg
    const profile = await swgoh.profile(id);

    if (!profile.username) return profileMessage.edit("I can't find anything for this user.").then(client.cmdError(message, cmd));

    // Some user's don't submit thier profile codes on swgoh.gg, if that's the
    // case, lets not display (undefined) next to their name
    let title = `${profile.username}'s Profile (${profile.allyCode})`;
    if (profile.allyCode === undefined) title = profile.username;

    const embed = new RichEmbed()
        .setTitle(title)
        .setColor(0x268BD2)
        .setThumbnail("https://swgoh.gg/static/img/swgohgg-nav-orange-2x.png")
        .setURL(`https://swgoh.gg/u/${profile.username.toLowerCase()}/`)
        .setDescription(`**Galactic Power:** ${profile.galacticPower.toLocaleString()}
**Characters Galactic Power:** ${profile.charactersGalacticPower.toLocaleString()}
**Ships Galactic Power:** ${profile.shipsGalacticPower.toLocaleString()}
**7\* Characters:** ${profile.characters7}
**Gear 12 Characters:** ${profile.gearXII}
**Gear 11 Characters:** ${profile.gearXI}`)
        .setFooter(`https://swgoh.gg/u/${profile.username.toLowerCase()}/`);

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
    usage: "profile [member-name] OR <add/edit> <username>"
};
