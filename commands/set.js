const { inspect } = require("util");

// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// This is the same as const action = args[0]; const key = args[1]; const value = args.slice(2);
exports.run = async (client, message, cmd, [action, key, ...value], level) => {

    try {

        const settings = client.settings.get(message.guild.id);

        // If a user does `-set add <key> <new value>`, let's add it
        if (action === "add") {
            if (!key) return await message.reply("Please specify a key to add").then(client.cmdError(message, cmd));
            if (settings[key]) return await message.reply("This key already exists in the settings");
            if (value.length < 1) return await message.reply("Please specify a value").then(client.cmdError(message, cmd));

            // `value` being an array, we need to join it first.
            settings[key] = value.join(" ");

            // One the settings is modified, we write it back to the collection
            client.settings.set(message.guild.id, settings);
            await message.reply(`**${key}** successfully added with the value of **${value.join(" ")}**`);
        }

        // If a user does `-set edit <key> <new value>`, let's change it
        else if (action === "edit") {
            if (!key) return await message.reply("please specify a key to edit.").then(client.cmdError(message, cmd));
            if (!settings[key]) return await message.reply("this key does not exist in the settings.");
            if (value.length < 1) return await message.reply("please specify a new value.").then(client.cmdError(message, cmd));

            // We don't want a prefix to have more than 1 character, so lets not allow this to happen
            if (key === "prefix") {
                if (value.length > 1) return await message.reply("please make sure the new prefix is only **1** character.");
                const prefixMessage = `The prefix for commands has been changed to **${value}**\nPlease use \`${value}command\` from now on.`;
                client.aMessage(message.guild, prefixMessage);
            }

            // WARNING! Cyclical reasoning here!
            // Admin role must be present to change adminRole, but if there is no
            // admin role or it is a different name, an "Administrator" role must
            // first be created in order to change this setting.
            if (key === "adminRole") {
                if (level < 3) return await message.channel.send("You do not have permission to edit this setting.");
                client.addPoints(message, client.config.messagePoints*-1);
            }

            // `value` being an array, we need to join it first.
            settings[key] = value.join(" ");

            // Once the settings is modified, we write it back to the collection
            client.settings.set(message.guild.id, settings);
            await message.reply(`**${key}** was successfully changed to **${value.join(" ")}**`);

        }

        else if (action === "get") {
            if (!key) return await message.reply("Please specify a key to view").then(client.cmdError(message, cmd));
            if (!settings[key]) return await message.reply("This key does not exist in the settings");
            await message.reply(`the value of **${key}** is currently **${settings[key]}**`);
        }

        else if (action === "view" || !action) {
            await message.channel.send(inspect(settings), {code: "json"});
        }

        else { client.cmdError(message, cmd); }

    } catch (error) {
        client.logger.error(client, `set command failure:\n${error.stack}`);
        client.codeError(message);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["settings", "config"],
    permLevel: "Moderator"
};

exports.help = {
    name: "set",
    category: "System",
    description: "View or change settings for your server",
    usage: "set <add/edit/get/view> <key> <value>",
    examples: ["set", "set get prefix", "set edit pointsEnabled true"]
};
