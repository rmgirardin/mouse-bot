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
            let swName = args.join(" ");
            const user = message.author;
            if (swName.startsWith("http")) {
                const start = swName.indexOf("/u/");
                if (start == -1) client.cmdError(message, cmd);
                const end = swName.lastIndexOf("/");
                swName = swName.slice(start + 3, end);
                swName = swName.replace(/%20/g, " ");
            }
            if (swName.startsWith("~")) swName = swName.replace("~", "");
            if (swName.startsWith("--")) swName = swName.replace("--", "");

            const results = await client.doSQL("SELECT username, allycode FROM profiles WHERE discordId = ?", [user.id.toString()]);
            if (results === false) {
                client.logger.warn(client, "doSQL() error within add command");
                return client.codeError(message);
            }

            const profile = await swgoh.profile(swName);
            let allycode = null;
            let guildId = null;
            if (profile.allyCode && profile.allyCode.length === 11) allycode = parseInt(profile.allyCode.replace(/-/g, ""));
            if (profile.guildUrl) {
                const guildInfo = profile.guildUrl.split("/");
                guildId = parseInt(guildInfo[2]);
            }

            await client.doSQL(
                "INSERT INTO profiles (discordId, discordName, discordTag, username, allycode, guildId) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE discordName=VALUES(discordName), discordTag=VALUES(discordTag), username=VALUES(username), allycode=VALUES(allycode), guildId=VALUES(guildId)",
                [user.id.toString(), user.username, user.discriminator, swName, allycode, guildId]
            );

            // Save the username
            if (!results || results.length === 0) {
                await message.reply(`I've added **${swName}** to your record.`);
            } else {
                await message.reply(`I've changed your record from **${results[0].username}** to **${swName}**.`);
            }

            // Manually cache everything!
            client.cache.defer.then(async () => { client.cache.set(swName + "_profile", profile); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_collection", await swgoh.collection(swName)); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_ships", await swgoh.ship(swName)); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_mods", await swgoh.mods(swName)); });

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
    aliases: ["register", "update", "u"],
    permLevel: "User"
};

exports.help = {
    name: "add",
    category: "Game",
	description: "Add your swgoh.gg username to the database",
	usage: "add <swgoh.gg-username>",
    examples: ["add necavit", "add hanshotfirst", "add https://swgoh.gg/u/necavit/"]
};
