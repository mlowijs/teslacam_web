import * as styles from "./Actions.scss";
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
    <div className={classNames(styles.box, styles.Actions)}>
        <div className={classNames(styles.title, styles.isSize2Touch)}>Actions</div>

        <Button onClick={props.onSyncRecentsButtonClick}>Sync Recents</Button>
        <Button onClick={props.onStartArchiverButtonClick}>Start Archiver</Button>
        <Button onClick={props.onStartUploaderButtonClick}>Start Uploader</Button>
        <Button onClick={props.onOptionsButtonClick}>Options</Button>
    </div>;

export default Actions;