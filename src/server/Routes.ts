import { Request, Response } from "express";
import { Configuration } from "./Configuration";

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