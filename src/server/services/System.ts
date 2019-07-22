import { spawnSync } from "child_process";
import { Logger } from "pino";
import LogFactory from "./LogFactory";

export default class System {
    private readonly _log: Logger;

    constructor(logFactory: LogFactory) {
        this._log = logFactory.getLog("System");
    }

    public unmountDevices(...paths: string[]) {
        for (const path of paths) {
            this._log.debug("Unmounting '%s'", path);
            spawnSync("umount", [path]);
        }
    }

    public mountDevices(...paths: string[]) {
        for (const path of paths) {
            this._log.debug("Mounting '%s'", path);

            if (spawnSync("mount", [path]).error)
                throw Error(`Could not mount '${path}'`);
        }
    }

    public reloadMassStorage() {
        this._log.debug("Reloading mass storage");

        if (spawnSync("sudo", ["modprobe", "-r", "g_mass_storage"]).error)
            throw Error(`Could not remove mass storage module`);

        if (spawnSync("sudo", ["modprobe", "g_mass_storage"]).error)
            throw Error(`Could not load mass storage module`);
    }
}