// This event executes when a new server (guild) is created

module.exports = async (client, guild) => {

    client.logger.log(client, `${guild.name} (${guild.id}) server was added`);
    client.botLogEmbed(client, `I was added to the server ${guild.name}`, "Guild Create", 0x00FF00); // Bot-Server Log

    // This creates guild settings from the defualt settings defined in the
    // config file
    try {
        await client.doSQL(
            "INSERT IGNORE INTO settings (guildId, welcomeMessage) VALUES (?, ?)",
            [guild.id.toString(), client.config.defaultSettings.welcomeMessage]
        );
    } catch (error) {
        client.logger.error(client, `guildCreate doSQL failure (guild ID - ${guild.id}):\n${error.stack}`);
    }

};
