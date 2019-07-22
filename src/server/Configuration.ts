import * as fs from "fs";
import * as yaml from "yaml";
import { CONFIG_FILE_NAME } from "../Constants";

export type Configuration = {
    port: number;
}

export function getConfiguration() {
    const data = fs.readFileSync(CONFIG_FILE_NAME, "utf8");

    return yaml.parse(data) as Configuration;
}