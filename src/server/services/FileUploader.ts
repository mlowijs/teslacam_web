import { FileSystemEntry } from "./FileSystem";

export interface FileUploader {
    uploadFiles: (archiveType: string, files: FileSystemEntry[]) => void;
}