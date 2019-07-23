import * as React from "react";
import { CLIENT_CONNECTED } from "../../Constants";
import { ClientConnectedEvent } from "../../model/Events";
import { Actions } from "../components/Actions";
import { useEvent } from "../hooks/SocketContext";

export const ActionsContainer: React.FunctionComponent = () => {
    const [ccEvent, setCcEvent] = React.useState<ClientConnectedEvent>(null);

    useEvent(CLIENT_CONNECTED, (evt: ClientConnectedEvent) => {
        console.log(evt);
        setCcEvent(evt);
    }, [ccEvent]);

    return event ? <Actions event={ccEvent} /> : null;
}