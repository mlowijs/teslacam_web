import * as React from "react";
import { getSocket } from "../socket";
import { CLIENT_CONNECTED } from "../../Constants";
import { ClientConnectedEvent } from "../../model/Events";
import { Actions } from "../components/Actions";

const socket = getSocket();

export const ActionsContainer: React.FunctionComponent = () => {
    const [event, setEvent] = React.useState<ClientConnectedEvent>(null);

    React.useEffect(() => {
        socket.on(CLIENT_CONNECTED, (event: ClientConnectedEvent) => {
            setEvent(event);
        });

        return () => {
            socket.off(CLIENT_CONNECTED);
        }
    }, [event]);

    console.log(event);


    return event ? <Actions event={event} /> : null;
}