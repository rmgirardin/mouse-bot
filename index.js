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
require("./modules/db-handler.js")(client);

// Also the Logger
client.logger = require("./modules/logger");

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();
client.swgohData = new Enmap();

// Setting up the databases
client.pointsTable = new Enmap({provider: new EnmapLevel({ name: "points" })});
client.cache = new Enmap({provider: new EnmapLevel({ name: "cache" })});


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
    const charactersURL = "https://swgoh.gg/api/characters/?format=json";
    const charactersOptions = { uri: charactersURL, json: true };
    let characters;
    const maxRetries = 3;
    let retries = 0;

    while (!characters) {
        try {
            characters = await request(charactersOptions);

            // Loop through our character array, find the matching characters in the swgoh.gg api
            // and merge its data into ours.
            if (characters) {
                for (var i = 0; i < characters.length; i++) {
                    const character = characters[i];

                    if (character) {
                        const chData = getObjects(charactersJS, "name", character.name);

                        if (chData.length == 1) Object.assign(character, chData[0]);
                        else if (chData.length == 0) {
                            const newCharacter = {
                                "name": character.name,
                                "faction": [character.alignment].concat(character.role).concat(character.categories),
                                "chImage": `https:${character.image}`
                            };
                            client.logger.warn(client, `No JS results found for character: ${character.name}. ${JSON.stringify(newCharacter)}`);
                        }
                        else client.logger.warn(client, `Multiple results found for character: ${character.name}`);
                    } else {
                        client.logger.warn(client, `Found an empty character in the swgoh.gg characters API at index: ${i}`);
                    }
                }
            } else {
                throw new Error("I wasn't able to get the list of characters from swgoh.gg's API!");
            }
        } catch (error) {
            if (retries < maxRetries) {
                retries++;
                client.logger.warn(client, `Character Request Failure: try ${retries} of ${maxRetries}\n${error.stack}`);
                continue;
            }
            client.logger.error(client, `Character Request Failure\n${error.stack}`);
        }
    }

    // GET and merge ship databases
    const shipsURL = "https://swgoh.gg/api/ships/?format=json";
    const shipsOptions = { uri: shipsURL, json: true };
    let ships;
    retries = 0;

    while (!ships) {
        try {
            ships = await request(shipsOptions);

            // Loop through our ships array, find the matching ships in the swgoh.gg api
            // and merge its data into ours.
            if (ships) {
                for (var j = 0; j < ships.length; j++) {
                    const ship = ships[j];
                    if (ship) {
                        const sData = getObjects(shipsJS, "name", ship.name);

                        if (sData.length == 1) Object.assign(ship, sData[0]);
                        else if (sData.length == 0) {
                            const newShip = {
                                "name": ship.name,
                                "faction": [ship.alignment].concat(ship.role).concat(ship.categories),
                                "sImage": `https:${ship.image}`
                            };
                            client.logger.warn(client, `No JS results found for ship: ${ship.name}. ${JSON.stringify(newShip)}`);
                        }
                        else client.logger.warn(client, `Multiple results found for ship: ${ship.name}`);
                    } else {
                        client.logger.warn(client, `Found an empty ship in the swgoh.gg ships API at index: ${j}`);
                    }
                }
            } else {
                throw new Error("I wasn't able to get the list of ships from swgoh.gg's API!");
            }
        } catch (error) {
            if (retries < maxRetries) {
                retries++;
                client.logger.warn(client, `Ships Request Failure: try ${retries} of ${maxRetries}\n${error.stack}`);
                continue;
            }
            client.logger.error(client, `Ships Request Failure\n${error}`);
        }
    }

    client.swgohData.set("charactersData", characters);
    client.swgohData.set("shipsData", ships);

    client.login(client.config.token);

};

init();
