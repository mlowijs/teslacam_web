import bulma from "../index.scss";
import styles from "./Files.scss";
import * as React from "react";
import { ApiFileSystemEntry } from "../../model/Models";
import classNames from "classnames";
import moment from "moment";
import lodash from "lodash";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
}

const Files: React.FunctionComponent<Props> = (props) => {
    const groupedFiles = Object.values(lodash.groupBy(props.files, f => f.date));

    return (
        <div className={classNames(bulma.tile, bulma.isChild, bulma.box)}>
            <div className={classNames(bulma.title, bulma.isSize2Touch)}>{props.title}</div>

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
                        const types = files.map(f => <a className={styles.clipLink} href={`${process.env.SERVER_URI}/download/${f.name}`}>{f.type}</a>);

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