const Discord = require('discord.js');
const env = require('./config.json');
const bot = new Discord.Client();

// Initialize timer
const Timer = require('timer.js');
var timer = new Timer({
    tick: 30,
    onstart : function() {
        console.log('A timer has been started'); // update console
    },
    onstop : function() {
        console.log('The timer has been stopped'); // update console
        bot.sendMessage(env.discord.officerChannel, "For some reason, your timer has been stopped.")
    },
    onend : function() {
        console.log('The timer has ended'); // update console
    }
});

// Set up Twitter streaming from @bot_mouse
const Twitter = require('user-stream');
const streamer = new Twitter({
    consumer_key: env.twitter.cKey,
    consumer_secret: env.twitter.cSecret,
    access_token_key: env.twitter.aTokenKey,
    access_token_secret: env.twitter.aTokenSecret
});
streamer.stream();

// Post any new tweets to the #announcements channel
streamer.on('data', function(json) {
	var tweet = json;
	bot.sendMessage(env.discord.annChannel, tweet.text);
	console.log("An update from the forums has been posted in #announcements");
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
    "/dailies (lists current and next guild activity)",
    "/ch *<character name>* (looks up character info on swgoh.gg)",
    "/rancor (starts a 24 hour timer and posts reminders in #announcements)",
    "/stimer *<#>* (starts a timer for # minutes)",
    "/help (repeats this message)"]

// Connecting Mouse Bot
bot.on("ready", () => {
	console.log("Ready to begin serving!");
});

// When the Mouse Bot disconnects
bot.on("disconnected", () => {
	console.log("I've been disconnected!");
	process.exit(1); //exit node.js with an error
});

// Welcomes new members to the server
bot.on('serverNewMember', (server, user) => {
  bot.sendMessage(server.channels.get('name', 'general'), "Welcome, " + user.username + ". I am Mouse Bot here to serve. Please make sure to read the #rules channel. If you ever need help, just use '/help' and I'll be there to assist.");
  console.log(user.username + " joined the server: " + server); // update console
});

// ----- /COMMANDS ----- //

bot.on("message", msg => {

    // Setting and checking for prefix
    const prefix = "/";
    if(!msg.content.startsWith(prefix)) return;
    if(msg.author.bot) return;

	// ----- Dailies
	if (msg.content.startsWith(prefix + "dailies")) {
		dayCheck(msg);
		console.log("Gave " + msg.author.username + " the dailies update"); // update console
	}

	// ----- Character Seach
	if (msg.content.startsWith(prefix + "ch")) {
		characterLookup(msg);
		console.log(msg.author.username + " asked me to search for character information"); // update console
	}

    // ----- Rancor Raid Timer and Notifier
    if (msg.content.startsWith(prefix + "rancor")) {
        timer.start(env.rancor.timerHours*3600); // convert hours to seconds
        timer.on('start', function() {
            bot.sendMessage(env.discord.annChannel, env.rancor.startMsg);
        })
        timer.on('end', function() {
            bot.sendMessage(env.discord.annChannel, env.rancor.endMsg);
        })
    }

    // ----- Timer
    if (msg.content.startsWith(prefix + "tstart")) {
        var messageSubstring = msg.content.substr(7);
        var messageTrimmed = messageSubstring.trim();
        var minutesToSeconds = 60*parseInt(messageTrimmed);
        timer.start(parseInt(minutesToSeconds));
        bot.sendMessage(msg, "Timer started for " + messageTrimmed + " minutes.");
        timer.on('end', function() {
            bot.sendMessage(msg, "*DING* *DING* *DING*" + '\n' + "Timer has ended.");
        })
    }

	// ----- Rules
	if (msg.content.startsWith(prefix + "rules")) {
		bot.sendMessage(msg, "The rules are updated in the #rules channel.");
		console.log(msg.author.username + " asked me about the rules"); // update console
	}

	// ----- What's my name?
	if (msg.content.startsWith(prefix + "name")) {
		bot.sendTTSMessage(msg, "I love it when you call me big pop-pa!");
		console.log("I told " + msg.author.username + " what I like to be called"); // update console
	}

	// ----- Time
	if (msg.content.startsWith(prefix + "time")) {
		var date = new Date();
		var day = date.getDay();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var time = hour.toString() + minute.toString();
		bot.sendMessage(msg, "The time is " + time + " and the day is " + day);
	}

    // ----- Help
    if (msg.content.startsWith(prefix + "help")) {
        bot.sendMessage(msg, "I am user.name. I know everything about SWGoH. Try using some of the following commands:" + '\n' + helpLoop());
        console.log(msg.author.username + " asked for help"); // update console
    }
});

// ----- FUNCTIONS ----- //

// Check day of the week and time against the guild reset time and guild activities
function dayCheck(msg) {
	var date = new Date();
	var day = date.getDay();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var time = hour.toString() + minute.toString();

	if (time > guildReset) {
		if (day == 0) {
			bot.sendMessage(msg, rnow + day0 + '\n' + greset + day1);
		} else if (day == 1) {
			bot.sendMessage(msg, rnow + day1 + '\n' + greset + day2);
		} else if (day == 2) {
			bot.sendMessage(msg, rnow + day2 + '\n' + greset + day3);
		} else if (day == 3) {
			bot.sendMessage(msg, rnow + day3 + '\n' + greset + day4);
		} else if (day == 4) {
			bot.sendMessage(msg, rnow + day4 + '\n' + greset + day5);
		} else if (day == 5) {
			bot.sendMessage(msg, rnow + day5 + '\n' + greset + day6);
		} else if (day == 6) {
			bot.sendMessage(msg, rnow + day6 + '\n' + greset + day0);
		}

	} else {
		if (day == 1) {
			bot.sendMessage(msg, rnow + day1 + '\n' + greset + day2);
		} else if (day == 2) {
			bot.sendMessage(msg, rnow + day2 + '\n' + greset + day3);
		} else if (day == 3) {
			bot.sendMessage(msg, rnow + day3 + '\n' + greset + day4);
		} else if (day == 4) {
			bot.sendMessage(msg, rnow + day4 + '\n' + greset + day5);
		} else if (day == 5) {
			bot.sendMessage(msg, rnow + day5 + '\n' + greset + day6);
		} else if (day == 6) {
			bot.sendMessage(msg, rnow + day6 + '\n' + greset + day0);
		}  else if (day == 0) {
			bot.sendMessage(msg, rnow + day0 + '\n' + greset + day1);
		}
	}
}

// Edit the user's message to look up on swgoh.gg
function characterLookup(msg) {
	var messageSubstring = msg.content.substr(3);
	var messageTrimmed = messageSubstring.trim();
	var messageReplaced = messageTrimmed.replace(" ","+");
	bot.sendMessage(msg, "http://www.google.com/webhp?#q=" + messageReplaced + "+swgoh.gg+feeling+lucky&btnI"); // Uses Google's "I'm feeling lucky" to search on swgoh.gg
// If the link above does not work, try using the link below
//        bot.sendMessage(msg, "http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=" + messageReplaced + "+swgoh.gg");
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
function output(error, token) {
        if (error) {
                console.log(`There was an error logging in: ${error}`);
                return;
        } else
                console.log(`Mouse Bot has successfully logged in.`);
}

bot.loginWithToken(env.discord.token, output);
