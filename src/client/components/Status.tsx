import * as styles from "../index.scss";
import * as React from "react";
import classNames from "classnames";

const Status: React.FunctionComponent = () =>
    <div className={styles.box}>
        <div className={classNames(styles.title)}>Status</div>

        <p>Last archive: 2019-07-23 18:54:00</p>
        <p>Last upload: 2019-07-23 18:52:12</p>
        <p>Disk: 24GB free, 40GB used, 64GB total</p>
        <p>28GB in Saved Clips</p>
        <p>12GB in Recent Clips</p>
    </div>;

export default Status;