# Mouse Bot

A quite, but helpful Discord bot for Star Wars: Galaxy of Heroes.<br>
This bot uses [discord.js](https://github.com/hydrabolt/discord.js.git) API for node.js.

## Installation

To run off of your computer, you'll first need [node 0.12+](https://www.npmjs.com/package/forever/tutorial).

Then install discord.js through the terminal: `npm install discord.js`<br>
You will also need to install `timer.js` the same way.

Open `config.json.example` and add keys to the blank fields. For `token` add you're bots token from the [Discord App](https://discordapp.com/developers/applications/me) page. Then add the announcements channel ID to `annChannel` and do the same for `officerChannel`. If you do not use an officer channel, you can just put the general channel's ID here. (If you don't know how to find the channel ID, follow [these instructions](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-server-ID-)) Also add the Twitter keys from the [Twitter Apps](https://apps.twitter.com/). Finally, rename `config.json.example` to `config.json`.

Now you can use `node app.js` in the terminal in your mouse-bot directory folder. Alternatively you can use `node ` and drag the folder path into the terminal.

## Functionality

#### New Members Added to Server
The bot recognizes when new users are added to the server and greets then with a custom greeting. In this case, it greets the user and tells them to review the `#rules` channel.

#### Commands

- /help
    - lists /commands
    - typing a command after '/help' gives a description of that command
- /dailies
    - tells you the current and upcoming guild activity
- /ch *(character name)*
    - this will look up the character information on swgoh.gg
    - Mouse bot returns a link using Google's "I'm Feeling Lucky" feature
- /rancor
    - we have a 0 damage policy for the first 24 hours. I implemented this to remind everyone about this rule when the command is first invoked and then announce when 24 hours is over so that everyone can begin attacking. Mouse bot reminds users in the `#announcements` channel
- /tstart *(#)*
    - begins a timer for that # of minutes
- /rules
    - tells you to visit the `#rules` channel

#### Forum Feed Updates
~~For this I use [IFTTT](http://ifttt.com) to tweet the post titles and links of [game](https://forums.galaxy-of-heroes.starwars.ea.com/categories/game-updates)/[developer](https://forums.galaxy-of-heroes.starwars.ea.com/categories/developer-updates) updates from the SWGoH forum to a twitter account. Using a twitter application, the bot streams the twitter feed with the help of `user-stream`.~~

This is now on the to-do and hopeful will be updated and working soon.

## To-Do

- Add forum feed updater
- Damage amount randomizer in raid message

## Help
If you need help, you can always ask me.

If you like this and want to help make it better, please fork this repo and let me know about it. I know that there are better ways to implement some of the functionality of the bot, so any help or pointers would be appreciated!
