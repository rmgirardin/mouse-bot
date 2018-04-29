exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    try {

        let body = "I found no logs.";
        const type = args[0];

        if (["logs", "errors", "commands", "bugs"].includes(type)) body = client.logs.get(type);
        else return await message.reply("log type must be either __logs__, __commands__, __errors__ or __bugs__.");
        if (body === undefined) return await message.reply("There are no logs of that type right now.");

        const length = body.length;
        if (length > 1950) {
            const cutEnd = body.substr(length - 1950);
            const index = cutEnd.indexOf("\n");
            body = cutEnd.substr(index + 3);
        }

        await message.channel.send(`\`\`\`css
${body}
\`\`\``);

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `logs command failure:\n${error.stack}`);
        client.codeError(message);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["log"],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "logs",
    category: "System",
    description: "Sends a report of the specified logs",
    usage: "logs <type>",
    examples: ["logs error", "logs commands"]
};
