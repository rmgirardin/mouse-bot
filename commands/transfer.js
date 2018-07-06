// This command sends a message to the aChannel (within the config file) of
// every guild that the bot serves
// Useful for server downtime or really important messages

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        const guildIdArray = client.settings.keyArray();
        var j = 0;
        var failed = [];
        for (var i = 0; i < guildIdArray.length; i++) {
            const guildSettings = await client.settings.get(guildIdArray[i]);

            let welcome = 0;
            let points = 0;
            let roleReward = 0;
            if (guildSettings.welcomeEnabled == true) welcome = 1;
            if (guildSettings.pointsEnabled == true) points = 1;
            if (guildSettings.roleRewardsEnabled == true) roleReward = 1;

            try {
                await client.doSQL(
                    "INSERT INTO settings (guildId, prefix, aChannel, modRole, welcome, points, roleReward, guildReset, welcomeMessage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [guildIdArray[i].toString(), guildSettings.prefix, guildSettings.aChannel, guildSettings.modRole, welcome, points, roleReward, guildSettings.guildReset, guildSettings.welcomeMessage]
                );
                j++;
            } catch (error) {
                client.errlog(cmd, message, level, error);
                client.logger.error(client, `transfer doSQL failure (guild ID - ${guildIdArray[i]}):\n${error.stack}`);
                message.channel.send(`Failed for Guild ID = ${guildIdArray[i]}`);
                failed.push(guildIdArray[i]);
            }
        }

        await message.channel.send(`Successfully transfered ${j} of ${guildIdArray.length}.\nFailed:\n${failed.join("\n")}`);

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `transfer command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""],
    arguments: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "transfer",
    category: "System",
    description: "Transfers from enmap to SQL",
    usage: "",
    examples: [""]
};
