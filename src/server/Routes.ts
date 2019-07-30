import { Request, Response } from "express";
import { Configuration } from "./Configuration";
import { FilesType } from "../model/Enums";
import FileSystem, { FileSystemEntry } from "./services/FileSystem";
import { ApiFileSystemEntry } from "../model/Models";
import StateManager from "./services/StateManager";

export const index = (_: Request, res: Response) => {
    res.redirect("/index.html");
};

export const downloadFile = (config: Configuration) => (req: Request, res: Response) => {
    const file = req.params.file;

    console.log(file);

    const options = {
        root: config.archiveFolder,
        headers: {
            "Content-Disposition": `attachment; filename="${file}"`
        }
    };

    res.sendFile(file, options);
};

export const listFiles = (config: Configuration) => (req: Request, res: Response) => {
    const filesType = parseInt(req.params.filesType, 10) as FilesType;

    let files: FileSystemEntry[] = [];

    switch (filesType) {
        case FilesType.ARCHIVE:
            files = FileSystem.getFolderContents(`${config.archiveFolder}`);
            break;
        
        default:
            break;
    }

    res.json(files.map<ApiFileSystemEntry>(f => ({
        name: f.name,
        date: f.date.toISOString(),
        size: f.size
    })));
}

export const forceArchive = (stateManager: StateManager) => () => {
    stateManager.forceArchive();
};

export const forceUpload = (stateManager: StateManager) => () => {
    stateManager.forceUpload();
};
