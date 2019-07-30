import * as styles from "../index.scss";
import * as React from "react";
import { ApiFileSystemEntry } from "../../model/Models";
import classNames from "classnames";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
}

const Files: React.FunctionComponent<Props> = (props) =>
    <div className={classNames(styles.tile, styles.isChild, styles.box)}>
        <div className={classNames(styles.title, styles.isSize2Touch)}>{props.title}</div>

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                {props.files.map(f =>
                    <tr key={f.name}>
                        <td>{f.name}</td>
                        <td>{f.date}</td>
                        <td>{f.size}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

export default Files;