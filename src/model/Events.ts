import { Moment } from "moment";

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

export class ClientConnectedEvent {
    nextArchiveAt: Moment;
    nextUploadAt: Moment;

    constructor(nextArchiveAt: Moment, nextUploadAt: Moment) {
        this.nextArchiveAt = nextArchiveAt;
        this.nextUploadAt = nextUploadAt;
    }
}