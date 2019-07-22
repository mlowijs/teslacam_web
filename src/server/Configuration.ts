import * as fs from "fs";
import * as yaml from "yaml";
import config from "./config.yml";

export type Configuration = {
    [key: string]: any;

    port: number;
    logLevel: string;
    usbMountFolder: string;
    archiveFolder: string;
    archiveRecent: boolean;
    archiveSaved: boolean;
    archiveInterval: number;
    uploadInterval: number;
}

export function getConfiguration() {
    const data = fs.readFileSync(config, "utf8");

    return yaml.parse(data) as Configuration;
}