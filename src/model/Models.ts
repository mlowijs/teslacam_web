import { FilesType } from "./Enums";

export interface ApiFileSystemEntry {
    name: string;
    date: string;
    size: number;
    camera: string;
    type: FilesType;
}