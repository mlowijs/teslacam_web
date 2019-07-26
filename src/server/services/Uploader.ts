import { Logger } from "pino";
import { Configuration } from "../Configuration";
import { FileUploader } from "./FileUploader";
import FileSystem, { FileSystemEntry } from "./FileSystem";
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

    public uploadRecentClips() {
        const { config } = this;
        const recentFiles = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_RECENT_FOLDER}`);
        this.uploadFiles(ARCHIVE_RECENT_FOLDER,recentFiles);
    }

    public uploadSavedClips() {
        const { config } = this;
        const savedFiles = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_SAVED_FOLDER}`);
        this.uploadFiles(ARCHIVE_SAVED_FOLDER, savedFiles);
    }

    public upload() {
        this.uploadSavedClips();
        this.uploadRecentClips();
    }

    private uploadFiles(archiveType: string, files : FileSystemEntry[])
    {
        const { log, fileUploader } = this;

        try {
            log.info(`Starting upload of folder ${archiveType}`);
            this.emit(UPLOAD_STARTED);

            if (files.length === 0)
                log.info(`No files found for folder ${archiveType}`);
            else
                fileUploader.uploadFiles(archiveType, files);

            log.info(`Finished upload of folder ${archiveType}`);
        } catch (e) {
            log.fatal(e.message);
        } finally {
            this.emit(UPLOAD_COMPLETED);
        }
    }
}