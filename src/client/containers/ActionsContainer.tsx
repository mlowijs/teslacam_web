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

    const onButton1Click = () => {
        console.log("clicked button 1");
    }

    return <Actions event={ccEvent} onButton1Click={onButton1Click} />;
};

export default ActionsContainer;