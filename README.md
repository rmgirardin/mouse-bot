# Mouse Bot

A helpful Discord bot for Star Wars: Galaxy of Heroes.<br>
This bot uses [discord.js](https://github.com/hydrabolt/discord.js.git) API for node.js.

## Installation

To run off of your computer, you'll first need [node 0.12+](https://www.npmjs.com/package/forever/tutorial).

Then install discord.js through the terminal: `npm install discord.js`<br>

Open `config.json.example` and add keys to the blank fields. For `token` add you're bots token from the [Discord App](https://discordapp.com/developers/applications/me) page. Then add the rules channel ID to `rulesChannel`. If you do not use a rules channel, you can just ignore this (just don't use the `/rules` command or comment out that command in the code). (If you don't know how to find the channel ID, follow [these instructions](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-server-ID-)). Finally, rename `config.json.example` to `config.json`.

Now you can use `node app.js` in the terminal in your mouse-bot directory folder. Alternatively you can use `node ` and drag the folder path into the terminal.

## Functionality

#### ~~New Members Added to Server~~
~~The bot recognizes when new users are added to the server and greets then with a custom greeting. By default, Mouse Bot greets the user and tells them to review the `#rules` channel.~~

#### Commands

- /help
    - lists /commands
    - typing a command after '/help' gives a description of that command
- /dailies
    - tells you the current and upcoming guild activity
- /ch *(character name)*
    - this will look up the character information on swgoh.gg
    - Mouse bot returns a link using Google's "I'm Feeling Lucky" feature
- /rules
    - tells you to visit the `#rules` channel
- /convert
    - Can convert the percent amount to damage in raids (must include the word 'percent' or '%' to work)
    - Can convert the amount of damage you need to do to a percent value
    - Works for both Tier 7 Rancor Raid and the Heroic Tank Takedown raid
        - Heroic Tank Takedown raid values are estimates as of now
- /no
    - Mouse bot responds with a gif: `vader_no.gif`
- /yes
    - Mouse bot responds with a gif: `vader_dance.gif`

## To-Do

- Add forum feed updater (might go back to using twitter)
- Clean and consolidate code
- Reimplement welcome when new members join the server
- ignore `/rules` command if there is no rules channel ID.

## Help
If you need help, you can always ask me.

If you like this and want to help make it better, please fork this repo and let me know about it. I know that there are better ways to implement some of the functionality of the bot, so any help or pointers would be appreciated!
