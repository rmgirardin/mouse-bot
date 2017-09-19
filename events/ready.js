module.exports = async client => {

    await client.wait(1000); // eslint-disable-line no-undef

    // Both `wait` and `client.log` are in `./modules/functions`.
    client.log("log", `[${new Date()}] Ready to serve ${client.users.size} users in ${client.guilds.size} servers`, "Ready!!");

    // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
    client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));

    // Create an invite link. Turned off so it doesn't go off every time a ready
    // even is triggered. If you need it, you can turn it on

    // try {
    //     const link = await client.generateInvite(["ADMINISTRATOR"]);
    //     client.log("log", link);
    // } catch (e) {
    //     console.log(e.stack);
    // }
};
