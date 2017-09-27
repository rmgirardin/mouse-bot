const raidKey = {
    "rancor": 1, "pit" : 1,
    "tank"  : 2, "haat": 2, "aat": 2,
    1: "Pit", 2: "Tank Takedown"
};

// Damage per percent for each phase of the raids
const phaseMultipliers = {
    1: {"p1": 18709, "p2": 30063,  "p3": 32884,  "p4": 21230},
    2: {"p1": 40598, "p2": 192000, "p3": 120000, "p4": 120000},
};

function calculate(num, sorted, isPercent) {
    const list = phaseMultipliers[sorted[0]];
    if (!list) return NaN;
    const multiplier = list[sorted[1]];
    if (isPercent == true) {
        return multiplier == null ? NaN : num * multiplier;
    } else {
        return multiplier == null ? NaN : num / multiplier;
    }
}

exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // Return and send error message if there is not 3 args
    if (!args[2]) return client.cmdError(message, cmd);

    const messageContent = args.join("|").toLowerCase().split("|");

    let num = messageContent.sort().splice(0, 1); // Sort and remove the number which is not at [0]
    num = num.toString().split(",").join(""); // Remove commas
    let isPercent = false;

    if (num.toString().indexOf("%") > -1) {
        isPercent = true;
        num = parseFloat(num);
    }

    const convert = n => raidKey[n.toString()] || n;
    const sorted = messageContent.map(convert).sort();
    const phaseNum = sorted[1].replace(/[a-z]/g, "").toString();

    const damage = calculate(num, sorted, isPercent);

    if (isNaN(damage)) {
        client.cmdError(message, cmd);
    } else if (isPercent == true) {
        message.channel.send(num + "% is about " + Math.round(damage).toLocaleString() + " in Phase " + phaseNum + " of the " + raidKey[sorted[0]] + " raid.");
    } else {
        message.channel.send(Number(num).toLocaleString() + " is about " + damage.toFixed(2) + "% in Phase " + phaseNum + " of the " + raidKey[sorted[0]] + " raid.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "convert",
    category: "Game",
	description: "Converts a raid damage to percentage (or vice versa)",
	usage: "convert <number> <raid> <p1/p2/p3/p4>",
    examples: ["convert 12.69% pit p2", "convert p1 240,000 pit", "convert tank p2 1287"]
};
