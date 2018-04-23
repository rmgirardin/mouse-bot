// This event executes when a member leaves a server

module.exports = (client, member) => {

    if (member.user.bot) return; // Prevents botception!

    try {
        // Here we delete the user's points from the guild
        // They have to start over from 0 if they rejoin
        const guildUser = member.guild.id + member.id;
        client.pointsTable.delete(guildUser);
    } catch (e) {
        console.error("[guildMemberRemove.js] Error removing user from pointsTable", e);
    }

};
