import * as bulma from "../index.scss";
import * as styles from "./Status.scss";
import * as React from "react";
import classNames from "classnames";
import { ApiStatus } from "../../model/Models";
import fileSize from "filesize";
import moment from "moment";
import { DATE_FORMAT } from "../Constants";

interface Props {
    status: ApiStatus;
}

const fileSizePartial = fileSize.partial({ round: 0, base: 10 });

const Status: React.FunctionComponent<Props> = ({ status }) =>
    <div className={classNames(styles.Status, bulma.box)}>
        <div className={classNames(bulma.title)}>Status</div>

        {status &&
            <table className={classNames(bulma.table, bulma.isFullwidth)}>
                <tbody>
                    <tr>
                        <th>Last archive</th>
                        <td>{moment(status.lastArchive).format(DATE_FORMAT)}</td>
                    </tr>
                    <tr>
                        <th>Last upload</th>
                        <td>{moment(status.lastUpload).format(DATE_FORMAT)}</td>
                    </tr>
                    <tr>
                        <th>Disk</th>
                        <td className={styles.stats}>
                            <span>{fileSizePartial(status.diskFree)} free,&nbsp;</span>
                            <span>{fileSizePartial(status.diskSize - status.diskFree)} used,&nbsp;</span>
                            <span>{fileSizePartial(status.diskSize)} total</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Saved clips</th>
                        <td className={styles.stats}>
                            <span>{status.savedClipsCount} clips,&nbsp;</span>
                            <span>{fileSizePartial(status.savedClipsBytes)} used</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Recent clips</th>
                        <td className={styles.stats}>
                            <span>{status.recentClipsCount} clips,&nbsp;</span>
                            <span>{fileSizePartial(status.recentClipsBytes)} used</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            // <>
            //     <p>12GB in Recent Clips</p>
            // </>
        }
    </div>;

export default Status;