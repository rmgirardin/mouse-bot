module.exports = async client => {

    // Test database connection before we give the ready signal
    try {
        const result = await client.doSQL(
            "INSERT INTO botlog (timestamp, type, details) VALUES (?, ?, ?)",
            [new Date(), "log", `Connected to mySQL DB as ${client.user.username.toProperCase()}`]
        );
        if (!result) client.logger.warn(client, "Couldn't connect to mySQL DB");
    } catch (error) {
        return client.logger.error(client, `Didn't connect to mySQL DB:\n${error.stack}`);
    }

    await client.wait(1000); // eslint-disable-line no-undef

    // Both `wait` and `client.log` are in `./modules/functions`.
    client.logger.ready(client, `${client.user.username.toProperCase()} is ready to serve ${client.users.size} users in ${client.guilds.size} servers`);

    // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
    const clientArray = client.guilds.array();
    const sqlArray = await client.doSQL("SELECT guildId FROM settings", []);

    const clientGuildId = [];
    const sqlGuildId = [];
    for (var i = 0; i < clientArray.length; i++) {
        clientGuildId.push(clientArray[i].id);
    }
    for (var j = 0; j < sqlArray.length; j++) {
        sqlGuildId.push(sqlArray[j]["guildId"]);
    }

    const guildsThatNeedSettings = clientGuildId.filter( function(n) {
        return !this.has(n);
    }, new Set(sqlGuildId) );

    for (var k = 0; k < guildsThatNeedSettings.length; k++) {
        try {
            client.doSQL(
                "INSERT INTO settings (guildId, welcomeMessage) VALUES (?, ?)",
                [guildsThatNeedSettings[k].toString(), client.config.defaultSettings.welcomeMessage]
            );
        } catch (error) {
            client.logger.error(client, `Couldn't add guild (${guildsThatNeedSettings[k]}) to the settings:\n${error.stack}`);
        }
    }

    // And finally set the activity
    client.user.setActivity("SWGoH");
};
