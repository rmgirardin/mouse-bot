const { RichEmbed } = require("discord.js");
const adduser = require("./adduser.js");
const swgoh = require("swgoh").swgoh;

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        // If more than one arg, offload to the adduser.js command
        // This command allows moderators to add other user's swgoh.gg usernames
        const userId = message.mentions.users.firstKey();

        if (message.isMentioned(userId) && !message.guild.members.get(userId).user.bot) {

            adduser.run(client, message, cmd, args, level);
        }

        else {

            let results = null;
            const user = message.author;
            try {
                results = await client.doSQL("SELECT username, allycode, guildId FROM profiles WHERE discordId = ?", [user.id.toString()]);
            } catch (error) {
                client.logger.warn(client, "doSQL() error within register command");
                return client.codeError(message);
            }

            // Let's give some basic instructions if there are no args
            if (!args[0] && results.length < 1) {
                const embed = new RichEmbed()
                    .setColor(0x268BD2)
                    .setTitle("**Registration Instructions**")
                    .setDescription(`Hello! I just need your **swgoh.gg username** in order to register with me. You can type it out in a couple different ways. I accept links to your profile page, such as \`http://swgoh.gg/u/username/\`. I also will take just the username. Here are two examples:\`\`\`
${message.settings.prefix}register http://swgoh.gg/u/username/
${message.settings.prefix}register necavit\`\`\``)
                    .setFooter(`If you still need more inforamtion on this command, you can type \`${message.settings.prefix}help register\``);

                await message.channel.send({embed});
            }

            // What happens if a command doesn't have args, but they've previously registered?
            // Let's show them what we have saved.
            else if (!args[0] && results.length >= 1) {

                // This is just to format the allycode, so it looks nicer
                let ac;
                if (results[0]["allycode"]) {
                    const acString = results[0]["allycode"].toString();
                    ac = [acString.slice(0,3), acString.slice(3,6), acString.slice(6)].join("-");
                } else ac = "Nothing Found";

                const embed = new RichEmbed()
                    .setColor(0x268BD2)
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setTitle(`**Registration with ${client.user.username.toProperCase()}**`)
                    .setDescription(`This is the information I currently have registered for ${message.author}.
If this information is wrong, please run \`${message.settings.prefix}register\` again or double check swgoh.gg to ensure your information is correct.
If your allycode is not found, you will be able to add that in the future.`)
                    .addField("**Basic User Information**", `\`\`\`asciidoc
Username  :: ${results[0]["username"] ? results[0]["username"] : "Nothing Found"}
Ally Code :: ${ac}
Guild ID  :: ${results[0]["guildId"] ? results[0]["guildId"] : "Nothing Found"}
\`\`\``, false)
                    .setFooter(`Try running the \`${message.settings.prefix}profile\` command to see one of the ways I can display your in-game data.`);

                await message.channel.send({embed});
            }

            // The meat and potatoes of the register command
            else {

                let swName = args.join(" ");
                if (swName.startsWith("http")) {
                    const start = swName.indexOf("/u/");
                    if (start == -1) client.cmdError(message, cmd);
                    const end = swName.lastIndexOf("/");
                    swName = swName.slice(start + 3, end);
                    swName = swName.replace(/%20/g, " ");
                }
                if (swName.startsWith("~")) swName = swName.replace("~", "");
                if (swName.startsWith("--")) swName = swName.replace("--", "");

                const profile = await swgoh.profile(swName);
                let allycode = null;
                let guildId = null;
                let guildName = "No Guild";
                if (profile.allyCode && profile.allyCode.length === 11) allycode = parseInt(profile.allyCode.replace(/-/g, ""));
                if (profile.guildUrl) {
                    const guildInfo = profile.guildUrl.split("/");
                    guildId = parseInt(guildInfo[2]);
                    guildName = guildInfo[3].replace("-", " ").toProperCase();
                }

                await client.doSQL(
                    "INSERT INTO profiles (discordId, discordName, discordTag, username, allycode, guildId) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE discordName=VALUES(discordName), discordTag=VALUES(discordTag), username=VALUES(username), allycode=VALUES(allycode), guildId=VALUES(guildId)",
                    [user.id.toString(), user.username, user.discriminator, profile.username, allycode, guildId]
                );

                const embed = new RichEmbed()
                    .setColor(0x268BD2)
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setTitle(`**Registration with ${client.user.username.toProperCase()}**`)
                    .setDescription(`This is the information found for the username __${swName}__.
If this information is wrong, please run \`${message.settings.prefix}register\` again or double check swgoh.gg to ensure your information is correct.
If your allycode is not found, you will be able to add that in the future.`)
                    .addField("**Basic User Information**", `\`\`\`asciidoc
Username  :: ${profile.username ? profile.username : "Nothing Found"}
Ally Code :: ${profile.allyCode ? profile.allyCode : "Nothing Found"}
Guild     :: ${guildName}
\`\`\``, false)
                    .setFooter(`Try running the \`${message.settings.prefix}profile\` command to see one of the ways I can display your in-game data.`);

                // Save the username
                if (!results || results.length === 0) {
                    await message.reply(`thanks for registering with me! I've added **${swName}** to your record.`);
                } else {
                    await message.reply(`I've changed your record from **${results[0].username}** to **${swName}**.`);
                }

                await message.channel.send({embed});

                // Manually cache everything!
                client.cache.defer.then(async () => { client.cache.set(swName + "_profile", profile); });
                client.cache.defer.then(async () => { client.cache.set(swName + "_collection", await swgoh.collection(swName)); });
                client.cache.defer.then(async () => { client.cache.set(swName + "_ships", await swgoh.ship(swName)); });
                client.cache.defer.then(async () => { client.cache.set(swName + "_mods", await swgoh.mods(swName)); });
            }

        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `add command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["add"],
    arguments: [],
    permLevel: "User"
};

exports.help = {
    name: "register",
    category: "Game",
	description: "Register your swgoh.gg username to the database",
	usage: "register http://swgoh.gg/u/username/",
    examples: ["register https://swgoh.gg/u/necavit/", "register necavit", "register hanshotfirst"]
};
