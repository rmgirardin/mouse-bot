// This command checks to see if a specified or mentioned user has characters
// which are predefined in the config file through "hasCommand"
// If no args is submitted, the command attempts to search for the author's
// collection

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    const hasMessage = await message.channel.send("Checking... One moment. 👀");

    const characters = settings.hasCommand.split(",");

    // We need to find if there is a mentioned user to check if there a profile
    // for them in the profileTable, otherwise, lookup the manual user input
    const user = message.mentions.users.first();
    let id = args.join(" ");
    if (user) id = client.profileTable.get(user.id);
    if (!args[0]) id = client.profileTable.get(message.author.id);

    const collection = await swgoh.collection(id);
    if (!id || collection.length < 1) return hasMessage.edit(`${message.author}, I can't find anything for that user.`).then(client.cmdError(message, cmd));

    let embed = new RichEmbed() // eslint-disable-line prefer-const
        .setTitle(`Character Check For ${id.toProperCase()}:`)
        .setColor(0xEE7100)
        .setURL(`https://swgoh.gg/u/${id.toLowerCase()}/`);

    for (let i = 0; i < characters.length; i++) {

        const character = collection.find(c => c.code === characters[i].trim());

        if (character) {
            const title = `${client.checkClones(character.description)}`;
            const description = `・${character.star}\*\n・Level ${character.level}\n・Gear level ${character.gearLevel}`;

            embed.addField(title, description, true);
        } else {
            const title = `${client.checkClones(characters[i].replace(/-/g, " "))}`;
            const description = ":x:";

            embed.addField(title, description, true);
        }

    }

    hasMessage.edit({ embed });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "has",
    category: "Game",
    description: "Checks if the user has certain characters",
    usage: "has [swgoh.gg-username/mention]"
};
