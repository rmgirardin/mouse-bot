let hasPM2;

try {
    require.resolve("pm2");
    hasPM2 = "PM2 is installed, hopefully I will reboot!";
} catch (e) {
    hasPM2 = `I cannot find PM2, you must restart manually.
*<RRRRDDTT!!!! Wewewedt! Veeeeedt!>*`;
}

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars
    await message.channel.send(`${message.author}, ${client.user.username} is shutting down. ${hasPM2}`);
    process.exit(1);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["shutdown"],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "reboot",
    category: "System",
    description: "Shuts down the bot, if running under PM2, will restart automatically",
    usage: "reboot"
};
