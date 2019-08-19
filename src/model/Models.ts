import { FilesType, Camera } from "./Enums";

export interface ApiFileSystemEntry {
    name: string;
    date: string;
    size: number;
    camera: Camera;
    type: FilesType;
}

export interface ApiStatus {
    lastArchive: string;
    lastUpload: string;
    diskFree: number;
    diskSize: number;
    savedClipsCount: number;
    savedClipsBytes: number;
    recentClipsCount: number;
    recentClipsBytes: number;
}