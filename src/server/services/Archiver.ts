import System from "./System";
import { Logger } from "pino";
import { Configuration } from "../Configuration";
import FileSystem, { FileSystemEntry } from "./FileSystem";
import { TESLA_CAM, RECENT_CLIPS, SAVED_CLIPS, ONE_MEGABYTE, ARCHIVE_STARTED, ARCHIVE_COMPLETED, ARCHIVE_SAVED_FOLDER, ARCHIVE_RECENT_FOLDER } from "../../Constants";
import LogFactory from "./LogFactory";
import { EventEmitter } from "events";

export default class Archiver extends EventEmitter {
    private readonly log: Logger;
    private readonly config: Configuration;
    private readonly system: System;

    constructor(logFactory: LogFactory, config: Configuration, system: System) {
        super();
        
        this.log = logFactory.getLog("Archiver");
        this.config = config;
        this.system = system;
    }

    public archive() {
        const { log, config, system } = this;

        log.info("Starting archive");
        this.emit(ARCHIVE_STARTED);

        system.unmountDevices(config.usbMountFolder);

        try {
            system.mountDevices(config.usbMountFolder);

            this.archiveRecentClips();
            this.archiveSavedClips();

            log.info("Archive completed");
        } catch (e) {
            log.fatal(e.message);
        } finally {
            try {
                system.unmountDevices(config.usbMountFolder);
            } catch (e) {
                log.error(e.message);
            }

            this.emit(ARCHIVE_COMPLETED);
        }
    }

    private archiveRecentClips() {
        const { log, config } = this;

        if (!config.archiveRecent) {
            log.debug("Skipping recent clips");
            return;
        }

        log.info("Archiving recent clips");

        const recentClipsPath = `${config.usbMountFolder}/${TESLA_CAM}/${RECENT_CLIPS}`;

        if (!FileSystem.exists(recentClipsPath)) {
            log.info("No recent clips found");
            return;
        }

        const files = FileSystem.getFolderContents(recentClipsPath);

        if (files.length === 0) {
            log.info("No recent clips found");
            return;
        }

        this.archiveClips(ARCHIVE_RECENT_FOLDER, files);
    }

    private archiveSavedClips() {
        const { log, config } = this;

        if (!config.archiveSaved) {
            log.debug("Skipping saved clips");
            return;
        }

        log.info("Archiving saved clips");        

        const savedClipsPath = `${config.usbMountFolder}/${TESLA_CAM}/${SAVED_CLIPS}`;

        if (!FileSystem.exists(savedClipsPath)) {
            log.info("No saved clips found");
            return;
        }

        const folders = FileSystem.getFolderContents(savedClipsPath);

        if (folders.length === 0) {
            log.info("No saved clips found");
            return;
        }

        for (let i = 0; i < folders.length; i++) {
            const folder = folders[i];

            log.info("Archiving saved clips folder '%s' (%d/%d)", folder.name, i + 1, folders.length);

            this.archiveSavedClipsFolder(folder);
        }
    }

    private archiveSavedClipsFolder(folder: FileSystemEntry) {
        const { log } = this;

        const files = FileSystem.getFolderContents(folder.path);

        if (files.length === 0) {
            log.info("Saved clips folder is empty");
            return;
        }

        this.archiveClips(ARCHIVE_SAVED_FOLDER, files);

        FileSystem.deleteFolder(folder.path);
    }

    private archiveClips(folder: string, files: FileSystemEntry[]) {
        const { log, config } = this;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            log.info("Archiving clip '%s' (%d bytes) (%d/%d)", file.name, file.size, i + 1, files.length);

            if (file.size >= ONE_MEGABYTE)
                FileSystem.copyFile(file, `${config.archiveFolder}/${folder}`);

            FileSystem.deleteFile(file);
        }
    }
}