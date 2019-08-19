import { Configuration } from "../Configuration";
import { Logger } from "pino";
import LogFactory from "./LogFactory";
import isOnline from "is-online";
import Archiver from "./Archiver";
import Uploader from "./Uploader";
import moment, { Moment } from "moment";
import { EventEmitter } from "events";
import { ARCHIVE_STARTS_AT, UPLOAD_STARTS_AT } from "../Constants";

export default class StateManager extends EventEmitter {
    private readonly log: Logger;
    private readonly config: Configuration;
    private readonly archiver: Archiver;
    private readonly uploader: Uploader;
    
    private archiveTimeout: NodeJS.Timeout;
    private _nextArchiveAt: Moment;
    private _lastArchive: Moment;
    private _archiveInProgress: boolean;

    private uploadTimeout: NodeJS.Timeout;
    private _nextUploadAt: Moment;
    private _lastUpload: Moment;
    private _uploadInProgress: boolean;

    constructor(logFactory: LogFactory, config: Configuration, archiver: Archiver, uploader: Uploader) {
        super();

        this.log = logFactory.getLog("StateManager");
        this.config = config;
        this.archiver = archiver;
        this.uploader = uploader;

        this._lastArchive = moment.unix(0);
        this._lastUpload = moment.unix(0);

        this.startArchiveTimer(config.archiveInterval);
        this.startUploadTimer(config.uploadInterval);
    }

    get nextArchiveAt(): Moment {
        return this._nextArchiveAt;
    }

    get lastArchive(): Moment {
        return this._lastArchive;
    }

    get archiveInProgress(): boolean {
        return this._archiveInProgress;
    }

    get nextUploadAt(): Moment {
        return this._nextUploadAt;
    }

    get lastUpload(): Moment {
        return this._lastUpload;
    }

    get uploadInProgress(): boolean {
        return this._uploadInProgress;
    }

    public forceArchive() {
        this.log.info("Forcing archive, starting in 5 seconds");
        
        clearTimeout(this.archiveTimeout);
        this.startArchiveTimer(5);
    }

    public forceUpload() {
        this.log.info("Forcing upload, starting in 5 seconds");

        clearTimeout(this.uploadTimeout);
        this.startUploadTimer(5);
    }

    private startArchiveTimer(interval: number) {
        const handler = () => {
            this._archiveInProgress = true;
            this.archiver.archive();
            
            this._archiveInProgress = false;
            this.startArchiveTimer(this.config.archiveInterval);
            this._lastArchive = moment();
        }

        this.archiveTimeout = setTimeout(handler, interval * 1000);
        this._nextArchiveAt = moment().add(interval, "seconds");
        this.emit(ARCHIVE_STARTS_AT, this.nextArchiveAt);
    }

    private startUploadTimer(interval: number) {
        const handler = async () => {
            this._uploadInProgress = true;

            const isNetworkOnline = await isOnline();

            if (isNetworkOnline)
                await this.uploader.upload();
            else
                this.log.debug("Upload canceled, network is offline");                
            
            this._uploadInProgress = false;
            this.startUploadTimer(this.config.uploadInterval);
            this._lastUpload = moment();
        }

        this.uploadTimeout = setTimeout(handler, interval * 1000);
        this._nextUploadAt = moment().add(interval, "seconds");
        this.emit(UPLOAD_STARTS_AT, this.nextUploadAt);
    }
}