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

    const onStartArchiverButtonClick = () => {
        console.log("Start Archiving");
    }

    const onOptionsButtonClick = () => {
        console.log("Options clicked");
    }

    const onStartUploaderButtonClick = () => {
        console.log("Start uploader");
    }

    const onSyncRecentsButtonClick = () => {
        console.log("Sync recents");
    }

    return (
        <Actions
            event={ccEvent}
            onStartArchiverButtonClick={onStartArchiverButtonClick}
            onOptionsButtonClick={onOptionsButtonClick}
            onStartUploaderButtonClick={onStartUploaderButtonClick}
            onSyncRecentsButtonClick={onSyncRecentsButtonClick}
        />
    );
};

export default ActionsContainer;