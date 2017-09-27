// This event executes when a new server (guild) is created

module.exports = async (client, guild) => {

    client.log("log", `${guild.name} (${guild.id}) server was added`, "GCreate");
    client.botLogEmbed(client, `I was added to the server ${guild.name} (${guild.id})`, "Guild Create", 0x00FF00);

    // This creates guild settings from the defualt settings defined in the
    // config file
    await client.settings.set(guild.id, client.config.defaultSettings);


    /*
    --- Bot Install Welcome Messages ---
    Sends two messages, one to the guild welcoming them
    The other is to the guild owner explaining how to change the config file
    */

    const settings = client.settings.get(guild.id);

    const guildOwnerWelcome = `Hello! Thanks for adding me to your ${guild.name} server! In order to get started, please edit some of the settings in any channel on your server. To get this done, you'll use the following command structure:\`\`\`${settings.prefix}set edit <key-to-change> <new-value>\`\`\`You can see all of the current settings by just using \`${settings.prefix}set\`.

First, feel free to change the **prefix** to anything you like. To do this type \`-set edit prefix <new-character>\`.

Use the same command structure *(but with your new prefix, if you changed it)* to allow your **moderators** and **administrators** to use my higher level functions. Right now you're the only one who can probably change these things and use my other system commands.
・\`moderatorRole <your-moderator-role-name>\`
・\`admistratorRole <your-administrator-role-name>\`

In order to get a **log** of the system commands other moderators use, change the mod-log channel to the channel name only your moderators use or a separate channel for logs: \`modLogChannel <channel-name>\`.

Here's a list of other important settings you should consider changing. The \`key\` is listed with the system default **value**:
・\`aChannel\`: **general**
・\`welcomeEnabled\`: **true**
・\`pointsEnabled\`: **false**
・\`roleRewardsEnabled\`: **true** (will only work if \`pointsEnabled\` is **true**)
・\`guildReset\`: **2030** (based on EST, must be 24-hour time)

Now that you have everything configured to your server, use the **\`help\`** command to read more about what I can do. You can also check out my user manual for more in-depth details of my functions: https://rmgirardin.gitbooks.io/mouse-bot-user-manual/content/`;

    guild.owner.user.send(guildOwnerWelcome).catch(console.error);

    const guildWelcome = `*Vrrrrrvd tkk tkkdtk*
Hello! I am ${client.user.username}! I have a lot of commands you can use (or not use). Type \`${settings.prefix}help\` for all of my commands or check out my user manual to understand everything I can do: https://rmgirardin.gitbooks.io/mouse-bot-user-manual/content/`;

    client.aMessage(guild, guildWelcome);

};
