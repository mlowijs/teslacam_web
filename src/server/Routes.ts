import { Request, Response } from "express";
import { Configuration } from "./Configuration";
import { FilesType } from "../model/Enums";
import FileSystem, { FileSystemEntry } from "./services/FileSystem";
import { ApiFileSystemEntry, ApiStatus } from "../model/Models";
import StateManager from "./services/StateManager";
import { ARCHIVE_RECENT_FOLDER, ARCHIVE_SAVED_FOLDER } from "./Constants";
import df from "@sindresorhus/df";

export const index = (_: Request, res: Response) => {
    res.redirect("/index.html");
};

export const getStatus = (config: Configuration, stateManager: StateManager) => async (_: Request, res: Response) => {
    const diskInfo = await df.file(config.archiveFolder);
    const savedClips = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_SAVED_FOLDER}`);
    const recentClips = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_RECENT_FOLDER}`);

    const getClipsSize = (files: FileSystemEntry[]) => files.reduce((a, f) => a + f.size, 0);

    const status: ApiStatus = {
        lastArchive: stateManager.lastArchive.toISOString(),
        lastUpload: stateManager.lastUpload.toISOString(),
        diskFree: diskInfo.available,
        diskSize: diskInfo.size,
        savedClipsCount: savedClips.length,
        savedClipsBytes: getClipsSize(savedClips),
        recentClipsCount: recentClips.length,
        recentClipsBytes: getClipsSize(recentClips)
    };

    res.json(status);
};

export const video = (config: Configuration) => (req: Request, res: Response) => {
    const type = req.params.type;
    const file = req.params.file;

    const options = {
        root: config.archiveFolder
    };

    res.sendFile(`${type}/${file}`, options);
};

export const listFiles = (config: Configuration) => (req: Request, res: Response) => {
    const filesType = parseInt(req.params.filesType, 10) as FilesType;

    const mapFiles = (files: FileSystemEntry[], filesType: FilesType): ApiFileSystemEntry[] => files.map<ApiFileSystemEntry>(f => ({
        name: f.name,
        date: f.date.toISOString(),
        size: f.size,
        camera: f.camera,
        type: filesType
    }));

    let files: ApiFileSystemEntry[] = [];

    switch (filesType) {
        case FilesType.ARCHIVE:
            const recent = mapFiles(FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_RECENT_FOLDER}`), FilesType.RECENT);
            const saved = mapFiles(FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_SAVED_FOLDER}`), FilesType.SAVED);
            
            files = recent.concat(saved);
        
        default:
            break;
    }

    res.json(files);
}

export const forceArchive = (stateManager: StateManager) => () => {
    stateManager.forceArchive();
};

export const forceUpload = (stateManager: StateManager) => () => {
    stateManager.forceUpload();
};
