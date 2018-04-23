module.exports = client => { // eslint-disable-line no-unused-vars

    client.logger.error(client, "I've been disconnected");
    client.botLogEmbed(client, `${client.user.username} is disconnecting`, "Disconnect", 0xFF1900); // Bot-Server Log
    process.exit(-1);

};
