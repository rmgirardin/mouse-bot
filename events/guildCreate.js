// This event executes when a new server (guild) is created

module.exports = async (client, guild) => {

    client.log("log", `${guild.name} (${guild.id}) server was added`, "GCreate");
    client.botLogEmbed(client, `I was added to the server ${guild.name}`, "Guild Create", 0x00FF00);

    // This creates guild settings from the defualt settings defined in the
    // config file
    await client.settings.set(guild.id, client.config.defaultSettings);


    /*
    --- Bot Install Welcome Messages ---
    Sends two messages, one to the guild welcoming them
    The other is to the guild owner explaining how to change the config file
    */

    const settings = client.settings.get(guild.id);

    const guildOwnerWelcome = `Hello! Thanks for adding me to ${guild.name}! You can change the **prefix** by typing \`/set edit prefix <new-character>\`. If you want to modify some of my deeper function, check out the guide here: https://rmgirardin.gitbooks.io/mouse-bot-user-manual/content/server-config.html`;

    guild.owner.user.send(guildOwnerWelcome).catch(console.error);

    const guildWelcome = `*Vrrrrrvd tkk tkkdtk*
Hello! I am ${client.user.username}! I have a lot of commands you can use (or not use). Type \`${settings.prefix}help\` for all of my commands or check out my user manual to understand everything I can do: https://rmgirardin.gitbooks.io/mouse-bot-user-manual/`;

    client.aMessage(guild, guildWelcome);

};
