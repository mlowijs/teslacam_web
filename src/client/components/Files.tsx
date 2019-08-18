import bulma from "../index.scss";
import styles from "./Files.scss";
import * as React from "react";
import { ApiFileSystemEntry } from "../../model/Models";
import classNames from "classnames";
import moment from "moment";
import lodash from "lodash";
import { FilesType } from "../../model/Enums";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
    onClipClick: (type: string, name: string) => void;
}

const Files: React.FunctionComponent<Props> = ({ title, files, onClipClick }) => {
    const groupedFiles = Object.values(lodash.groupBy(files, f => f.date));

    return (
        <div className={classNames(bulma.tile, bulma.isChild, bulma.box)}>
            <div className={classNames(bulma.title, bulma.isSize2Touch)}>{title}</div>

            <table className={bulma.table}>
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
                        const types = files.map(f => <a className={styles.clipLink} onClick={() => onClipClick(type, f.name)}>{f.camera}</a>);

                        return (
                            <tr key={date}>
                                <td>{types}</td>
                                <td>{moment(date).format("D-M-YYYY HH:mm")}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default Files;