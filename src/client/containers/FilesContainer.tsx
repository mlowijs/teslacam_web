import * as React from "react";
import Files from "../components/Files";
import { FilesType } from "../../model/Enums";

interface Props {
    title: string;
    filesType: FilesType
}

const FilesContainer: React.FunctionComponent<Props> = (props) => {
    
    return <Files {...props} />;
}

export default FilesContainer;