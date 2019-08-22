import * as fs from "fs";
import rimraf from "rimraf";
import moment, { Moment } from "moment";
import { Camera } from "../../model/Enums";

export interface FileSystemEntry {
    name: string;
    path: string;
    date: Moment;
    size: number;
    camera: Camera;
}

const filesCameras = [null, "front", "left_repeater", "right_repeater"];

const getFileCamera = (name: string): Camera => {
    let camera = Camera.UNKNOWN;

    filesCameras.forEach((fileCamera, i) => {
        if (fileCamera === null)
            return;
            
        if (name.includes(fileCamera))
            camera = i as Camera;
    });

    return camera;
};

export default class FileSystem {
    public static getFolderContents(path: string): FileSystemEntry[] {
        const entries = fs.readdirSync(path);

        return entries.map(f => {
            const filePath = `${path}/${f}`;

            return {
                name: f,
                path: filePath,
                date: moment(f.substr(0, 19), "YYYY-MM-DD_HH-mm-ss"),
                size: fs.statSync(filePath).size,
                camera: getFileCamera(f)
            };
        });
    }

    public static getFileSize(path: string): number {
        return fs.statSync(path).size;
    }

    public static deleteFile(file: FileSystemEntry) {
        fs.unlinkSync(file.path);
    }

    public static deleteFolder(path: string) {
        rimraf.sync(path);
    }

    public static exists(path: string) {
        return fs.existsSync(path);
    }

    public static copyFile(file: FileSystemEntry, destinationFolder: string) {
        fs.copyFileSync(file.path, `${destinationFolder}/${file.name}`);
    }

    public static createFolder(path: string) {
        fs.mkdirSync(path);
    }
}