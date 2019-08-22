import { Request, Response } from "express";
import { Configuration } from "./Configuration";
import { FilesType } from "../model/Enums";
import FileSystem, { FileSystemEntry } from "./services/FileSystem";
import { ApiFileSystemEntry, ApiStatus } from "../model/Models";
import StateManager from "./services/StateManager";
import { ARCHIVE_RECENT_FOLDER, ARCHIVE_SAVED_FOLDER } from "./Constants";
import df from "@sindresorhus/df";
import * as path from "path";
import * as fs from "fs";

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

    const range = req.headers.range;

    if (!range) {
        res.sendStatus(416);
        return;
    }

    const filePath = path.resolve(config.archiveFolder, type, file);
    const fileSize = FileSystem.getFileSize(filePath);

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;

    res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + fileSize,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4"
    });

    const stream = fs.createReadStream(filePath, { start: start, end: end })
        .on("open", () => {
            stream.pipe(res);
        }).on("error", (err) => {
            res.end(err)
        });
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
