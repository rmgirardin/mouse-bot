// This event executes when a new server (guild) is removed

module.exports = (client, guild) => {

    client.logger.log(client, `${guild.name} (${guild.id}) server was removed`);
    client.botLogEmbed(client, `I was removed from the server ${guild.name}`, "Guild Delete", 0xFF1900); // Bot-Server Log
    client.settings.delete(guild.id);

};
