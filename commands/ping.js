exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {
        const msg = await message.channel.send("Ping?");
        await msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `ping command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "Latency information",
    usage: "ping",
    examples: ["ping"]
};
