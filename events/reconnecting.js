module.exports = client => { // eslint-disable-line no-unused-vars

    client.log("log", `[${new Date()}] I'm attempting to reconnect.`, "Reconne");
    client.botLogEmbed(client, `${client.user.username} is reconnecting`, "Reconnecting", 0xFF8300);

};
