import * as React from "react";

interface Props {
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <div className="box">
        <div className="title is-size-2-touch">Actions</div>

        <div className="button is-size-2-touch" onClick={props.onSyncRecentsButtonClick}>Sync Recents</div>
        <div className="button is-size-2-touch" onClick={props.onStartArchiverButtonClick}>Start Archiver</div>
        <div className="button is-size-2-touch" onClick={props.onStartUploaderButtonClick}>Start Uploader</div>
        <div className="button is-size-2-touch" onClick={props.onOptionsButtonClick}>Options</div>
    </div>;

export default Actions;