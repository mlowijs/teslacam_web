import { Configuration } from "./Configuration";
import express, { Request, Response, NextFunction } from "express";
import { index, downloadFile } from "./Routes";
import * as core from "express-serve-static-core";
import StateManager from "./services/StateManager";
import LogFactory from "./services/LogFactory";
import { Logger } from "pino";
import * as path from "path";
import socketio, { Socket } from "socket.io";
import * as http from "http";
import Archiver from "./services/Archiver";
import Uploader from "./services/Uploader";
import { ARCHIVE_STARTED, ARCHIVE_COMPLETED, UPLOAD_STARTED, UPLOAD_COMPLETED, UPLOAD_STARTS_AT, UPLOADING_FILE, ARCHIVE_STARTS_AT } from "../Constants";

export default class WebServer {
    private readonly log: Logger;
    private readonly stateManager: StateManager;
    private readonly archiver: Archiver;
    private readonly uploader: Uploader;

    constructor(logFactory: LogFactory, stateManager: StateManager, archiver: Archiver, uploader: Uploader) {
        this.log = logFactory.getLog("WebServer");
        this.stateManager = stateManager;
        this.archiver = archiver;
        this.uploader = uploader;
    }

    public start(config: Configuration) {
        const app = express();
        const server = http.createServer(app);
        this.setupSocketIo(server);

        // Add cache header
        app.use((_: Request, res: Response, next: NextFunction) => {
            res.setHeader("Cache-Control", "no-cache");

            next();
        });

        app.use("/static", express.static(path.resolve("static")));
    
        this.setupRoutes(config, app);

        server.listen(config.port, () => this.log.info("Started web server on port %d", config.port));
    }

    private setupRoutes(config: Configuration, app: core.Express) {
        app.get("/", index);
        app.get("/download/:file", downloadFile(config));
    }

    private setupSocketIo(httpServer: http.Server) {
        const io = socketio(httpServer);

        io.on("connection", (_: Socket) => {
            this.log.debug("Accepted new socket.io connection");
        });

        const emitter = (name: string) => (...args: any[]) => io.emit(name, args);

        [ARCHIVE_STARTED, ARCHIVE_COMPLETED].forEach(e => this.archiver.on(e, emitter(e)));
        [UPLOAD_STARTED, UPLOAD_COMPLETED, UPLOADING_FILE].forEach(e => this.uploader.on(e, emitter(e)));
        [ARCHIVE_STARTS_AT, UPLOAD_STARTS_AT].forEach(e => this.stateManager.on(e, emitter(e)));
    }
}