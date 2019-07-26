import { Configuration } from "./Configuration";
import express, { Request, Response, NextFunction } from "express";
import { index, downloadFile, listFiles, forceArchive, forceUpload } from "./Routes";
import * as core from "express-serve-static-core";
import StateManager from "./services/StateManager";
import LogFactory from "./services/LogFactory";
import { Logger } from "pino";
import * as path from "path";
import socketio from "socket.io";
import * as http from "http";
import Archiver from "./services/Archiver";
import Uploader from "./services/Uploader";
import {
    ARCHIVE_STARTED, ARCHIVE_COMPLETED, ARCHIVE_STARTS_AT,
    UPLOAD_STARTED, UPLOAD_COMPLETED, UPLOAD_STARTS_AT, UPLOADING_FILE,
 } from "../Constants";

export default class WebServer {
    private readonly log: Logger;
    private readonly stateManager: StateManager;
    private readonly archiver: Archiver;
    private readonly uploader: Uploader;

    private app: core.Express;
    private server: http.Server;
    private io: socketio.Server;

    constructor(logFactory: LogFactory, stateManager: StateManager, archiver: Archiver, uploader: Uploader) {
        this.log = logFactory.getLog("WebServer");
        this.stateManager = stateManager;
        this.archiver = archiver;
        this.uploader = uploader;
    }

    public start(config: Configuration) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.setupSocketIo(this.server);

        this.app.use((_: Request, res: Response, next: NextFunction) => {
            res.setHeader("Cache-Control", "no-cache");

            next();
        });

        this.app.use(express.static(path.resolve("static")));

        this.setupRoutes(config);

        this.server.listen(config.port, () => this.log.info("Started web server on port %d", config.port));
    }

    public stop() {
        this.io.close();
        this.server.close();
    }

    private setupRoutes(config: Configuration) {
        this.app.get("/", index);
        this.app.get("/download/:file", downloadFile(config));
        this.app.get("/files/:filesType", listFiles(config));
        this.app.post("/actions/forceArchive", forceArchive(this.stateManager));
        this.app.post("/actions/forceUpload", forceUpload(this.stateManager));
    }

    private setupSocketIo(httpServer: http.Server) {
        this.io = socketio(httpServer);

        this.io.on("connection", () => {
            this.log.debug("Accepted new socket.io connection");
        });

        const emitter = (name: string) => (...args: any[]) => this.io.emit(name, args);

        [ARCHIVE_STARTED, ARCHIVE_COMPLETED].forEach(e => this.archiver.on(e, emitter(e)));
        [UPLOAD_STARTED, UPLOAD_COMPLETED, UPLOADING_FILE].forEach(e => this.uploader.on(e, emitter(e)));
        [ARCHIVE_STARTS_AT, UPLOAD_STARTS_AT].forEach(e => this.stateManager.on(e, emitter(e)));
    }
}