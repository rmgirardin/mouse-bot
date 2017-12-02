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

    client.loadCommand = (commandName) => {
        try {
            const props = require(`../commands/${commandName}`);
            client.log("log", `Loading Command: ${props.help.name}...`, "Loading");
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (error) {
            client.log("log", `Unable to load command ${commandName}: ${error}`, "Error!!");
            return error;
        }
    };


    /*
    --- UNLOADING COMMANDS ---
    */
    client.unloadCommand = async (commandName) => {
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
    };


    /*
    --- LOGGING FUNTION ---

    Logs to console. Future patches may include time+colors
    */

    client.log = (type, msg, title) => {
        if (!title) title = "Log";
        console.log(`[${type}] [${title}] ${msg}`);
    };


    /*
    --- COMMMAND ERROR ---

    Used in most commands to responds with the commands usage if the user did
    not use the command correctly
    */
    client.cmdError = (message, cmd) => {
        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
        message.channel.send(`To use this command, use the following command structure: \`\`\`${settings.prefix}${cmd.help.usage}\`\`\``);

        // Let's remove a point from the user for using the command incorrectly
        // This makes the message worth only a regular message
        client.addPoints(message, client.config.messagePoints*-1);
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
        const filter = m => m.author.id = message.author.id;
        await message.channel.send(question);
        try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };


    /*
    --- SEND aMESSAGE TO aCHANNEL ---

    Finds aChannel, defined in the config file, and sends aMessage
    */
    client.aMessage = async (guild, text) => {
        const settings = guild ? client.settings.get(guild.id) : client.config.defaultSettings;
        let guildChannel;
        if (guild.channels.exists("name", settings.aChannel))
            guildChannel = await guild.channels.find(r => r.name === settings.aChannel);
        else return;

        guildChannel.send(text).catch(console.error);
    };


    /*
    --- SWGOH.GG PROFILE CHECK ---

    Checks to see which method a user is inputing the profile and arguments and
    returns those
    */
    client.profileCheck = (message, args) => {

        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

        let profile;
        let text;
        let error;

        if (args[0] && args[0].startsWith("~")) {
            profile = args[0].replace("~", "");
            text = args.slice(1).join(" ");
        } else if (message.mentions.users.first() && message.mentions.users.first().bot === false) {
            profile = client.profileTable.get(message.mentions.users.first().id);
            text = args.slice(1).join(" ");
        } else {
            profile = client.profileTable.get(message.author.id);
            text = args.join(" ");
        }

        if (profile === undefined) error = `I can't find a profile for that username, try adding your swgoh.gg username with \`${settings.prefix}add\`.`;
        return [profile, text.toLowerCase(), error];
    };


    /*
    --- MESSAGE CLEAN FUNCTION ---

    "Clean" removes @everyone pings, as well as tokens, and makes code blocks
    escaped so they're shown more easily. As a bonus it resolves promises
    and stringifies objects!
    This is mostly only used by the Eval and Exec commands.
    */
    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
        text = await text;
        if (typeof evaled !== "string")
        text = require("util").inspect(text, {depth: 0});

        text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    };


    /*
    --- ADD POINTS ---

    Give the sender 1 point if pointsEnabled
    Useful for things like giving users an extra point for using a command or
    for submitting a bug/suggestion
    */
    client.addPoints = (message, extraPoints) => {
        // Double-check for botception! Why not
        // Also check for message.guild
        if (message.author.bot || !message.guild) return;

        const settings = client.settings.get(message.guild.id);
        if (settings.pointsEnabled != "true") return;

        const guildUser = message.guild.id + message.author.id;
        let userPoints = Number(client.pointsTable.get(guildUser));

        // If the user doesn't already have points, set it to 0
        // and assign the lowest roleReward
        if (!userPoints) {
            userPoints = 0;
            if (settings.roleRewardsEnabled === "true") {
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
            if (!roleName || roleName === undefined || settings.roleRewardsEnabled != "true" || !message.member.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                message.channel.send(congratsMessage);
            } else if (settings.roleRewardsEnabled === "true") {
                client.assignRole(message.member, roleName);
                client.removePointsRole(message.member, newLevel);
                message.channel.send(`${congratsMessage}\nYou've been promoted to **${roleName}**!`);
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

        // If the bot cannot manage roles, then don't even try to
        if (!member.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;

        let role = member.guild.roles.find(r => r.name === roleName);
        if (!role) {
            try {
                role = await member.guild.createRole({
                    name: roleName,
                    color: [],
                    permissions: []
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        await member.addRole(role).catch(console.error);
        return;
    };


    /*
    --- REMOVE PREVIOUS REWARD ROLE ---

    Used in conjuction with the Apply Role Reward from Points. Uses user's level
    to determine which previous role to remove
    */
    client.removePointsRole = async (member, curLevel) => {

        // If the bot cannot manage roles, then don't even try to
        if (!member.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;

        let oldRole;

        for (let i = 1; i < 100; i++) {
            const lvl = curLevel - i;
            oldRole = client.config.roleRewards.find(l => l.level === lvl);
            if (oldRole != undefined) break;
        }

        const role = member.guild.roles.find(r => r.name === oldRole.name);

        await member.removeRole(role).catch(console.error);
        return;
    };


    /*
    --- SENDS A RICH EMBED TO MOD-LOG ---

    Used to log System commands such as kick and ban. Responds with an embed
    including action, user (target), moderator, reason and timestamp
    */
    client.modlogEmbed = async (message, command, color = 0xCACBCE, user, reason, duration = "", amount = "") => {
        const { RichEmbed } = require("discord.js");
        const settings = client.settings.get(message.guild.id);
        const modlog = message.guild.channels.find("name", settings.modLogChannel);

        if (!modlog) return message.reply("the deed is done.");

        // Here we search the modlog channel for the last case number and add
        // 1 to it, if it's not found, start at 1
        // Searches previous 100 messages
        const messages = await modlog.fetchMessages({limit:100});

        const log = messages.filter(m => m.author.id === client.user.id &&
            m.embeds[0] &&
            m.embeds[0].type === "rich" &&
            m.embeds[0].footer &&
            m.embeds[0].footer.text.startsWith("Case")
        ).first();

        let lastCase;
        if (log) lastCase = /Case\s(\d+)/.exec(log.embeds[0].footer.text);
        const caseNumber = lastCase ? parseInt(lastCase[1]) + 1 : 1;

        // Here we check for unused variables
        if (user) user = `\n**User:** ${user} (${user.id})`;
        if (!user) user = `\n**Channel**: <#${message.channel.id}> (${message.channel.id})`;
     // if (!reason) reason = `Awaiting moderator's input, use \`${settings.prefix}reason ${caseNumber} <reason>\``;
        if (reason) reason = `\n**Reason:** ${reason}`;
        if (duration) duration = `\n**Duration:** ${duration}`;
        if (amount) amount = `\n**Amount:** ${amount}`;

        // This is the RichEmbed that is sent to the modlog channel
        const embed = new RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(color)
            .setDescription(`**Action:** ${command.toProperCase()}${duration}${user}${amount}${reason}`)
            .setTimestamp()
            .setFooter(`Case ${caseNumber}`);
        return client.channels.get(modlog.id).send({embed});
    };


    /*
    --- SENDS A RICH EMBED TO BOT-LOG ---

    This is similar to the mod-log embed, but this is sent to the botLog channel
    for events like guild creation and reconnecting. Useful so that the logs
    don't have to be checked as frequently
    */
    client.botLogEmbed = async (client, description, events, color = 0xCACBCE) => {
        const { RichEmbed } = require("discord.js");
        const botLogChannel = client.channels.get(client.config.botLogChannel);
        if (!botLogChannel) return;

        const embed = new RichEmbed()
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(events);
        return botLogChannel.send({embed});
    };


    /* ===== MISCELLANEOUS NON-CRITICAL FUNCTIONS ===== */


    // Replaces clone names to be more aesthetically pleasing, also returns
    // toProperCase
    // **ONLY ACCEPTS STRINGS**
    client.checkClones = (textSting) => {
        let text = textSting.toLowerCase();
        text = text.replace("cc 2224 cody", "cody").replace('cc-2224 "cody"', "cody") // eslint-disable-line quotes
            .replace("ct 21 0408 echo", "echo").replace('ct-21-0408 "echo"', "echo") // eslint-disable-line quotes
            .replace("ct 5555 fives", "fives").replace('ct-5555 "fives"', "fives") // eslint-disable-line quotes
            .replace("ct 7567 rex", "rex").replace('ct-7567 "rex"', "rex"); // eslint-disable-line quotes
        return text.toProperCase();
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
    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        console.error("Uncaught Exception: ", errorMsg);
        // Always best practice to let the code crash on uncaught exceptions.
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });

};
