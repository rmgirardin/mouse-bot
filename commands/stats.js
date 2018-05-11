const Discord = require("discord.js");
const pjson = require("../package.json");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);


exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        if (!args[0]) {

            try {
                const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

                const profiles = await client.doSQL("SELECT COUNT(*) FROM profiles");

                const embed = new Discord.RichEmbed()
                    .setTitle(`${client.user.username.toProperCase()} Statistics`)
                    .setColor(0x268BD2)
                    .setDescription(`**${pjson.name.replace("-", " ").toProperCase()}** v${pjson.version}  |  **Node** ${process.version}  |  **Discord.js** v${Discord.version}`)
                    .addField("Servers:", client.guilds.size.toLocaleString(), true)
                    .addField("Channels:", client.channels.size.toLocaleString(), true)
                    .addBlankField(true)
                    .addField("Users:", client.users.size.toLocaleString(), true)
                    .addField("Registered:", profiles[0]["COUNT(*)"], true)
                    .addBlankField(true)
                    .addField("Mem Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
                    .addField("CPU Load:", `${Math.round(os.loadavg()[0]*10000)/100}%`, true)
                    .addField("Uptime:", duration, true);

                await message.channel.send({embed});
            } catch (error) {
                client.errlog(cmd, message, level, error);
                client.logger.error(client, `stats command, no args failure:\n${error.stack}`);
                client.codeError(message);
            }
        } else if (args[0] === "cmd" || args[0] === "cmds" || args[0] === "command" || args[0] === "commands") {

            try {

                let commandStats = [];
                const cmdNames = await readdir(".//commands/");
                const longest = cmdNames.reduce((long, str) => Math.max(long, str.length), 0) - 3;
                for (const i in cmdNames) {
                    try {

                        const command = cmdNames[i].replace(".js", "");
                        const result = await client.doSQL("SELECT COUNT(*) FROM cmdlog where command=?", command);
                        commandStats = commandStats.concat([`${command.toProperCase()}${" ".repeat(longest - command.length)} = ${result[0]["COUNT(*)"]}`]);
                    } catch (error) {
                        client.errlog(cmd, message, level, error);
                        client.logger.error(client, `stats command, cmd args doSQL function failure:\n${error.stack}`);
                        client.codeError(message);
                    }
                }

                const sortedStats = commandStats.sort((a, b) =>
                    parseInt(b.slice(longest + 3)) > parseInt(a.slice(longest + 3)) ? 1 :
                    a > b && a.slice(longest + 3) === b.slice(longest + 3)          ? 1 : -1
                );

                const embed = new Discord.RichEmbed()
                    .setTitle(`${client.user.username.toProperCase()} Command Statistics`)
                    .setColor(0x268BD2)
                    .setDescription(`\`\`\`ml\n${sortedStats.join("\n")}\`\`\``);

                await message.channel.send({embed});
            } catch (error) {
                client.errlog(cmd, message, level, error);
                client.logger.error(client, `stats command, cmd args failure:\n${error.stack}`);
                client.codeError(message);
            }
        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `stats command failure:\n${error.stack}`);
        client.codeError(message);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    arguments: ["cmd", "commands"],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscellaneous",
    description: "Gives useful bot statistics",
    usage: "stats",
    examples: ["stats"]
};
