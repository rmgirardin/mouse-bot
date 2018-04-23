/*
Logger class for easy and aesthetically pleasing console logging
*/
const chalk = require("chalk");
const moment = require("moment");

function dbWrite(client, db, type, timestamp, content) {
    let list = client.logs.get(db);
    list = `${list}\n${timestamp} .${type.toUpperCase()} ${content}`;
    client.logs.set(db, list);
}

exports.log = async (client, content, type = "log") => {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
        case "log": {
            dbWrite(client, "logs", type, timestamp, content);
            return console.log(`${timestamp} ${chalk.white.bgBlue(type.toUpperCase())} ${content}`);
        }
        case "warn": {
            dbWrite(client, "errors", type, timestamp, content);
            return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
        }
        case "error": {
            dbWrite(client, "errors", type, timestamp, content);
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
        }
        case "debug": {
            dbWrite(client, "logs", type, timestamp, content);
            return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
        }
        case "cmd": {
            dbWrite(client, "logs", type, timestamp, content);
            return console.log(`${timestamp} ${chalk.inverse(type.toUpperCase())} ${content}`);
        }
        case "ready": {
            dbWrite(client, "logs", type, timestamp, content);
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
