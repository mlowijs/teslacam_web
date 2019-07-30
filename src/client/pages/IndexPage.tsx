import * as styles from "../index.scss";
import * as React from "react";
import ActionsContainer from "../containers/ActionsContainer";
import StatusContainer from "../containers/StatusContainer";
import FilesContainer from "../containers/FilesContainer";
import { FilesType } from "../../model/Enums";
import classNames from "classnames";

const IndexPage: React.FunctionComponent = () =>
    <div className={classNames(styles.section, styles.isSize3Touch)}>
        <div className={styles.container}>
            <div className={classNames(styles.columns, styles.isDesktop)}>
                <div className={styles.column}>
                    <StatusContainer />
                </div>
                <div className={styles.column}>
                    <ActionsContainer />
                </div>
            </div>
            
            <div className={classNames(styles.tile, styles.isAncestor)}>
                <div className={classNames(styles.tile, styles.isVertical, styles.isParent)}>
                    <FilesContainer filesType={FilesType.SAVED} title="Saved" />
                    <FilesContainer filesType={FilesType.RECENT} title="Recent" />
                </div>

                <div className={classNames(styles.tile, styles.isParent)}>
                    <FilesContainer filesType={FilesType.ARCHIVE} title="Archive" />
                </div>
            </div>
        </div>
    </div>;

export default IndexPage;