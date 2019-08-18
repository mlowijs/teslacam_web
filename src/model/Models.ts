import { FilesType, Camera } from "./Enums";

export interface ApiFileSystemEntry {
    name: string;
    date: string;
    size: number;
    camera: Camera;
    type: FilesType;
}