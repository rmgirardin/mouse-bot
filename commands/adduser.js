const swgoh = require("swgoh").swgoh;

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

       // Return and send error message if there are not 2 args
       if (args.length < 2) return client.cmdError(message, cmd);

        while (args.length > 0) {

            // user id in args has the form <@273421645828325377>, so strip of leading <@ and trailing >
            const userId = args.shift().replace(/(^<@[!]?)|(>$)/g, "");

            const user = message.guild.members.get(userId);
            if (!user) return await message.reply(`user ${userId} not found.`).then(client.cmdError(message,cmd));
            if (!args[0]) return await message.reply(`You didn't provide a swgoh.gg username for ${user}.`).then(client.cmdError(message,cmd));

            let swName = args.shift();
            if (swName.startsWith("http")) {
                const start = swName.indexOf("/u/");
                if (start == -1) client.cmdError(message, cmd);
                const end = swName.lastIndexOf("/");
                swName = swName.slice(start + 3, end);
                swName = swName.replace(/%20/g, " ");
            }
            if (swName.startsWith("~")) swName = swName.replace("~", "");
            if (swName.startsWith("--")) swName = swName.replace("--", "");
            swName = swName.replace(/%20/g, " ");

            const results = await client.doSQL("SELECT username FROM profiles WHERE discordId = ?", [userId]);
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
                guildId = guildInfo[2];
            }

            // Save the username
            if (!results || results.length === 0) {
                await client.doSQL(
                    "INSERT INTO profiles (discordId, discordName, discordTag, username, allycode, guildId) VALUES (?, ?, ?, ?, ?, ?)",
                    [userId, user.user.username, user.user.discriminator, swName, allycode, guildId]
                );
                await message.reply(`I've added **${swName}** to ${user}'s record.`);
            } else {
                await client.doSQL(
                    "UPDATE profiles SET discordName = ?, discordTag = ?, username = ?, allycode = ?, guildId = ? WHERE discordID = ?",
                    [user.user.username, user.user.discriminator, swName, allycode, guildId, userId]
                );
                await message.reply(`I've changed ${user}'s record from **${results[0].username}** to **${swName}**.`);
            }

            // Manually cache everything!
            client.cache.defer.then(async () => { client.cache.set(swName + "_profile", profile); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_collection", await swgoh.collection(swName)); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_ships", await swgoh.ship(swName)); });
            client.cache.defer.then(async () => { client.cache.set(swName + "_mods", await swgoh.mods(swName)); });

        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `adduser command failure:\n${error.stack}`);
        client.codeError(message);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["au", "addusers"],
    permLevel: "Moderator"
};

exports.help = {
    name: "adduser",
    category: "Game",
	description: "Add the swgoh.gg username for one or more Discord users to the database",
	usage: "adduser <discord-username> <swgoh.gg-username>",
    examples: ["adduser @necavit necavit", "adduser @kyloren sweetsaberdude @hoboyoda theGhost"]
};
