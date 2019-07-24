import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";
import { Button } from "bloomer";

interface Props {
    event: ClientConnectedEvent;
}

const Actions: React.FunctionComponent<Props> = () =>
    <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
    </>

export default Actions;