import * as React from "react";
import StatusComponent from "../components/Status";
import { ApiStatus } from "../../model/Models";
import * as Status from "../api/Status";

const StatusContainer: React.FunctionComponent = () => {
    const  [status, setStatus] = React.useState<ApiStatus>(null);

    React.useEffect(() => {
        Status.getStatus().then(status => {
            setStatus(status);
        });
    }, []);

    return <StatusComponent status={status} />
};

export default StatusContainer;