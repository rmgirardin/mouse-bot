exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        const [time, day] = client.getTime();
        await message.channel.send(`The time is ${time} and the day is ${day}.`);

    }  catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `time command failure:\n${error.stack}`);
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
    name: "time",
    category: "Miscellaneous",
    description: "Tells time (24-hour) and numbered day of the week",
    usage: "time",
    examples: ["time"]
};
