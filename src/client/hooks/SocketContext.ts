import * as React from "react";
import * as io from "socket.io-client";

export const SocketContext = React.createContext(io.connect(process.env.SERVER_URI));

export const useEvent = (name: string, handler: (...args: any[]) => void, dependencies: readonly any[]) => {
    const socket = React.useContext(SocketContext);

    React.useEffect(() => {
        socket.on(name, handler);

        return () => {
            socket.off(name, handler);
        };
    }, dependencies);
};