exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("I do not have permission to do that.");

    const user = message.mentions.users.first();
    if (!user) return client.cmdError(message, cmd);

    const reason = args.slice(1).join(" ");

    let role = client.guilds.get(message.guild.id).roles.find("name", "Muted");

    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: ["LIGHT_GREY"],
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => { // eslint-disable-line no-unused-vars
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (message.guild.member(user).roles.has(role.id)) {
        await message.guild.member(user).removeRole(role).then(() => {
            client.modlogEmbed(message, "unmute", 0xFFFF00, user, reason);
        }).catch(console.error);
    }
    else {
        await message.guild.member(user).addRole(role).then(() => {
            client.modlogEmbed(message, "mute", 0xFFFF00, user, reason);
        }).catch(console.error);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unmute"],
    permLevel: "Moderator"
};

exports.help = {
    name: "mute",
    category: "System",
	description: "Mutes or unmutes the specified user",
	usage: "mute <user-mention> [reason]",
    examples: ["mute @Necavit#0540 He talkes too much", "unmute @Necavit#0540 I'll be nice", "mute @DarthSidious#0066"]
};
