module.exports = (client) => {

    /*
    --- PERMISSION LEVEL FUNCTION ---

    This is a very basic permission system for commands
    NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
    command including the VERY DANGEROUS `eval` and `exec` commands!
    */

    client.permlevel = message => {
        let permlvl = 0;

        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };


    /*
    --- LOADING COMMANDS ---
    */

    client.loadCommand = async (commandName) => {
        try {
            const props = require(`../commands/${commandName}`);
            client.logger.log(client, `Loading Command: ${props.help.name}...`);
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (error) {
            client.logger.error(client, `Unable to load command ${commandName}:\n${error.stack}`);
            return error;
        }
    };


    /*
    --- UNLOADING COMMANDS ---
    */
    client.unloadCommand = async (commandName) => {
        try {
            let command;
            if (client.commands.has(commandName)) {
                command = client.commands.get(commandName);
            } else if (client.aliases.has(commandName)) {
                command = client.commands.get(client.aliases.get(commandName));
            }
            if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

            if (command.shutdown) {
                await command.shutdown(client);
            }
            delete require.cache[require.resolve(`../commands/${commandName}.js`)];
            return false;
        } catch (error) {
            client.logger.error(client, `Unable to unload command ${commandName}:\n${error.stack}`);
            return error;
        }
    };


    /*
    --- COMMMAND ERROR ---

    Used in most commands to responds with the commands usage if the user did
    not use the command correctly
    */
    client.cmdError = async (message, cmd) => {
        await message.channel.send(`To use this command, use the following command structure: \`\`\`${message.settings.prefix}${cmd.help.usage}\`\`\`
Examples:\`\`\`${message.settings.prefix}${cmd.help.examples.join(`\n${message.settings.prefix}`)}\`\`\``);

        // Let's remove a point from the user for using the command incorrectly
        // This makes the message worth only a regular message
        client.addPoints(message, client.config.messagePoints*-1);
    };


    /*
    --- PROMISE FAILURE ERROR ---

    This sends a discord message to let the user know that there was an error
    */
    client.codeError = async (message) => {
        await message.channel.send("Laugh it up, fuzzball! I screwed up and my code failed. Try again or let someone know I'm failing.");
    };


    /*
    --- SINGLE-LINE AWAITMESSAGE ---

    A simple way to grab a single reply, from the user that initiated
    the command. Waits for response for a default of 60 seconds
    USAGE:
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
    client.awaitReply = async (message, question, limit = 60000) => {
        try {
            const filter = m => m.author.id === message.author.id;
            await message.channel.send(question);
            try {
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                return collected.first().content;
            } catch (error) {
                return false;
            }
        } catch (error) {
            client.logger.error(client, `awaitReply function failure:\n${error.stack}`);
        }
    };


    /*
    --- SEND aMESSAGE TO aCHANNEL ---

    Finds aChannel, defined in the config file, and sends aMessage
    */
    client.aMessage = async (guild, text) => {
            try {
            const settings = guild ? client.settings.get(guild.id) : client.config.defaultSettings;
            let guildChannel;
            if (guild.channels.exists("name", settings.aChannel))
                guildChannel = await guild.channels.find(r => r.name === settings.aChannel);
            else return;

            if (!guildChannel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

            try {
                await guildChannel.send(text);
            } catch (error) {
                client.logger.error(client, `Could not send aMessage function:\n${error.stack}`);
            }

        } catch (error) {
            client.logger.error(client, `aMessage send failure\n${error.stack}`);
        }
    };


    /*
    --- CHARACTER CACHING ---

    Addes profile, character and ships from swgoh.gg for quicker access.
    First checks for last update and if updated, replace all data for that user.

    The variable input throttles the speed of the cache. By making input = "csm",
    all caching is done then; by making input = "", caching is done while the rest of
    the command is being executed.

    Profile is always updated in order to check lastUpdatedUTC.
    */
    client.cacheCheck = async (message, id, input = "") => {
        const swgoh = require("swgoh").swgoh;
        const moment = require("moment");

        try {
            if (!id) id = await client.doSQL("SELECT username FROM profiles WHERE discordId = ?", [message.author.id]);
            const pastProfile = client.cache.get(id + "_profile");
            const currentProfile = await swgoh.profile(id);
            const updated = moment(currentProfile.lastUpdatedUTC).fromNow();
            const username = currentProfile.username;

            const pastUpdatedUTC = pastProfile ? pastProfile.lastUpdatedUTC : -1;

            // We need to compare when the cache profile was last updated
            // with when the new profile was last updated
            if (pastUpdatedUTC != currentProfile.lastUpdatedUTC) {

                // If true, reload all the cached data
                // Profile, no need to pull it again
                client.cache.set(id + "_profile", currentProfile);
                // Character Collection
                if (input.includes("c")) {
                    const cachedCollection = await swgoh.collection(id);
                    client.cache.set(id + "_collection", cachedCollection);
                } else client.cache.defer.then(async () => { client.cache.set(id + "_collection", await swgoh.collection(id)); });
                // Ship Collection
                if (input.includes("s")) {
                    const cachedShips = await swgoh.ship(id);
                    client.cache.set(id + "_ships", cachedShips);
                } else client.cache.defer.then(async () => { client.cache.set(id + "_ships", await swgoh.ship(id)); });
                // Mods
                if (input.includes("m")) {
                    const cachedMods = await swgoh.mods(id);
                    client.cache.set(id + "_mods", cachedMods);
                } else client.cache.defer.then(async () => { client.cache.set(id + "_mods", await swgoh.mods(id)); });

            }

            return [username, updated];
        } catch (error) {
            const level = client.permlevel(message);
            client.errlog("cacheCheck", message, level, error);
            client.logger.error(client, `cacheCheck failure\n${error.stack}`);
        }
    };


    /*
    --- MESSAGE CLEAN FUNCTION ---

    "Clean" removes @everyone pings, as well as tokens, and makes code blocks
    escaped so they're shown more easily. As a bonus it resolves promises
    and stringifies objects!
    This is mostly only used by the Eval and Exec commands.
    */
    client.clean = async (client, text) => {
        try {
            if (text && text.constructor.name == "Promise")
            text = await text;
            if (typeof evaled !== "string")
            text = require("util").inspect(text, {depth: 0});

            text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

            return text;
        } catch (error) {
            client.logger.error(client, `clean function failure\n${error.stack}`);
        }
    };


    /*
    --- ADD POINTS ---

    Give the sender 1 point if pointsEnabled
    Useful for things like giving users an extra point for using a command or
    for submitting a bug/suggestion
    */
    client.addPoints = async (message, extraPoints) => {
        // Double-check for botception! Why not
        // Also check for message.guild
        if (message.author.bot || !message.guild) return;

        if (message.settings.pointsEnabled != "true") return;

        const guildUser = message.guild.id + message.author.id;
        let userPoints = Number(client.pointsTable.get(guildUser));

        // If the user doesn't already have points, set it to 0
        // and assign the lowest roleReward
        if (!userPoints) {
            userPoints = 0;
            if (message.settings.roleRewardsEnabled === "true") {
                const roleName = client.config.roleRewards.find(l => l.level === userPoints).name;
                client.assignRole(message.member, roleName);
            }
        }

        // Check the level before we add points
        const oldLevel = client.calcLevel(userPoints);

        // Add new points and save
        userPoints = userPoints + extraPoints;
        client.pointsTable.set(guildUser, userPoints);

        // Check the new level AND if newLevel is a multiple of 5
        // If so, congratulate them and assign new reward role if there is one
        // When assigning a new reward role, check for old ones and remove them
        const newLevel = client.calcLevel(userPoints);
        if (newLevel > oldLevel && newLevel % 1 === 0) {
            let roleName = client.config.roleRewards.find(l => l.level === newLevel);
            if (roleName && roleName != undefined) roleName = roleName.name;
            const congratsMessage = `Congratulations ${message.guild.member(message.author)}! You're now **level ${newLevel}**! 🎉`;
            if (!roleName || roleName === undefined || message.settings.roleRewardsEnabled != "true" || !message.member.guild.members.get(client.user.id).permissions.has("MANAGE_ROLES_OR_PERMISSIONS")) {
                if (message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
                    await message.channel.send(congratsMessage);
                }
            } else if (message.settings.roleRewardsEnabled === "true") {
                client.assignRole(message.member, roleName);
                client.removePointsRole(message.member, newLevel);
                if (message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
                    await message.channel.send(`${congratsMessage}\nYou've been promoted to **${roleName}**!`);
                }
            }
        }
    };


    /*
    --- CALCULATE POINTS LEVEL ---

    Determine users current level from current user points. Levels are not
    stored in the pointsTable, only a user [key] and points [value]
    */
    client.calcLevel = (userPoints) => {
        const userLevel = Math.floor(0.8 * Math.sqrt(userPoints)); // ***If you change this, also change it in the levels.js command!
        return userLevel;
    };


    /*
    --- APPLY ROLE REWARD FROM POINTS ---

    Based on the role rewards in the config file (keys: 5-100). Checks if a role
    exists, if it doesn't create it and assign that role to the message.author
    */
    client.assignRole = async (member, roleName) => {

        try {
            // If the bot cannot manage roles, then don't even try to
            if (!member.guild.members.get(client.user.id).permissions.has("MANAGE_ROLES_OR_PERMISSIONS")) return;

            let role = member.guild.roles.find(r => r.name === roleName);
            if (!role) {
                try {
                    role = await member.guild.createRole({
                        name: roleName,
                        color: [],
                        permissions: []
                    });
                } catch (error) {
                    return client.logger.error(client, `Unable to assign user role\n${error.stack}`);
                }
            }

            await member.addRole(role);
            return;
        } catch (error) {
            client.logger.error(client, `assignRole failure\n${error.stack}`);
        }
    };


    /*
    --- REMOVE PREVIOUS REWARD ROLE ---

    Used in conjuction with the Apply Role Reward from Points. Uses user's level
    to determine which previous role to remove
    */
    client.removePointsRole = async (member, curLevel) => {

        try {
            // If the bot cannot manage roles, then don't even try to
            if (!member.guild.members.get(client.user.id).permissions.has("MANAGE_ROLES_OR_PERMISSIONS")) return;

            let oldRole;

            for (let i = 1; i < 100; i++) {
                const lvl = curLevel - i;
                oldRole = client.config.roleRewards.find(l => l.level === lvl);
                if (oldRole != undefined) break;
            }

            const role = member.guild.roles.find(r => r.name === oldRole.name);

            await member.removeRole(role);
            return;
        } catch (error) {
            client.logger.error(client, `removePointsRole failure\n${error.stack}`);
        }
    };

    /*
    --- SENDS A RICH EMBED TO BOT-LOG ---

    This is sent to the botLog channel for events like guild creation and reconnecting.
    Useful so that the logs don't have to be checked as frequently
    */
    client.botLogEmbed = async (client, description, events, color = 0xCACBCE) => {

        try {
            const { RichEmbed } = require("discord.js");
            const botLogChannel = client.channels.get(client.config.botLogChannel);
            if (!botLogChannel) return;

            const embed = new RichEmbed()
                .setDescription(description)
                .setColor(color)
                .setTimestamp()
                .setFooter(events);
            return await botLogChannel.send({embed});
        } catch (error) {
            client.logger.error(client, `botLogEmbed failure\n${error.stack}`);
        }
    };

    /*
    --- GET OBJECTS ---

    Matches keys or values within an object and returns the parent value if
    needed
    */
    client.getObjects = (obj, key, val, parentKey) => {

        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (obj[parentKey] != undefined) obj[i].parent = obj[parentKey];
            if (typeof obj[i] == "object") {
                objects = objects.concat(client.getObjects(obj[i], key, val));
            } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i].toLowerCase() == val || i == key && val == "") {
                objects.push(obj);
            } else if (obj[i].toLowerCase() == val && key == "") {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        return objects;
    };


    /*
    --- SPLIT TEXT ---

    Splits text for embed fields
    */
    client.splitText = (title, text, embed) => {

        let bool = true;
        while (bool) {

            // Find where to split the text without cutting anything off
            const index = text.lastIndexOf("\n", 950);

            const first = text.substr(0, index);
            const second = text.substr(index + 1);

            embed.addField(title, first, false);

            // Test if the second part of the text is still too long
            if (second.length > 950) {
                text = second;
                title = "-";
            } else {
                embed.addField("-", second, false);
                bool = false;
            }

        }
    };


    /* ===== MISCELLANEOUS NON-CRITICAL FUNCTIONS ===== */


    // Replaces clone names to be more aesthetically pleasing
    // **ONLY ACCEPTS STRINGS**
    client.checkClones = (text) => {

        text = text.replace('CC-2224 "Cody"', "Cody") // eslint-disable-line quotes
            .replace('CT-21-0408 "Echo"', "Echo") // eslint-disable-line quotes
            .replace('CT-5555 "Fives"', "Fives") // eslint-disable-line quotes
            .replace('CT-7567 "Rex"', "Rex"); // eslint-disable-line quotes
        return text;
    };


    // Returns the time (24-hour) and the numbered day
    client.getTime = () => {

        const date = new Date();
        const day = date.getDay();
        const time = date.getHours().toString() + date.getMinutes().toString();
        return [time, day];
    };


    // Returns string "to the proper case" = "To The Proper Case"
    String.prototype.toProperCase = function() {

        return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };


    // `await client.wait(1000);` to "pause" for 1 second.
    client.wait = require("util").promisify(setTimeout);


    // Another semi-useful utility command, which creates a "range" of numbers
    // in an array. `range(10).forEach()` loops 10 times for instance. Why?
    // Because honestly for...i loops are ugly.
    global.range = (count, start = 0) => {

        const myArr = [];
        for (var i = 0; i<count; i++) {
            myArr[i] = i+start;
        }
        return myArr;
    };

    // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (error) => {

        const errorMsg = error.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        console.log("Uncaught Exception: ", errorMsg);
        // Always best practice to let the code crash on uncaught exceptions.
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", error => {

        console.log(`Unhandled rejection: ${error}`);
    });

};
