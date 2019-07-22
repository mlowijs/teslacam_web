import * as fs from "fs";
import * as yaml from "yaml";
import { CONFIG_FILE_NAME } from "../Constants";
import * as path from "path";

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
    const data = fs.readFileSync(path.join(__dirname, CONFIG_FILE_NAME), "utf8");

    return yaml.parse(data) as Configuration;
}