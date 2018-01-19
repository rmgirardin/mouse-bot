# Mouse Bot 2.0
[![David](https://img.shields.io/david/rmgirardin/mouse-bot.svg)](https://david-dm.org/rmgirardin/mouse-bot) [![Codacy grade](https://img.shields.io/codacy/grade/6d6eebf5e04944659be34b926d80a021.svg)](https://www.codacy.com/app/rmgirardin/mouse-bot/dashboard) [![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/rmgirardin/mouse-bot/blob/master/LICENSE) [![support](https://img.shields.io/badge/support-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=M2R6Q8AN4CW66) [![discord](https://img.shields.io/badge/chat-Discord-7289DA.svg)](https://discord.gg/ZytN4aC)

Mouse Bot is a Discord bot for Star Wars: Galaxy of Heroes players guilds and servers.

I started Mouse Bot as a side project mostly for myself. It started off with just the dailies command. Then my guild began to use it more often when I created the convert command. Now I’m happy to say that Mouse Bot 2.0 has 22 different commands ranging from game to Discord server moderation commands. I am striving to make Mouse Bot the definitive bot for SW:GoH and I hope you enjoy using him as much as I do!

I made Mouse Bot publicly available so that people can host him on their own servers if they want to. I also highly encourage people to modify and improve him. Create new commands that help players, guilds or the community in general. (If you do make any modifications or additions, please let me know so I can share them with everyone!)

This readme will explain how to install and host Mouse Bot on your own home computer or Raspberry Pi server. This is not a user manual for the bot. This is the [user manual](https://rmgirardin.gitbooks.io/mouse-bot-user-manual/).

## To Edit or To Install
I have uploaded the code onto GitHub for anyone that is looking to edit code or add commands on their own. If you want to do that, the following instructions should help you get him up and running.

If you do not want to go through the hassle of installing everything and hosting Mouse Bot on your own server, then you can simply use the following link to add him to your server. [Add Mouse Bot to your server](https://discord.now.sh/213381103287926785?p1946545238).

> *Please note, this is still beta.* I am still working out the kinks and if he goes offline for some time and I don’t catch it, just let me know and I will get him back up.

## Requirements
- Command Prompt or Terminal
-  A code editor: [Atom](https://atom.io/), [VS Code](https://www.visualstudio.com/en-us/products/code-vs.aspx), or [Sublime Text](https://www.sublimetext.com/3)
- Git ([Mac](https://git-scm.com/download/mac)|[Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/download/linux))
- Node.js [Version 8+](https://nodejs.org/)
- Your bot’s [token](https://discordapp.com/developers/applications/me) ([This](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) is a good guide for getting your bot’s token)

## Cloning and Installing
Using the terminal inside the directory you want to put the folder, type:

	git clone https://github.com/rmgirardin/mouse-bot.git

Then go into the mouse-bot folder with `cd mouse-bot` and run `npm install`. This will install all the node modules you need to run the bot.

## Setting up and Running
Rename `config.js.example` to `config.js`

With your code editor, open the config.js file:
- Enter your bot’s token within the empty quotation marks after `"token":`
- Enter your Discord ID within the empty quotation marks after `"admins":`
- To get your Discord ID follow [these instructions](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

In the command prompt within the root project folder directory, you can run the bot with `node index.js`. Alternatively you can use `node ` and drag the folder path into the terminal.

> If you decide to use PM2, you do not need to do this. See below for instruction on how to use PM2.

Now you just need to invite your bot to your server. You can generate a full OAuth Link [here](https://finitereality.github.io/permissions-calculator/?v=2146958591). The Client ID can be found the same place you found your bot token.

## Using PM2
Install PM2 with `npm i pm2 -g`

To begin running your app with PM2, just type:

	pm2 start index.js -n mousebot

All your PM2 commands might require you to use `sudo` before the command if you are using a Mac or Linux.
We've given the app the name mousebot with `-n mousebot`. This will make it easier to call in the future.

Now finish the setup with `pm2 startup` and follow the instructions. If you are on Windows, you will need to install [pm2-windows-startup](https://www.npmjs.com/package/pm2-windows-startup).

Mouse Bot should now run even when you close the terminal. You can restart the app with `pm2 restart mousebot`. You can also use `pm2 monit` to monitor the app and watch real-time log.

## Adding Commands
You can add commands by creating new files in the `commands` folder (new-command-name.js). To use new commands, you’ll need to restart the bot by hitting `ctrl+c` and retyping (or hitting the up arrow key) `node index.js`. If you are using PM2, you can just type `pm2 restart mousebot`.
If you are just editing already loaded commands while your bot is running, as the bot owner, you can use the `reload <command-name>` command within Discord to reload commands without restarting your bot.

----
## Contribute
The first way you can contribute is by forking this repo or creating a pull request and making changes that improve or expand the bot. Please don't hesitate!

If you don't want to code, but you want to contribute, you can always [donate](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=M2R6Q8AN4CW66). This bot takes a lot of time to create and maintain.


## Support
If you enjoy using Mouse Bot, please consider supporting it so that Mouse Bot can continue to improve and get better either by contributing code and support or contributing monetarily. Help me [host Mouse Bot on a better server](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=M2R6Q8AN4CW66).

If you need help, you can always ask me or join the [Discord support server](https://discord.gg/ZytN4aC).

If you find any bugs or typos, please let me know!
I hope you enjoy this bot as much as I do!


## Acknowledgements
A big shout-out to the [Guide Bot](https://github.com/An-Idiots-Guide/guidebot) created by Evie and York. Without their Guide Bot, I would still have a simple little one-file bot.

----
The developer of this application does not have any affiliation with the EA, EA Capital Games, Disney, Lucasfilm LTD or swgoh.gg
