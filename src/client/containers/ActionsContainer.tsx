import * as React from "react";
// import { Actions } from "../components/Actions";
import io from "socket.io-client";

export const ActionsContainer: React.FunctionComponent = () => {
    const [test, setTest] = React.useState("");

    React.useEffect(() => {
        const socket = io.connect("http://localhost:3000");

        socket.on("test", (stuff: string) => {
            setTest(stuff);
        });

        return () => {
            socket.close();
        }
    }, []);

    return <div>
        {test}
    </div>;
}