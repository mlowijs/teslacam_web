import FileUploader from "../services/FileUploader";
import { FileSystemEntry } from "../services/FileSystem";
import LogFactory from "../services/LogFactory";
import { Configuration } from "../Configuration";
import { Logger } from "pino";
import { SharedKeyCredential, BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob";

interface BlobStorageFileUploaderConfiguration {
    accountName: string;
    accountKey: string;
    containerName: string;
}

export default class BlobStorageFileUploader implements FileUploader {
    private readonly log: Logger;
    private containerClient: ContainerClient;

    constructor(logFactory: LogFactory, config: Configuration) {
        this.log = logFactory.getLog("BlobStorageFileUploader");

        this.initialize(config.blobStorageFileUploader as BlobStorageFileUploaderConfiguration);
    }

    private async initialize(config: BlobStorageFileUploaderConfiguration) {
        const credential = new SharedKeyCredential(config.accountName, config.accountKey);
        const serviceClient = new BlobServiceClient(
            `https://${config.accountName}.blob.core.windows.net`, credential);

        const createContainerResult = await serviceClient.createContainer(config.containerName);
        this.containerClient = createContainerResult.containerClient;
    }

    public uploadFiles(archiveType: string, files: FileSystemEntry[]) {
        
    }
}