const Discord = require('discord.js');
const client = new Discord.Client();
const env = require('./config.json');

// Defining the variables for the dailies
const guildReset = env.guildReset;
const rnow = "Right now it's ";
const greset = "Later will be ";
const day0 = "**Squad Arena**";
const day1 = "**Cantina Energy**";
const day2 = "**Light Side Battles**";
const day3 = "**Galactic War Battles**";
const day4 = "**Hard Mode Battles**";
const day5 = "**Challenges**";
const day6 = "**Dark Side Battles**";
const p1PitDamage = 18707;
const p2PitDamage = 30063;
const p3PitDamage = 32884;
const p4PitDamage = 21230;

// Help Array for /help command
var helpArray = [
    "/dailies",
    "/ch (character name)",
    "/convert __% (raid and phase) [converts percent to damage]",
    "/convert __ (raid and phase) [converts damage to percent]",
    "/help (command)"];

// ----- Connecting Mouse Bot ----- //
client.on('ready', () => {
    // client.channels.get(env.discord.generalChannel).sendMessage("<Vrrrrrvd tkk tkkdtk>");
	console.log("%s is servering %s channel(s) over %s server(s)", client.user.username, client.channels.size, client.guilds.size);
});

// When the Mouse Bot disconnects
client.on('disconnected', () => {
    // client.channels.get(env.discord.generalChannel).sendMessage("<RRRRDDTT!!!! Wewewedt! Veeeeedt!>");
	console.log("%s has powered down", client.user.username);
	process.exit(1); //exit node.js with an error
});

// Welcome new members to the server
client.on('guildMemberAdd', (member) => {
    const guild = member.guild;
    guild.channels.get(guild.id).sendMessage("Welcome, " + member.nickname + ". Please make sure to read the <#" + env.discord.rulesChannel + ">. If you need help, use \"/help\" and I'll assist.");
    console.log(member.nickname + ' joined the server: ' + server); // update console when member joins
});

// ----- /COMMANDS ----- //

client.on('message', message => {

    // Setting and checking for prefix
    const prefix = "/";
    if(!message.content.startsWith(prefix)) return;

    if(message.author.bot) return; //Prevent botception

    // ----- Raid Percent Converter
    breakme: if (message.content.startsWith(prefix + 'convert')) {
        extractNumber(message); // Extracts the damage or percent from the user's command message

        // The Pit Raid (if "pit" or "rancor" is in the message)
            if (message.content.includes('pit') || message.content.includes('rancor')) {
            var raid = "The Pit";

            // The Pit - Phase 1
            if (message.content.includes('p1') || message.content.includes('phase1')) {
                var phase = "1";
                if (message.content.includes('%') || message.content.includes('percent')) {
                    toPercent = false;
                    var damageInt = Math.round(p1PitDamage*numFloat);
                    convertionMessage(message, numFloat, damageInt, phase, raid, toPercent);
                } else {
                    toPercent = true;
                    var percentInt = (numFloat/p1PitDamage).toFixed(2);
                    convertionMessage(message, numFloat, percentInt, phase, raid, toPercent);
                } break breakme;
            }

            // The Pit - Phase 2
            if (message.content.includes('p2') || message.content.includes('phase2')) {
                var phase = "2";
                if (message.content.includes('%') || message.content.includes('percent')) {
                    toPercent = false;
                    var damageInt = Math.round(p2PitDamage*numFloat);
                    convertionMessage(message, numFloat, damageInt, phase, raid, toPercent);
                } else {
                    toPercent = true;
                    var percentInt = (numFloat/p2PitDamage).toFixed(2);
                    convertionMessage(message, numFloat, percentInt, phase, raid, toPercent);
                } break breakme;
            }

            // The Pit - Phase 3
            if (message.content.includes('p3') || message.content.includes('phase3')) {
                var phase = "3";
                if (message.content.includes('%') || message.content.includes('percent')) {
                    toPercent = false;
                    var damageInt = Math.round(p3PitDamage*numFloat);
                    convertionMessage(message, numFloat, damageInt, phase, raid, toPercent);
                } else {
                    toPercent = true;
                    var percentInt = (numFloat/p3PitDamage).toFixed(2);
                    convertionMessage(message, numFloat, percentInt, phase, raid, toPercent);
                } break breakme;
            }

            // The Pit - Phase 4
            if (message.content.includes('p4') || message.content.includes('phase4')) {
                var phase = "4";
                if (message.content.includes('%') || message.content.includes('percent')) {
                    toPercent = false;
                    var damageInt = Math.round(p4PitDamage*numFloat);
                    convertionMessage(message, numFloat, damageInt, phase, raid, toPercent);
                } else {
                    toPercent = true;
                    var percentInt = (numFloat/p4PitDamage).toFixed(2);
                    convertionMessage(message, numFloat, percentInt, phase, raid, toPercent);
                } break breakme;
            }
        }

        // Tank Takedown Raid (if "tank" or "aat" or "haat" is in the message)
        if (message.content.includes('tank') || message.content.includes('AAT') || message.content.includes('HAAT')) {
            var raid = "Tank Takedown";

            // Currently lets the user know that data has not been collected for the HAAT raid
            message.channel.sendMessage("I don't have any information on the damage of the Tank Takedown Heroic raid yet.");
            console.log(message.author.username + ' asked me to convert percent to damage for the Tank Takedown raid'); // update console
            break breakme;
        }

        // If the user's command message does not include a number, the raid and the phase, Mouse Bot will remind the user of the command format
        else {
            message.channel.sendMessage("I can help you convert raid percentage to damage or damage to percent. Try using the following format: `/convert __%  pit  p1`");
            console.log('I told ' + message.author.username + ' how to use the convert command.') // update console
        }
    }

	// ----- Dailies
	if (message.content.startsWith(prefix + 'dailies')) {
		dayCheck(message);
		console.log('Gave ' + message.author.username + ' the dailies update'); //update console
	}

	// ----- Character Seach
	if (message.content.startsWith(prefix + 'ch')) {
		characterLookup(message);
		console.log(message.author.username + ' asked me to search for character information'); // update console
	}

	// ----- Rules
	if (message.content.startsWith(prefix + 'rules')) {
		message.channel.sendMessage("The rules are located in the <#" + env.discord.rulesChannel + "> channel.");
		console.log(message.author.username + ' asked me about the rules'); // update console
	}

	// ----- What's my name again?
	if (message.content.startsWith(prefix + 'name')) {
		message.channel.sendFile('big_poppa.gif');
		console.log('I told ' + message.author.username + ' what I like to be called'); //update console
	}

	// ----- Time
	if (message.content.startsWith(prefix + 'time')) {
		var date = new Date();
		var day = date.getDay();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var time = hour.toString() + minute.toString();
		message.channel.sendMessage("The time is " + time + " and the day is " + day);
        console.log(message.author.username + ' asked for the time'); //update console
	}

    // ----- Help
    if (message.content.startsWith(prefix + 'help')) {
        var messageSubstring = message.content.substr(6);
        var str = messageSubstring.replace('/','');
        if (str.length < 1) {
            message.channel.sendMessage("Try using some of the following commands:```" + '\n' + helpLoop() + "```");
        } else if (env.help[str]) {
            message.channel.sendMessage(env.help[str]);
        } else {
            message.channel.sendMessage("I don't know that command. Make sure it's spelled correctly and try typing it again. For a list of commands, type \"/help\".");
        }
        console.log(message.author.username + ' asked for help on ' + str); //update console
    }
});

// ----- FUNCTIONS ----- //

// ----- Edit the user's message to look up on swgoh.gg
function characterLookup(message) {
	var messageSubstring = message.content.substr(3);
	var messageTrimmed = messageSubstring.trim();
	var messageReplaced = messageTrimmed.replace(" ","+");
	message.channel.sendMessage("<http://www.google.com/webhp?#q=" + messageReplaced + "+swgoh.gg+feeling+lucky&btnI>"); // Uses Google's "I'm feeling lucky" to search on swgoh.gg
// If the link above does not work, try using the link below
//        message.channel.sendMessage("http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=" + messageReplaced + "+swgoh.gg");
}

// ----- Sends the convertion command message
function convertionMessage(message, numFloat, numInt, phase, raid, toPercent) {
    if (toPercent == true) {
        message.channel.sendMessage(numFloat.toLocaleString() + " damage is about " + numInt + "% in Phase " + phase + " of the " + raid + " raid.");
        console.log(message.author.username + ' asked me to convert damage to percent for Phase ' + phase + ' of the ' + raid + ' raid.'); // update console
    } else {
        message.channel.sendMessage(numFloat + "% is about " + numInt.toLocaleString() + " damage in Phase " + phase + " of the " + raid + " raid.");
        console.log(message.author.username + ' asked me to convert percent to damage for Phase ' + phase + ' of the ' + raid + ' raid.'); // update console
    }
}

// ----- Check day of the week and time against the guild reset time and guild activities
function dayCheck(message) {
	var date = new Date();
	var day = date.getDay();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var time = hour.toString() + minute.toString();

	if (time > guildReset) {
		if (day == 0) {
			message.channel.sendMessage(rnow + day0 + '\n' + greset + day1);
		} else if (day == 1) {
			message.channel.sendMessage(rnow + day1 + '\n' + greset + day2);
		} else if (day == 2) {
			message.channel.sendMessage(rnow + day2 + '\n' + greset + day3);
		} else if (day == 3) {
			message.channel.sendMessage(rnow + day3 + '\n' + greset + day4);
		} else if (day == 4) {
			message.channel.sendMessage(rnow + day4 + '\n' + greset + day5);
		} else if (day == 5) {
			message.channel.sendMessage(rnow + day5 + '\n' + greset + day6);
		} else if (day == 6) {
			message.channel.sendMessage(rnow + day6 + '\n' + greset + day0);
		}

	} else {
		if (day == 1) {
			message.channel.sendMessage(rnow + day1 + '\n' + greset + day2);
		} else if (day == 2) {
			message.channel.sendMessage(rnow + day2 + '\n' + greset + day3);
		} else if (day == 3) {
			message.channel.sendMessage(rnow + day3 + '\n' + greset + day4);
		} else if (day == 4) {
			message.channel.sendMessage(rnow + day4 + '\n' + greset + day5);
		} else if (day == 5) {
			message.channel.sendMessage(rnow + day5 + '\n' + greset + day6);
		} else if (day == 6) {
			message.channel.sendMessage(rnow + day6 + '\n' + greset + day0);
		}  else if (day == 0) {
			message.channel.sendMessage(rnow + day0 + '\n' + greset + day1);
		}
	}
}

// ----- Extracts the number from a string and assigns it to the variable "numFloat"
function extractNumber(message) {
    var messageArray = message.toString().split(' ');
    for (i = 0; i < messageArray.length; i++) {
        j = parseFloat(messageArray[i].replace(/,/g, ''));
        if (!isNaN(j)) {
            numFloat = j;
            return numFloat;
        }
    }
}

// ----- List helpArray and return as string with line breaks
function helpLoop() {
	var text = "";
	for (i = 0; i < helpArray.length; i++) {
		text += '\n' + helpArray[i];
	}
	return text;
}

client.login(env.discord.token);
