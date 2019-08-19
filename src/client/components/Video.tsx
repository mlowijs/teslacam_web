import bulma from "../index.scss";
import styles from "./Video.scss";
import classNames from "classnames";

import * as React from "react";

interface Props {
    path?: string;
    onCloseClick: () => void;
}

const Video: React.FunctionComponent<Props> = ({ path, onCloseClick }) =>
    <div className={classNames(styles.Video, bulma.modal, path && bulma.isActive)}>
        <div className={bulma.modalBackground} onClick={() => onCloseClick()}></div>

        <div className={classNames(styles.content, bulma.modalContent)}>
            <video src={path} autoPlay controls playsInline muted />
        </div>

        <div className={classNames(bulma.modalClose, bulma.isLarge)} onClick={() => onCloseClick()}></div>
    </div>;

export default Video;