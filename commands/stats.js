const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const embed = new Discord.RichEmbed()
        .setTitle(`${client.user.username.toProperCase()} Statistics`)
        .setColor(0x268BD2)
        .setDescription(`**Node** ${process.version}\n**Discord.js** v${Discord.version}`)
        .addField("Servers:", client.guilds.size.toLocaleString(), true)
        .addField("Channels:", client.channels.size.toLocaleString(), true)
        .addField("Users:", client.users.size.toLocaleString(), true)
        .addField("Mem Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("Ext Mem Usage:", `${(process.memoryUsage().external / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("Uptime:", duration, true);

    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscelaneous",
    description: "Gives useful bot statistics",
    usage: "stats"
};
