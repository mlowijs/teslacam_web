import * as styles from "./Actions.module.css";
import * as React from "react";
import { Button, Title, Box } from "bloomer";

interface Props {
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <Box className={styles.Actions}>
        <Title className="is-size-2-touch">Actions</Title>

        <Button className="is-size-2-touch" onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
        <Button className="is-size-2-touch" onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
        <Button className="is-size-2-touch" onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
        <Button className="is-size-2-touch" onClick={props.onOptionsButtonClick}>Options</Button>
    </Box>;

export default Actions;