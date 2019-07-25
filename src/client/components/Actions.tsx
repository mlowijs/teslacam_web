import * as styles from "./Actions.scss";
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
        <Title isSize={4}>Actions</Title>

        <Button onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
        <Button onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
        <Button onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
        <Button onClick={props.onOptionsButtonClick}>Options</Button>
    </Box>;

export default Actions;