module.exports = client => { // eslint-disable-line no-unused-vars

    client.log("log", `[${new Date()}] I've been disconnected.`, "Disconn");
    client.botLogEmbed(client, `${client.user.username} is disconnecting`, "Disconnect", 0xFF1900);
    process.exit(1);

};
