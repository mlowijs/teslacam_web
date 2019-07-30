import FileUploader from "../services/FileUploader";
import FileSystem, { FileSystemEntry } from "../services/FileSystem";
import LogFactory from "../services/LogFactory";
import { Configuration } from "../Configuration";
import { Logger } from "pino";
import { SharedKeyCredential, BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { EventEmitter } from "events";
import { UPLOADING_FILE } from "../../Constants";
import { FileUploadEvent } from "../../model/Events";

interface BlobStorageFileUploaderConfiguration {
    accountName: string;
    accountKey: string;
    containerName: string;
}

export default class BlobStorageFileUploader extends EventEmitter implements FileUploader {
    private readonly log: Logger;
    private containerClient: ContainerClient;

    constructor(logFactory: LogFactory, config: Configuration) {
        super();

        this.log = logFactory.getLog("BlobStorageFileUploader");

        this.initialize(config.blobStorageFileUploader as BlobStorageFileUploaderConfiguration);
    }

    private async initialize(config: BlobStorageFileUploaderConfiguration) {
        const credential = new SharedKeyCredential(config.accountName, config.accountKey);
        const serviceClient = new BlobServiceClient(
            `https://${config.accountName}.blob.core.windows.net`, credential);

        this.containerClient = serviceClient.getContainerClient(config.containerName);
    }

    public async uploadFiles(archiveType: string, files: FileSystemEntry[]): Promise<void> {
        const { log, containerClient } = this;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            log.info("Uploading file '%s' (%d/%d)", file.name, i + 1, files.length);

            this.emit(UPLOADING_FILE, new FileUploadEvent(
                file.name, i + 1, files.length
            ));

            try {
                const blobName = `${archiveType}/${file.name}`;
                const blobClient = containerClient.getBlockBlobClient(blobName);

                await blobClient.uploadFile(file.path);

                FileSystem.deleteFile(file);
            } catch (e) {
                log.error("Failed to upload file '%s'", file.name);
                log.error(e);
            }
        }
    }
}