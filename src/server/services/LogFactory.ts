import pino, { Logger } from "pino";
import { Configuration } from "../Configuration";

export default class LogFactory {
    private readonly _config: Configuration;

    constructor(config: Configuration) {
        this._config = config;
    }

    getLog(name: string): Logger {
        return pino({
            level: this._config.logLevel,
            name
        });
    }
}