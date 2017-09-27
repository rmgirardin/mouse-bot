// This event executes when a new server (guild) is removed

module.exports = (client, guild) => {

    client.log("log", `${guild.name} (${guild.id}) server was removed`, "GDelete");
    client.botLogEmbed(client, `I was removed from the server ${guild.name} (${guild.id})`, "Guild Delete", 0xFF1900);
    client.settings.delete(guild.id);

};
