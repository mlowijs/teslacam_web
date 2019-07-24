import * as React from "react";
import { ClientConnectedEvent } from "../../model/Events";
import { Button } from "bloomer";

import * as styles from "./Actions.scss";

interface Props {
    event: ClientConnectedEvent;
}

const Actions: React.FunctionComponent<Props> = () =>
    <>
        <Button className={styles.button}>Button 1</Button>
        <Button className={styles.button}>Button 2</Button>
    </>

export default Actions;