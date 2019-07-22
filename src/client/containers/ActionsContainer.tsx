import * as React from "react";
import { getSocket } from "../socket";
import { CLIENT_CONNECTED } from "../../Constants";
import { ClientConnectedEvent } from "../../model/Events";
import { Actions } from "../components/Actions";

export const ActionsContainer: React.FunctionComponent = () => {
    const [event, setEvent] = React.useState<ClientConnectedEvent>(null);

    React.useEffect(() => {
        const socket = getSocket();

        socket.on(CLIENT_CONNECTED, (event: ClientConnectedEvent) => {
            setEvent(event);
        });

        return () => {
            socket.close();
        }
    }, []);

    console.log(event);


    return event ? <Actions event={event} /> : null;
}