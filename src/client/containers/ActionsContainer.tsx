import * as React from "react";
import { CLIENT_CONNECTED } from "../../Constants";
import { ClientConnectedEvent } from "../../model/Events";
import { useEvent } from "../hooks/SocketContext";
import Actions from "../components/Actions";

const ActionsContainer: React.FunctionComponent = () => {
    const [ccEvent, setCcEvent] = React.useState<ClientConnectedEvent>(null);

    useEvent(CLIENT_CONNECTED, (evt: ClientConnectedEvent) => {
        console.log(evt);
        setCcEvent(evt);
    }, [ccEvent]);

    return <Actions event={ccEvent} />;
};

export default ActionsContainer;