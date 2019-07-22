import * as http from "http";
import * as express from "express";
import * as socketio from "socket.io";
import { Configuration } from "./Configuration";

export default class WebServer {
    private readonly _config: Configuration;

    constructor(config: Configuration) {
        this._config = config;
    }

    start() {
        const app = express();
        const server = http.createServer(app);
        const io = socketio(server);

        server.listen(this._config.port);
    }
}