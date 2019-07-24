import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";
import { Button, Table, Tile, Box, Title } from "bloomer";

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
        <div className={styles.Actions}>
            <Button onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
            <Button onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
            <Button onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
            <Button onClick={props.onOptionsButtonClick}>Options</Button>
        </div>

        <Tile isAncestor>
            <Tile isSize={4} isVertical isParent>
                <Tile isChild>
                    <Box {...props}>
                        <Title>Saved Clips</Title>
                        <Table isBordered isStriped isNarrow>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Filename</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-right_repeater.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-front.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-left_repeater.mp4</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                </Tile>
                <Tile isChild>
                    <Box {...props}>
                        <Title>Recent Clips</Title>
                        <Table isBordered isStriped isNarrow>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Filename</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-right_repeater.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-front.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-left_repeater.mp4</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                </Tile>
            </Tile>
            <Tile isParent>
                <Tile isChild>
                    <Box {...props}>
                        <Title size={1}>Archived Clips</Title>
                        <Table isBordered isStriped isNarrow>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Filename</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-right_repeater.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-front.mp4</td>
                                </tr>
                                <tr>
                                    <td>2019-07-24 18:54:00</td>
                                    <td>2019-07-22_20-48-23-left_repeater.mp4</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                </Tile>
            </Tile>
        </Tile>
    </>;

export default Actions;