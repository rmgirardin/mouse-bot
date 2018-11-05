// This command stores any string/username [value] for with the user's id [key]
// Anyone can recall another user's key if they wish
// The main purpose is to store the your username for swgoh.gg so that anyone
// can easily access quick information

const swgoh = require("swgoh").swgoh;
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const register = require("./register.js");
const adduser = require("./adduser.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        // If they want to edit their stored swgoh.gg username, we'll let them here
        if (args[0] === "add" || args[0] === "edit" || args[0] === "register") {

            // Remove the "add" or "edit"
            args = args.slice(1);

            // Now either run register or adduser commands
            if (args.length === 1) register.run(client, message, cmd, args, level);
            else if (args.length > 1) adduser.run(client, message, cmd, args, level);
            else client.cmdError(message, cmd);

            return;
        }
    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(`Error offloading profile command to register:\n${error.stack}`);
    }

    try {

        // Now we actually execute the profile command

        const [allycode, empty, error] = await client.profileCheck(message, args); // eslint-disable-line prefer-const, no-unused-vars
        if (!allycode) return await message.reply(error).then(client.cmdError(message, cmd));

        // The courtious "checking" message while the user waits
        const profileMessage = await message.channel.send("Checking... One moment. 👀");

        // Here we pull the profile data from swgoh.gg
        const profile = await swgoh.profileAlly(allycode);

        if (profile === undefined || profile.userId === undefined) return await profileMessage.edit("I can't find a profile for that username").then(client.cmdError(message, cmd));

        // Some user's don't submit thier profile codes on swgoh.gg, if that's the
        // case, lets not display (undefined) next to their name
        let title = `${profile.username}'s Profile (${profile.allyCode})`;
        const guildName = profile.guildUrl ? profile.guildUrl.split("/")[3].replace(/-/g, " ").toProperCase() : null;
        const guildText = guildName ? `\n**Guild**: ${guildName}` : "";
        const lastUpdated = moment(profile.lastUpdatedUTC).fromNow();
        if (message.profile.allycode === undefined) title = profile.username;

        let embed = null;

        // We have two options for sending the embed:
        // The first option is with percentages
        // This will only send if "%" is in the args
        if (args.includes("%")) {
            embed = new RichEmbed()
                .setTitle(title)
                .setColor(0x268BD2)
                .setURL(`https://swgoh.gg/p/${encodeURI(allycode)}/`)
                .setDescription(`Level ${profile.level}${guildText}
**Arena Rank:** ${profile.arenaRank.toLocaleString()}`
                )
                .addField("Galactic Power (% based on Overall)",
                    `\`\`\`asciidoc
Overall   :: ${profile.galacticPower.toLocaleString()}
Character :: ${profile.charactersGalacticPower.toLocaleString()} (${(profile.charactersGalacticPower / profile.galacticPower * 100).toFixed(1)}%)
Ship      :: ${profile.shipsGalacticPower.toLocaleString()} (${(profile.shipsGalacticPower / profile.galacticPower * 100).toFixed(1)}%)\`\`\``,
                    false
                )
                .addField("Characters (% based on Unlocked)",
                    `\`\`\`asciidoc
Unlocked  :: ${profile.characters}
7 star    :: ${profile.characters7} (${(profile.characters7 / profile.characters * 100).toFixed(1)}%)
6 star    :: ${profile.characters6} (${(profile.characters6 / profile.characters * 100).toFixed(1)}%)
Gear 12   :: ${profile.gearXII} (${(profile.gearXII / profile.characters * 100).toFixed(1)}%)
Gear 11   :: ${profile.gearXI} (${(profile.gearXI / profile.characters * 100).toFixed(1)}%)
Gear 10   :: ${profile.gearX} (${(profile.gearX / profile.characters * 100).toFixed(1)}%)\`\`\``,
                    false
                )
                .setFooter(`Last updated ${lastUpdated}`, "https://swgoh.gg/static/img/bb8.png");
        }

        // The second option is without percentages
        // this is the default embed
        else {
            embed = new RichEmbed()
                .setTitle(title)
                .setColor(0x268BD2)
                .setURL(`https://swgoh.gg/p/${encodeURI(allycode)}/`)
                .setDescription(`Level ${profile.level}${guildText}
**Arena Rank:** ${profile.arenaRank.toLocaleString()}`
                )
                .addField("Galactic Power",
                    `\`\`\`asciidoc
Overall   :: ${profile.galacticPower.toLocaleString()}
Character :: ${profile.charactersGalacticPower.toLocaleString()}
Ship      :: ${profile.shipsGalacticPower.toLocaleString()}\`\`\``,
                    false
                )
                .addField("Characters",
                    `\`\`\`asciidoc
Unlocked  :: ${profile.characters}
7 star    :: ${profile.characters7}
6 star    :: ${profile.characters6}
Gear 12   :: ${profile.gearXII}
Gear 11   :: ${profile.gearXI}
Gear 10   :: ${profile.gearX}\`\`\``,
                    false
                )
                .setFooter(`Last updated ${lastUpdated} | For percentages use ${message.settings.prefix}p %`, "https://swgoh.gg/static/img/bb8.png");
        }

        await profileMessage.edit({embed});

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `profile command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["profiles", "p"],
    arguments: ["%", "user mention"],
    permLevel: "User"
};

exports.help = {
    name: "profile",
    category: "Game",
    description: "Returns swgoh.gg stats of specified/mentioned user",
    usage: "profile",
    examples: ["p", "p %", "p @Necavit#0540 %"]
};
