import { FileUploader } from "../services/FileUploader";
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

    public uploadFiles(files: FileSystemEntry[]) {
        const { log, config, system } = this;

        try {
            if (config.requiresMount) {
                system.unmountDevices(config.path);
                system.mountDevices(config.path);
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
    
                log.info("Uploading file '%s' (%d/%d)", file.name, i + 1, files.length);
                
                this.emit(UPLOADING_FILE, new FileUploadEvent(
                    file.name, i + 1, files.length
                ));

                try {
                    FileSystem.copyFile(file, config.path);
                    FileSystem.deleteFile(file);
                } catch (e) {
                    log.error("Failed to copy file '%s'", file.name);
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
}