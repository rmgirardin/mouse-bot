// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// This will help parse boolean natural language
const stringToBool = {
    "false": 0, "off": 0, 0: 0,
    "true" : 1, "on" : 1, 1: 1
};

// Value check function
async function valueCheck(client, message, cmd, key) {
    let error = false;

    if (!key) {
        error = true;
        await message.reply("please specify a key to edit.").then(client.cmdError(message, cmd));
    }

    if (key === "guildId" || message.settings[key] === undefined) {
        error = true;
        await message.reply("this key does not exist in the settings.");
    }

    return error;
}

// The edit function
async function edit(client, message, cmd, level, key, value) {
    if (value.length < 1) return await message.reply("please specify a new value.").then(client.cmdError(message, cmd));

    // We don't want a prefix to have more than 1 character, so lets not allow this to happen
    if (key === "prefix") if (value.join(" ").length > 1) return await message.reply("please make sure the new prefix is only **1** character.");
    if (key === "welcome" || key === "points" || key == "roleReward") {
        value = stringToBool[value.join(" ").toLowerCase()];
        if (value === undefined) return await message.reply("please change the value to on/off, true/false or 1/0.");
    }
    if (key === "welcomeMessage") value = encodeURIComponent(value.join(" "));
    else value = value.join(" ");

    // Once the settings is modified, we write it back to the collection
    try {
        await client.doSQL(
            `UPDATE settings SET ${key} = ? WHERE guildId = ?`,
            [value, message.guild.id.toString()]
        );
    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `set doSQL failure:\n${error.stack}`);
        client.codeError(message);
        return;
    }
    if (key === "welcomeMessage") await message.reply(`**${key}** was successfully changed to **${decodeURIComponent(value)}**`);
    else await message.reply(`**${key}** was successfully changed to **${value}**`);
    if (key === "prefix") await message.channel.send(`Please use \`${value}help\` from now on.`);
}

// The get function
async function get(message, key) {
    const getValue = key === "guildReset" ? message.settings[key] : message.settings[key] === 0 ? "Off" : message.settings[key] === 1 ? "On" : message.settings[key];
    if (key === "welcomeMessage") await message.reply(`the value of **${key}** is currently **${decodeURIComponent(getValue)}**`);
    else await message.reply(`the value of **${key}** is currently **${getValue}**`);
}

// This is the same as const action = args[0]; const key = args[1]; const value = args.slice(2);
exports.run = async (client, message, cmd, [action, key, ...value], level) => {

    try {

        // If a user does `-set edit <key> <new value>`, let's change it
        if (action === "edit") {

            const error = await valueCheck(client, message, cmd, key);
            if (error) return;
            await edit(client, message, cmd, level, key, value);
        }

        else if (action === "get") {

            const error = await valueCheck(client, message, cmd, key);
            if (error) return;

            await get(message, key);
        }

        else if (action === "view" || !action) {

            const body = [];
            const longest = Object.keys(message.settings).reduce((long, str) => Math.max(long, str.length), 0);
            for (var objKey in message.settings) {
                const objValue = key === "guildReset" ? message.settings[objKey] : message.settings[objKey] === 0 ? "Off" : message.settings[objKey] === 1 ? "On" : message.settings[objKey];
                if (objKey === "welcomeMessage") body.push(`${objKey}${" ".repeat(longest - objKey.length)} :: ${decodeURIComponent(objValue)}`);
                else if (objKey != "guildId") body.push(`${objKey}${" ".repeat(longest - objKey.length)} :: ${objValue}`);
            }
            await message.channel.send(`\`\`\`asciidoc
= Settings for ${message.guild.name} =\n
${body.join("\n")}
\`\`\``);
        }

        // Reset all the keys because we can
        else if (action === "reset") {
            const def = client.config.defaultSettings;
            try {
                await client.doSQL(
                    "UPDATE settings SET prefix = ?, modRole = ?, guildReset = ?, points = ?, roleReward = ?, welcome = ?, welcomeChannel = ?, welcomeMessage = ? WHERE guildId = ?",
                    [def.prefix, def.modRole, def.guildReset, def.points, def.roleReward, def.welcome, def.welcomeChannel, def.welcomeMessage, message.guild.id.toString()]
                );
            } catch (error) {
                client.errlog(cmd, message, level, error);
                client.logger.error(client, `set doSQL failure:\n${error.stack}`);
                client.codeError(message);
                return;
            }
            await message.reply("I've completely reset your settings to the default config.");
        }


        // If they want to change a key without the edit, let's do that.
        // This just means that 'action' = 'key' and 'key' + 'value' = 'value'
        else {
            if (value.length > 0) value = Array(key).concat(value);
            else if (key != undefined) value = key;
            key = action;

            const error = await valueCheck(client, message, cmd, key);
            if (error) return;

            // This is the same as the 'get' action
            if (value.length === 0) {

                await get(message, key);
            }

            // This is the same as the 'edit' action
            else {

                await edit(client, message, cmd, level, key, value);
            }
        }

    } catch (error) {
        client.errlog(cmd, message, level, error);
        client.logger.error(client, `set command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["settings", "config"],
    arguments: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "set",
    category: "System",
    description: "View or change settings for your server",
    usage: "set <edit|get|view|reset> <key> <value>",
    examples: ["set", "set prefix", "set points on"]
};
