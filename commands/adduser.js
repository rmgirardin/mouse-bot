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
            if (!args[0]) return await message.reply(`You didn't provide an ally code for ${user}.`).then(client.cmdError(message,cmd));

            let allycode = args.shift();
            if (allycode.length === 11) allycode = parseInt(allycode.replace(/-/g, ""));

            const results = await client.doSQL("SELECT allycode FROM profiles WHERE discordId = ?", [userId]);
            if (results === false) {
                client.logger.warn(client, "doSQL() error within adduser command");
                return client.codeError(message);
            }

            const profile = await swgoh.profileAlly(allycode);
            let guildId = null;
            if (profile.guildUrl) {
                const guildInfo = profile.guildUrl.split("/");
                guildId = guildInfo[2];
            }

            // Save the username
            if (!results || results.length === 0) {
                await client.doSQL(
                    "INSERT INTO profiles (discordId, discordName, discordTag, allycode, guildId) VALUES (?, ?, ?, ?, ?, ?)",
                    [userId, user.user.username, user.user.discriminator, allycode, guildId]
                );
                await message.reply(`I've registered **${allycode}** to ${user}'s record.`);
            } else {
                await client.doSQL(
                    "UPDATE profiles SET discordName = ?, discordTag = ?, allycode = ?, guildId = ? WHERE discordID = ?",
                    [user.user.username, user.user.discriminator, allycode, guildId, userId]
                );
                await message.reply(`I've changed ${user}'s record from **${results[0].allycode}** to **${allycode}**.`);
            }

            // Manually cache everything!
            client.cache.defer.then(async () => { client.cache.set(allycode + "_profile", profile); });
            client.cache.defer.then(async () => { client.cache.set(allycode + "_collection", await swgoh.collectionAlly(allycode)); });
            client.cache.defer.then(async () => { client.cache.set(allycode + "_ships", await swgoh.shipAlly(allycode)); });
            client.cache.defer.then(async () => { client.cache.set(allycode + "_mods", await swgoh.modsAlly(allycode)); });

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
    aliases: ["au", "addusers", "registeruser"],
    arguments: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "adduser",
    category: "Game",
	description: "Register the ally code for one or more Discord users to the database",
	usage: "adduser <discord-username> <ally code>",
    examples: ["adduser @necavit 123-456-789", "adduser @kyloren 987654321 @hoboyoda 555666777"]
};
