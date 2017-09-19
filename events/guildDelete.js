// This event executes when a new server (guild) is removed

module.exports = (client, guild) => {

    client.log("log", `${guild.name} (${guild.id}) server was removed`, "GDelete");
    client.settings.delete(guild.id);

};
