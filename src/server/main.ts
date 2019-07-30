import { getConfiguration } from "./Configuration";
import WebServer from "./WebServer";
import StateManager from "./services/StateManager";
import LogFactory from "./services/LogFactory";
import Archiver from "./services/Archiver";
import System from "./services/System";
import Uploader from "./services/Uploader";
import BlobStorageFileUploader from "./fileUploaders/BlobStorageFileUploader";
import FileUploader from "./services/FileUploader";
import FileSystemFileUploader from "./fileUploaders/FileSystemFileUploader";

const config = getConfiguration();
const logFactory = new LogFactory(config);

const system = new System(logFactory);
const fileUploader = getFileUploader();

const archiver = new Archiver(logFactory, config, system);
const uploader = new Uploader(logFactory, config, fileUploader);
const stateManager = new StateManager(logFactory, config, archiver, uploader);

const webServer = new WebServer(logFactory, stateManager, archiver, uploader);
webServer.start(config);

function getFileUploader(): FileUploader {
    switch (config.uploader) {
        case "blob":
            return new BlobStorageFileUploader(logFactory, config);

        case "fileSystem":
            return new FileSystemFileUploader(logFactory, config, system);
    }

    return null;
}