// This command gives the daily guild activity based on the guildReset value.
// To change the guild reset value, check the config.json file

const dayDict = {
    0: "**PVP Attemps**.", 7: "**PVP Attemps**.",
    1: "**Cantina Energy**.", 8: "**Cantina Energy**.",
    2: "**Light Side Battles**.",
    3: "**Galactic War Battles**.",
    4: "**Hard Mode Battles**.",
    5: "**Challenges**.",
    6: "**Dark Side Battles**."
};

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        const rnow = "Right now it's ";
        const greset = "Next will be ";
        const guildReset = message.settings.guildReset;

        const [time, day] = client.getTime();

        // Reply
        if (time > guildReset) {
            await message.channel.send(rnow + dayDict[day+1] + "\n" + greset + dayDict[day+2]);
        }
        else {
            await message.channel.send(rnow + dayDict[day] + "\n" + greset + dayDict[day+1]);
        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `dailies command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["daily"],
    permLevel: "User"
};

exports.help = {
    name: "dailies",
    category: "Game",
    description: "Lists the current and next guild activity",
    usage: "dailies",
    examples:["dailies", "daily"]
};
