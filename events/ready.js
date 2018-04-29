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
    client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));

    client.user.setActivity("SWGoH");
};
