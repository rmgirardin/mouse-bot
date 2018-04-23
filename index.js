if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == "object") {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

const Discord = require("discord.js");
const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const request = require("request-promise-native");
const charactersJS = require("./modules/characters.js");
const shipsJS = require("./modules/ships.js");


const client = new Discord.Client();

// Here we load the config and functions files
client.config = require("./config.js");
require("./modules/functions.js")(client);

// Also the Logger
client.logger = require("./modules/logger");

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();
client.swgohData = new Enmap();

// Setting up the Enhanced Map module
client.settings = new Enmap({provider: new EnmapLevel({ name: "settings" })});
client.pointsTable = new Enmap({provider: new EnmapLevel({ name: "points" })});
client.profileTable = new Enmap({provider: new EnmapLevel({ name: "profiles" })});
client.cache = new Enmap({provider: new EnmapLevel({ name: "cache" })});
client.logs = new Enmap({ provider: new EnmapLevel({ name: "log" })});

const init = async () => {

    // Now we load **commands** into memory, as a collection
    const cmdFiles = await readdir("./commands/");
    client.logger.log(client, `Loading ${cmdFiles.length} commands:`,);
    cmdFiles.forEach(cmdFile => {
        if (!cmdFile.endsWith(".js")) return;
        client.loadCommand(cmdFile);
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(client, `Loading ${evtFiles.length} events:`);
    evtFiles.forEach(file => {
        try {
            const eventName = file.split(".")[0];
            const event = require(`./events/${file}`);
            client.logger.log(client, `Load Event: ${eventName}...`);
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
        } catch (error) {
            client.logger.error(client, `Unable to load command ${file}:\n${error.stack}`);
        }
    });

    // Generate a cache of client permissions
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    // GET and merge character databases
    const charactersURL = "https://swgoh.gg/api/characters/";
    const charactersOptions = { uri: charactersURL, json: true };
    let characters;

    try {
        characters = await request(charactersOptions);

        // Loop through our character array, find the matching characters in the swgoh.gg api
        // and merge its data into ours.
        for (var i = 0; i < characters.length; i++) {

            const chData = getObjects(charactersJS, "name", characters[i].name);

            if (chData.length == 1) Object.assign(characters[i], chData[0]);
            else if (chData.length == 0) client.logger.warn(client, `No JS results found for character: ${characters[i].name}`);
            else client.logger.warn(client, `Multiple results found for character: ${characters[i].name}`);
        }
    } catch (error) {
        client.logger.error(client, `Character Request Failure\n${error.stack}`);
    }

    // GET and merge ship databases
    const shipsURL = "https://swgoh.gg/api/ships/";
    const shipsOptions = { uri: shipsURL, json: true };
    let ships;

    try {
        ships = await request(shipsOptions);

        // Loop through our ships array, find the matching ships in the swgoh.gg api
        // and merge its data into ours.
        for (var j = 0; j < ships.length; j++) {

            const sData = getObjects(shipsJS, "name", ships[j].name);

            if (sData.length == 1) Object.assign(ships[j], sData[0]);
            else if (sData.length == 0) client.logger.warn(client, `No JS results found for ship: ${ships[j].name}`);
            else client.logger.warn(client, `Multiple results found for ship: ${ships[j].name}`);
        }
    } catch (error) {
        client.logger.error(client, `Ships Request Failure\n${error}`);
    }

    client.swgohData.set("charactersData", characters);
    client.swgohData.set("shipsData", ships);

    client.login(client.config.token);

};

init();
