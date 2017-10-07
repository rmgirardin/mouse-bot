if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

const client = new Discord.Client();

// Here we load the config and functions files
client.config = require("./config.js");
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Setting up the Enhanced Map module
client.settings = new Enmap({name: "settings", persistent: true});
client.pointsTable = new Enmap({name: "points", persistent: true});
client.profileTable = new Enmap({name: "profiles", persistent: true});

const init = async () => {

    // Now we load **commands** into memory, as a collection
    const cmdFiles = await readdir("./commands/");
    client.log("log", `Loading ${cmdFiles.length} commands:`, "Loading");
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.log("log", `Loading ${evtFiles.length} events:`, "Loading");
    evtFiles.forEach(file => {
        try {
            const eventName = file.split(".")[0];
            const event = require(`./events/${file}`);
            client.log("log", `Loading Event: ${eventName}...`, "Loading");
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
        } catch (err) {
            client.log("log", `Unable to load event ${file}: ${err}`, "Error!!");
        }

    });

    // Generate a cache of client permissions
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);

};

init();
