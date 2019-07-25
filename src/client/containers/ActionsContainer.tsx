import * as React from "react";
import Actions from "../components/Actions";

const ActionsContainer: React.FunctionComponent = () => {
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
            onStartArchiverButtonClick={onStartArchiverButtonClick}
            onOptionsButtonClick={onOptionsButtonClick}
            onStartUploaderButtonClick={onStartUploaderButtonClick}
            onSyncRecentsButtonClick={onSyncRecentsButtonClick}
        />
    );
};

export default ActionsContainer;