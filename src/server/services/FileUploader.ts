import { FileSystemEntry } from "./FileSystem";

export default interface FileUploader {
    uploadFiles: (archiveType: string, files: FileSystemEntry[]) => void;
}