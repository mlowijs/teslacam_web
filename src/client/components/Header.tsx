import * as styles from "../index.scss";

import * as React from "react";
import classNames from "classnames";

const Header: React.FunctionComponent = () =>
    <div className={classNames(styles.hero, styles.isPrimary)}>
        <div className={styles.heroBody}>
            <div className={styles.container}>
                <div className={styles.title}>TeslaCam Browser</div>
            </div>
        </div>
    </div>;

export default Header;