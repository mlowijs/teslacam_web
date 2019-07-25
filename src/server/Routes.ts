import { Request, Response } from "express";
import { Configuration } from "./Configuration";
import { FilesType } from "../model/Enums";
import FileSystem, { FileSystemEntry } from "./services/FileSystem";
import { ARCHIVE_SAVED_FOLDER, ARCHIVE_RECENT_FOLDER } from "../Constants";
import { ApiFileSystemEntry } from "../model/Models";

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
        case FilesType.SAVED:
            files = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_SAVED_FOLDER}`);
            break;
        
        case FilesType.RECENT:
            files = FileSystem.getFolderContents(`${config.archiveFolder}/${ARCHIVE_RECENT_FOLDER}`);
            break;
    }

    res.json(files.map<ApiFileSystemEntry>(f => ({
        name: f.name,
        size: f.size
    })));
}