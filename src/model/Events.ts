export class FileUploadEvent {
    name: string;
    number: number;
    totalFiles: number;

    constructor(name: string, number: number, totalFiles: number) {
        this.name = name;
        this.number = number;
        this.totalFiles = totalFiles;
    }
}