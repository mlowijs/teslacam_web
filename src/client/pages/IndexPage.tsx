import * as React from "react";
import { ActionsContainer } from "../containers/ActionsContainer";
import { FilesContainer } from "../containers/FilesContainer";

import styles from "./IndexPage.css";

export const IndexPage: React.FunctionComponent = () =>
    <div className={styles.IndexPage}>
        <h1>TeslaCam Browser</h1>

        <ActionsContainer />
        <FilesContainer />
    </div>;