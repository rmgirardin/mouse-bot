// let hasPM2;
//
// try {
//     require.resolve("pm2");
//     hasPM2 = "PM2 is installed, hopefully I will reboot!";
// } catch (e) {
//     hasPM2 = "I cannot find PM2, you must restart manually.";
// }

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars
    await message.channel.send(`${message.author}, ${client.user.username} is shutting down and might restart if you're lucky!
*<RRRRDDTT!!!! Wewewedt! Veeeeedt!>*`);
    client.commands.forEach( async cmd => {
        await client.unloadCommand(cmd);
    });
    process.exit(1);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["reboot", "shutdown"],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "restart",
    category: "System",
    description: "Shuts down the bot and might restart",
    usage: "restart",
    examples: ["restart", "reboot"]
};
