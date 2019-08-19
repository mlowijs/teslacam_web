import * as React from "react";
import ActionsComponent from "../components/Actions";
import * as ActionsApi from "../api/Actions";

const ActionsContainer: React.FunctionComponent = () => {
    const onStartArchiverButtonClick = () => {
        console.log("Forcing archive");
        ActionsApi.forceArchive();
    }

    const onOptionsButtonClick = () => {
        console.log("Options clicked");
    }

    const onStartUploaderButtonClick = () => {
        console.log("Forcing upload");
        ActionsApi.forceArchive();
    }

    const onSyncRecentsButtonClick = () => {
        console.log("Sync recents");
    }

    return (
        <ActionsComponent
            onStartArchiverButtonClick={onStartArchiverButtonClick}
            onOptionsButtonClick={onOptionsButtonClick}
            onStartUploaderButtonClick={onStartUploaderButtonClick}
            onSyncRecentsButtonClick={onSyncRecentsButtonClick}
        />
    );
};

export default ActionsContainer;