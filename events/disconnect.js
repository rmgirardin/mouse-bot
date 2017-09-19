module.exports = client => { // eslint-disable-line no-unused-vars

    client.log("log", `[${new Date()}] I've been disconnected.`, "Disconn");
    process.exit(1);

};
