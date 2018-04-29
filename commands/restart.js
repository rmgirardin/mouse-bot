exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        const closeMessage = await message.channel.send("Strike me down, and I will become more powerful than you could possibly imagine!");
        client.commands.forEach( async cmd => {
            await client.unloadCommand(cmd);
        });

        // Close the collections before shutting down
        await client.settings.db.close();
        await client.pointsTable.db.close();
        await client.cache.db.close();
        await client.logs.db.close();

        await closeMessage.edit(`Only at the end do you realize the power of the Dark Side.
*<RRRRDDTT!!!! Wewewedt! Veeeeedt!>*`);
        process.exit(1);

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `restart command failure:\n${error.stack}`);
        client.codeError(message);
    }
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
