import * as io from "socket.io-client";

export const getSocket = (): SocketIOClient.Socket => io.connect(process.env.SERVER_URI);