module.exports = client => { // eslint-disable-line no-unused-vars

    client.logger.warn(client, "I'm attempting to reconnect.");
    client.botLogEmbed(client, `${client.user.username} is reconnecting`, "Reconnecting", 0xFF8300);

};
