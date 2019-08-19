import bulma from "../index.scss";
import styles from "./Files.scss";
import * as React from "react";
import { ApiFileSystemEntry } from "../../model/Models";
import classNames from "classnames";
import moment from "moment";
import lodash from "lodash";
import { FilesType, Camera } from "../../model/Enums";
import { mdiCamcorder } from "@mdi/js";
import Icon from "@mdi/react";
import { DATE_FORMAT } from "../Constants";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
    onClipClick: (type: string, name: string) => void;
}

function getRotate(file: ApiFileSystemEntry) {
    switch (file.camera) {
        case Camera.FRONT:
            return 270;
        case Camera.LEFT_REPEATER:
            return 125;
        case Camera.RIGHT_REPEATER:
            return 55;
    }

    return 0;
}

const Files: React.FunctionComponent<Props> = ({ title, files, onClipClick }) => {
    const groupedFiles = Object.values(lodash.groupBy(files, f => f.date));

    return (
        <div className={classNames(bulma.tile, bulma.isChild, bulma.box)}>
            <div className={classNames(bulma.title)}>{title}</div>

            <table className={classNames(bulma.table, bulma.isFullwidth, bulma.isStriped)}>
                <thead>
                    <tr>
                        <th>Clip</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedFiles.map(files => {
                        const date = files[0].date;
                        const type = files[0].type == FilesType.SAVED ? "saved" : "recent";

                        const types = files.map(f => 
                            <div className={styles.clip} onClick={() => onClipClick(type, f.name)}>
                                <Icon path={mdiCamcorder} rotate={getRotate(f)} />
                            </div>
                        );

                        return (
                            <tr key={date}>
                                <td>{types}</td>
                                <td>{moment(date).format(DATE_FORMAT)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default Files;