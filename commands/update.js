const swgoh = require("swgoh").swgoh;

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars


    try {

        const allycode = message.profile.allycode;
        const waitMessage = await message.channel.send("Okay, I'll update your cache.");

        client.cache.defer.then(async () => { client.cache.set(allycode + "_collection", await swgoh.collectionAlly(allycode)); });
        client.cache.defer.then(async () => { client.cache.set(allycode + "_ships", await swgoh.shipAlly(allycode)); });
        client.cache.defer.then(async () => { client.cache.set(allycode + "_mods", await swgoh.modsAlly(allycode)); });

        await waitMessage.edit(`${message.author}, I've updated your cache.`);

    } catch (error) {

        client.errlog(cmd, message, level, error);
        client.logger.error(client, `update command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["update", "u"],
    arguments: [],
    permLevel: "User"
};

exports.help = {
    name: "update",
    category: "Game",
	description: "Updates your cached SWGoH data",
	usage: "update",
    examples: ["update", "u"]
};
