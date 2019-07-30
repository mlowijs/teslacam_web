import * as styles from "./Actions.scss";
import * as React from "react";
import classNames from "classnames";

interface Props {
    onSyncRecentsButtonClick: () => void;
    onStartArchiverButtonClick: () => void;
    onStartUploaderButtonClick: () => void;
    onOptionsButtonClick: () => void;
}

const Actions: React.FunctionComponent<Props> = (props) =>
    <div className={classNames(styles.box, styles.Actions)}>
        <div className={classNames(styles.title, styles.isSize2Touch)}>Actions</div>

        <button className={classNames(styles.button, styles.isSize2Touch)} onClick={props.onSyncRecentsButtonClick}>Sync Recents</button>
        <button className={classNames(styles.button, styles.isSize2Touch)} onClick={props.onStartArchiverButtonClick}>Start Archiver</button>
        <button className={classNames(styles.button, styles.isSize2Touch)} onClick={props.onStartUploaderButtonClick}>Start Uploader</button>
        <button className={classNames(styles.button, styles.isSize2Touch)} onClick={props.onOptionsButtonClick}>Options</button>
    </div>;

export default Actions;