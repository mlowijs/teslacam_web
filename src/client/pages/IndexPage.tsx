import * as React from "react";
import { ActionsContainer } from "../containers/ActionsContainer";
import { FilesContainer } from "../containers/FilesContainer";

export const IndexPage: React.FunctionComponent = () =>
    <div>
        <h1>TeslaCam Browser</h1>

        <ActionsContainer />
        <FilesContainer />
    </div>;