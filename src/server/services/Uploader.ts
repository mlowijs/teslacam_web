import { Logger } from "pino";
import { Configuration } from "../Configuration";
import { FileUploader } from "./FileUploader";
import FileSystem from "./FileSystem";
import LogFactory from "./LogFactory";
import { EventEmitter } from "events";
import { UPLOAD_STARTED, UPLOAD_COMPLETED, ARCHIVE_RECENT_FOLDER, ARCHIVE_SAVED_FOLDER } from "../../Constants";

export default class Uploader extends EventEmitter {
    private readonly log: Logger;
    private readonly config: Configuration;
    private readonly fileUploader: FileUploader;

    constructor(logFactory: LogFactory, config: Configuration, fileUploader: FileUploader) {
        super();
        
        this.log = logFactory.getLog("Uploader");
        this.config = config;
        this.fileUploader = fileUploader;
    }

    public upload() {
        const { log, fileUploader, config } = this;

        try {
            log.info("Starting upload archived clips");
            this.emit(UPLOAD_STARTED);

            const savedFiles = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_SAVED_FOLDER}`);
            const recentFiles = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_RECENT_FOLDER}`);
            const files = savedFiles.concat(recentFiles);

            if (files.length === 0)
                log.info("No archived clips found");
            else
                fileUploader.uploadFiles(files);

            log.info("Upload archived clips completed");
        } catch (e) {
            log.fatal(e.message);
        } finally {
            this.emit(UPLOAD_COMPLETED);
        }
    }
}