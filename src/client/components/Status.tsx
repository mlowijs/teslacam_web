import * as bulma from "../index.scss";
import * as styles from "./Status.scss";
import * as React from "react";
import classNames from "classnames";
import { ApiStatus } from "../../model/Models";
import fileSize from "filesize";
import moment from "moment";
import classNames from "classnames";

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
                        <td>{moment(status.lastArchive).format("YYYY-MM-DD HH:mm")}</td>
                    </tr>
                    <tr>
                        <th>Last upload</th>
                        <td>{moment(status.lastUpload).format("YYYY-MM-DD HH:mm")}</td>
                    </tr>
                    <tr>
                        <th>Disk</th>
                        <td className={styles.disk}>
                            <span>{fileSizePartial(status.diskFree)} free,</span>
                            <span>{fileSizePartial(status.diskSize - status.diskFree)} used,</span>
                            <span>{fileSizePartial(status.diskSize)} total</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Saved clips</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Recent clips</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            // <>
            //     <p>Disk: 24GB free, 40GB used, 64GB total</p>
            //     <p>28GB in Saved Clips</p>
            //     <p>12GB in Recent Clips</p>
            // </>
        }
    </div>;

export default Status;