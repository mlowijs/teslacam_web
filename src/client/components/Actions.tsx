import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";

interface Props {
    event: ClientConnectedEvent;
}

export const Actions: React.FunctionComponent<Props> = (props) =>
    <div>
        <div>arch: {props.event.nextArchiveAt.fromNow()}</div>
        <div>upl: {props.event.nextUploadAt.fromNow()}</div>
    </div>;