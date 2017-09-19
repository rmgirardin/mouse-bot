exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const [time, day] = client.getTime();
    message.channel.send(`The time is ${time} and the day is ${day}.`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "time",
    category: "Miscelaneous",
    description: "Tells time (24-hour) and numbered day of the week",
    usage: "time"
};
