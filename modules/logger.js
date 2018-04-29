/*
Logger class for easy and aesthetically pleasing console logging
*/
const chalk = require("chalk");
const moment = require("moment");

async function sqlLog(client, type, details) {
    try {
        await client.doSQL(
            "INSERT INTO botlog (timestamp, type, details) VALUES (?, ?, ?)",
            [new Date(), type, details]
        );
    } catch (error) {
        console.log(error);
    }
}

exports.log = async (client, content, type = "log") => {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
        case "log": {
            await sqlLog(client, "logs", content);
            return console.log(`${timestamp} ${chalk.white.bgBlue(type.toUpperCase())} ${content}`);
        }
        case "warn": {
            await sqlLog(client, "warn", content);
            return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
        }
        case "error": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
        }
        case "debug": {
            await sqlLog(client, "debug", content);
            return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
        }
        case "cmd": {
            return console.log(`${timestamp} ${chalk.inverse(type.toUpperCase())} ${content}`);
        }
        case "ready": {
            await sqlLog(client, "logs", content);
            return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
        }
        default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
};

exports.warn = (...args) => this.log(...args, "warn");

exports.error = (...args) => this.log(...args, "error");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.ready = (...args) => this.log(...args, "ready");
