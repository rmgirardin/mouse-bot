// shard location keys and text names
const shardLocation = [
    { key : "dark",     text : "DS Hard Nodes" },
    { key : "light",    text : "LS Hard Nodes" },
    { key : "ships",    text : "Ship Hard Nodes" },
    { key : "cantina",  text : "Cantina" },
    { key : "shops",    text : "Stores" }
];

const fuzzy = require("fuzzy-predicate");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        // If there are no args, send cmdError message because we don't know what to search for!
        if (!args[0]) return client.cmdError(message, cmd);

        const charactersData = client.swgohData.get("charactersData");
        const shipsData = client.swgohData.get("shipsData");
        const searchTerm = args.join(" ");
        const searchKeys = ["name", "faction", "nickname", "shops"];
        let result;

        // filter character and ship data into one result array
        if (searchTerm.length < 2) return client.cmdError(message, cmd);
        if (searchTerm.length == 2) result = charactersData.filter(fuzzy(searchTerm, "nickname"))
            .concat(shipsData.filter(fuzzy(searchTerm, "nickname")));
        else if (searchTerm.length == 3) result = charactersData.filter(fuzzy(searchTerm, ["nickname", "name"]))
            .concat(shipsData.filter(fuzzy(searchTerm, ["nickname", "name"])));
        else result = charactersData.filter(fuzzy(searchTerm, searchKeys))
            .concat(shipsData.filter(fuzzy(searchTerm, searchKeys)));

        await message.channel.send((result.length > 0 ? result.length : "No") + " matches found");

        for (var c = 0, len = result.length; c < len; c++) {
            let locationText = "";
            const unit = result[c];

            let embed = new RichEmbed() // eslint-disable-line prefer-const
                .setTitle(`${unit["name"]}`)
                .setDescription(`${unit.description}`)
                .setColor(0xEE7100)
                .setThumbnail(`https:${unit.image}`)
                .setURL(`${unit.url}`)
                .addField("__Max Galactic Power__",`${new Intl.NumberFormat("en-US", { useGrouping: "true" }).format(unit.power)}`);

            if (len > 1) embed.setFooter(`(${(c+1)} of ${len})`);

            if (unit.faction.length > 0) {
                embed.addField("__Factions__", `${unit.faction.join(", ")}`);
            }

            for (var i = 0, sLen = shardLocation.length; i < sLen; i++) {
                if ((shardLocation[i].key in unit) && (unit[shardLocation[i].key].length > 0)) {
                    locationText += (locationText.length > 0 ? "\n" : "") +
                        shardLocation[i].text + ": " +
                        unit[shardLocation[i].key].join(", ").toProperCase();
                }
            }

            if (locationText.length > 0) {
                embed.addField("__Shard Locations__",`${locationText}`);
            }

            await message.channel.send({ embed });
        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `lookup command failure:\n${error.stack}`);
        client.codeError(message);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["find", "search"],
    arguments: [],
    permLevel: "User"
};

exports.help = {
    name: "lookup",
    category: "Game",
    description: "Looks up characters on swgoh.gg",
    usage: "lookup <name|faction|store>",
    examples: ["lookup leia", "lookup han", "find jedi", "find galactic war"]
};
