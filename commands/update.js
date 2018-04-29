const swgoh = require("swgoh").swgoh;

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars


    try {

        const username = message.profile.username;
        const waitMessage = await message.channel.send("Okay, I'll update your cache.");

        client.cache.defer.then(async () => { client.cache.set(username + "_collection", await swgoh.collection(username)); });
        client.cache.defer.then(async () => { client.cache.set(username + "_ships", await swgoh.ship(username)); });
        client.cache.defer.then(async () => { client.cache.set(username + "_mods", await swgoh.mods(username)); });

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
