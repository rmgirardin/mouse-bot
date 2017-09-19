# Mouse Bot 2.0
Mouse Bot is a Discord bot for Star Wars: Galaxy of Heroes players guilds and servers.

I started Mouse Bot as a side project mostly for myself. It started off with just the dailies command. Then my guild began to use it more often when I created the convert command. Now I’m happy to say that Mouse Bot 2.0 has 21 different commands ranging from game to Discord server moderation commands. I am striving to make Mouse Bot the definitive bot for SW:GoH and I hope you enjoy using him as much as I do!

I made Mouse Bot publicly available so that people can host him on their own servers if they want to. I also highly encourage people to modify and improve him. Create new commands that help players, guilds or the community in general. (If you do make any modifications or additions, please let me know so I can share them with everyone!)

This readme will explain how to install and host Mouse Bot on your own home computer or Raspberry Pi server. This is not a guide on how to use the bot.

A big shout-out to the [Guide Bot](https://github.com/An-Idiots-Guide/guidebot) created by Evie and York. Without their Guide Bot, I would still have a simple little one-file bot.

## Requirements
- Command Prompt or Terminal
-  A code editor: [Atom](https://atom.io/), [VS Code](https://www.visualstudio.com/en-us/products/code-vs.aspx), or [Sublime Text](https://www.sublimetext.com/3)
- Git ([Mac](https://git-scm.com/download/mac)|[Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/download/linux))
- Node.js [Version 8+](https://nodejs.org/)
- Your bot’s [token](https://discordapp.com/developers/applications/me) ([This](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) is a good guide for getting your bot’s token)

## Cloning and Installing
Using the command prompt inside the directory you want to put the folder, type:

`git clone https://github.com/rmgirardin/mouse-bot.git`

Then go into the mouse-bot folder with `cd mouse-bot` and run `npm install`. This will install all the node modules you need to run the bot.

## Setting up and Running
Rename `config.js.example` to `config.js`

With your code editor, open the config.js file:
- Enter your bot’s token within the empty quotation marks after `"token":`
- Enter your Discord ID within the empty quotation marks after `"ownerID":`
- To get your Discord ID follow [these instructions](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

In the command prompt within the root project folder directory, you can run the bot with `node index.js`.
Alternatively you can use `node ` and drag the folder path into the terminal.

Now you just need to invite your bot to your server. You can generate a full OAuth Link [here](https://finitereality.github.io/permissions-calculator/?v=2146958591). The Client ID can be found the same place you found your bot token.

## Adding Commands
You can add commands by creating new files in the `commands` folder (new-command-name.js). To use new commands, you’ll need to restart the bot by hitting `ctrl+c` and retyping (or hitting the up arrow key) `node index.js`. If you are just editing already loaded commands while your bot is running, as the bot owner, you can use the `reload <command-name>` command within Discord to reload commands without restarting your bot.

## Support
If you need help, you can always ask me. I’m available on Discord: Necavit#0540 or through email: support@girard.in

If you find any bugs or typos, please let me know!
I hope you enjoy this bot as much as I do!

----
The developer of this application does not have any affiliation with the EA, EA Capital Games, Disney, Lucasfilm LTD or swgoh.gg
