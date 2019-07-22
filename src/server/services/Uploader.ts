import { Logger } from "pino";
import { Configuration } from "../Configuration";
import { FileUploader } from "./FileUploader";
import FileSystem from "./FileSystem";
import LogFactory from "./LogFactory";
import { EventEmitter } from "events";

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

            const files = FileSystem.getFolderContents(config.archiveFolder);

            if (files.length === 0)
                log.info("No archived clips found");
            else
                fileUploader.uploadFiles(files);

            log.info("Upload archived clips completed");
        } catch (e) {
            log.fatal(e.message);
        }
    }
}