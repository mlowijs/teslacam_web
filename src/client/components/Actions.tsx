import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";
import { Button } from "bloomer";

import * as styles from "./Actions.scss";

interface Props {
    event: ClientConnectedEvent;
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <>
        <Button className={styles.button} onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
        <Button className={styles.button} onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
        <Button className={styles.button} onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
        <Button className={styles.button} onClick={props.onOptionsButtonClick}>Options</Button>
    </>;

export default Actions;