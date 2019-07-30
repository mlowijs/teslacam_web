import * as React from "react";
import Files from "../components/Files";
import { FilesType } from "../../model/Enums";
import { ApiFileSystemEntry } from "../../model/Models";
import { getFiles } from "../api/Files";

interface Props {
    title: string;
    filesType: FilesType
}

const FilesContainer: React.FunctionComponent<Props> = (props) => {
    const { title, filesType } = props;

    const [files, setFiles] = React.useState<ApiFileSystemEntry[]>([]);
    
    React.useEffect(() => {
        getFiles(filesType).then(files => {
            setFiles(files);
        });
    }, []);
    
    return <Files files={files} title={title} />;
}

export default FilesContainer;