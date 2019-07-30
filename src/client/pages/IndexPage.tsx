import * as React from "react";
import ActionsContainer from "../containers/ActionsContainer";
import StatusContainer from "../containers/StatusContainer";
import FilesContainer from "../containers/FilesContainer";
import { FilesType } from "../../model/Enums";

const IndexPage: React.FunctionComponent = () =>
    <div className="section is-size-3-touch">
        <div className="container">
            <div className="columns is-desktop">
                <div className="column">
                    <StatusContainer />
                </div>
                <div className="column">
                    <ActionsContainer />
                </div>
            </div>
            
            <div className="tile is-ancestor">
                <div className="tile is-size-6 is-vertical is-parent">
                    <FilesContainer filesType={FilesType.SAVED} title="Saved" />
                    <FilesContainer filesType={FilesType.RECENT} title="Recent" />
                </div>

                <div className="tile is-vertical is-parent">
                    <FilesContainer filesType={FilesType.ARCHIVE} title="Archive" />
                </div>
            </div>
        </div>
    </div>;

export default IndexPage;