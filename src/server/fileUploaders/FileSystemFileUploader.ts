import FileUploader from "../services/FileUploader";
import { Configuration } from "../Configuration";
import FileSystem from "../services/FileSystem";
import { FileSystemEntry } from "../services/FileSystem";
import System from "../services/System";
import { Logger } from "pino";
import LogFactory from "../services/LogFactory";
import { FileUploadEvent } from "../../model/Events";
import { EventEmitter } from "events";
import { UPLOADING_FILE } from "../../Constants";

interface FileSystemFileUploaderConfiguration {
    path: string;
    requiresMount: boolean;
}

export default class FileSystemFileUploader extends EventEmitter implements FileUploader {
    private readonly log: Logger;
    private readonly config: FileSystemFileUploaderConfiguration;
    private readonly system: System;

    constructor(logFactory: LogFactory, config: Configuration, system: System) {
        super();

        this.log = logFactory.getLog("FileSystemFileUploader");
        this.config = config.fileSystemFileUploader as FileSystemFileUploaderConfiguration;
        this.system = system;
    }

    public async uploadFiles(archiveType: string, files: FileSystemEntry[]): Promise<void> {
        const { log, config, system } = this;

        try {
            const folder = `${config.path}/${archiveType}`;

            if (config.requiresMount) {
                system.unmountDevices(config.path);
                system.mountDevices(config.path);
            }

            log.info("Creating upload folder %s", folder);
            this.createClipsFolder(folder);

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
    
                log.info("Uploading file '%s' (%d/%d)", file.name, i + 1, files.length);
                
                this.emit(UPLOADING_FILE, new FileUploadEvent(
                    file.name, i + 1, files.length
                ));

                try {
                    FileSystem.copyFile(file, folder);
                    FileSystem.deleteFile(file);
                } catch (e) {
                    log.error("Failed to upload file '%s'", file.name);
                    log.error(e);
                }
            }
        } catch (e) {
            log.error("Mounting file share failed");

            return;
        } finally {
            if (config.requiresMount)
                system.unmountDevices(config.path);
        }
    }

    private createClipsFolder(folder: string) {
        if (!FileSystem.exists(folder))
            FileSystem.createFolder(folder);
    }
}