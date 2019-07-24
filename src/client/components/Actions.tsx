import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";
import { Button, Title, Box, Tile } from "bloomer";

interface Props {
    event: ClientConnectedEvent;
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <Tile isChild render={(tileProps: any) =>
        <Box {...tileProps}>
            <Title isSize={4}>Actions</Title>

            <Button onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
            <Button onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
            <Button onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
            <Button onClick={props.onOptionsButtonClick}>Options</Button>
        </Box>}
    />;

export default Actions;