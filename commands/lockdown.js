const ms = require("ms");

exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!client.lockit) client.lockit = [];

    const time = args.join(" ");
    const validUnlocks = ["release", "unlock"];

    if (!time) return message.reply("you must set a duration for the lockdown in either hours, minutes or seconds.");

    if (validUnlocks.includes(time)) {
        client.modlogEmbed(message, cmd.help.name, 0xFF1900, "", "", time);
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send("Lockdown lifted.");
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => { console.log(error); });
    }

    else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            client.modlogEmbed(message, cmd.help.name, 0xFF1900, "", "", time);
            message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}!`).then(() => {
                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send("Lockdown lifted.")).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));
            }).catch(error => { console.log(error); });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ld"],
    permLevel: "Moderator"
};

exports.help = {
    name: "lockdown",
    category: "System",
    description: "Lock a channel for a set duration (hr, min or sec)",
    usage: "lockdown <duration> [reason]"
};
