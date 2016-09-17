const Discord = require('discord.js');
const bot = new Discord.Client();
const env = require('./config.json');

// Initialize timer
const Timer = require('timer.js');
var timer = new Timer({
    tick: 30,
    onstart : function() {
    },
    onstop : function() {
        console.log('The timer has been stopped'); // update console
        bot.sendMessage(env.discord.officerChannel, "For some reason, your timer has been stopped.")
    },
    onend : function() {
        console.log('The timer has ended'); // update console
    }
});

// Defining the variables
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

const helpArray = [
    "/dailies",
    "/ch *(character name)*",
    "/rancor",
    "/stimer *(#)*",
    "/help *(command)*"]

// Connecting Mouse Bot
bot.on('ready', () => {
	console.log("%s is servering %s channel(s) over %s server(s)", bot.user.username, bot.channels.size, bot.guilds.size);
});

// When the Mouse Bot disconnects
bot.on('disconnected', () => {
	console.log("NOOOOOOOO!! I've been disconnected!");
	process.exit(1); //exit node.js with an error
});

// Welcomes new members to the server
bot.on('guildMemberAdd', (guild, member) => {
  bot.channels.sendMessage("Welcome, " + member.nickname + ". Please make sure to read the <#" + env.discord.rulesChannel + ">. If you need help, use \"/help\" and I'll assist.");
  console.log(member.nickname + ' joined the server: ' + server); // update console
});

// ----- /COMMANDS ----- //

bot.on('message', message => {

    // Setting and checking for prefix
    const prefix = "/";
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

	// ----- Dailies
	if (message.content.startsWith(prefix + 'dailies')) {
		dayCheck(message);
		console.log('Gave ' + message.author.username + ' the dailies update'); // update console
	}

	// ----- Character Seach
	if (message.content.startsWith(prefix + 'ch')) {
		characterLookup(message);
		console.log(message.author.username + ' asked me to search for character information'); // update console
	}

    // ----- Rancor Raid Timer and Notifier
    if (message.content.startsWith(prefix + 'rancor')) {
        timer.start(env.rancorTimer*3600); // convert hours to seconds
        timer.on('start', function() {
            message.channel.sendMessage("The Rancor Raid has been started. Only do 0 damage for 24 hours. See the <#" + env.discord.rulesChannel + ">");
        })
        timer.on('end', function() {
            message.channel.sendMessage("It's been 24 hours since the raid has started. Everyone can attack like normal!");
        })
        console.log(message.author.username + ' has started the Rancor Raid timer') // update console
    }

    // ----- Timer
    if (message.content.startsWith(prefix + 'tstart')) {
        var messageSubstring = message.content.substr(7);
        var messageTrimmed = messageSubstring.trim();
        var minutesToSeconds = 60*parseInt(messageTrimmed);
        timer.start(parseInt(minutesToSeconds));
        message.channel.sendMessage("A timer has been started for " + messageTrimmed + " minute(s).");
        timer.on('end', function() {
            message.channel.sendMessage("*DING! DING! DING!*" + '\n' + "Your timer has ended.");
        })
        console.log(message.author.username + ' started a timer'); // update console
    }

	// ----- Rules
	if (message.content.startsWith(prefix + "rules")) {
		message.channel.sendMessage("The rules are updated in the <#" + env.discord.rulesChannel + "> channel.");
		console.log(message.author.username + " asked me about the rules"); // update console
	}

	// ----- What's my name?
	if (message.content.startsWith(prefix + "name")) {
		message.channel.sendTTSMessage("I love it when you call me big pop-pa!");
		console.log("I told " + message.author.username + " what I like to be called"); // update console
	}

	// ----- Time
	if (message.content.startsWith(prefix + "time")) {
		var date = new Date();
		var day = date.getDay();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var time = hour.toString() + minute.toString();
		message.channel.sendMessage("The time is " + time + " and the day is " + day);
        console.log(message.author.username + ' asked for the time'); // update console
	}

    // ----- Help
    if (message.content.startsWith(prefix + "help")) {
        var messageSubstring = message.content.substr(6);
        var str = messageSubstring.replace('/','');
        if (str.length < 1) {
            message.channel.sendMessage("I am " + bot.user.username + ". I know everything about SWGoH. Try using some of the following commands:" + '\n' + helpLoop());
        } else if (env.help[str]) {
            message.channel.sendMessage(env.help[str]);
        } else {
            message.channel.sendMessage("I don't know that command. Make sure it's spelled correctly and try typing it again. For a list of commands, type \"/help\".");
        }
        console.log(message.author.username + ' asked for help'); // update console
    }
});

// ----- FUNCTIONS ----- //

// Check day of the week and time against the guild reset time and guild activities
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

// Edit the user's message to look up on swgoh.gg
function characterLookup(message) {
	var messageSubstring = message.content.substr(3);
	var messageTrimmed = messageSubstring.trim();
	var messageReplaced = messageTrimmed.replace(" ","+");
	message.channel.sendMessage("<http://www.google.com/webhp?#q=" + messageReplaced + "+swgoh.gg+feeling+lucky&btnI>"); // Uses Google's "I'm feeling lucky" to search on swgoh.gg
// If the link above does not work, try using the link below
//        bot.sendMessage("http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=" + messageReplaced + "+swgoh.gg");
}

// List helpArray and return as string with line breaks
function helpLoop() {
	var text = "";
	for (i = 0; i < helpArray.length; i++) {
		text += '\n' + helpArray[i];
	}
	return text;
}

// Login output
function output(error) {
        if (error) {
                console.log('There was an error logging in: %s', error);
                return;
        } else
                console.log('%s has successfully logged in.', bot.user.username);
}

bot.login(env.discord.token);
