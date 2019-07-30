import bulma from "../index.scss";
import styles from "./Actions.scss";
import * as React from "react";
import classNames from "classnames";
import Button from "./Button";

interface Props {
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <div className={classNames(styles.Actions, bulma.box)}>
        <div className={classNames(bulma.title, bulma.isSize2Touch)}>Actions</div>

        <Button onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
        <Button onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
        <Button onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
        <Button onClick={props.onOptionsButtonClick}>Options</Button>
    </div>;

export default Actions;