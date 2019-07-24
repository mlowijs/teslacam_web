import * as React from "react";
import Files from "../components/Files";

interface Props {
    title: string;
}

const FilesContainer: React.FunctionComponent<Props> = (props) => {
    return <Files {...props} />;
}

export default FilesContainer;