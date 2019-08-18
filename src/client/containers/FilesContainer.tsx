import * as React from "react";
import Files from "../components/Files";
import { FilesType } from "../../model/Enums";
import { ApiFileSystemEntry } from "../../model/Models";
import { getFiles } from "../api/Files";
import { StoreContext } from "../hooks/StoreContext";
import { SHOW_VIDEO } from "../actions/Actions";

interface Props {
    title: string;
    filesType: FilesType
}

const FilesContainer: React.FunctionComponent<Props> = ({ title, filesType }) => {
    const { dispatch } = React.useContext(StoreContext);
    
    const [files, setFiles] = React.useState<ApiFileSystemEntry[]>([]); 
    
    React.useEffect(() => {
        getFiles(filesType).then(files => {
            setFiles(files);
        });
    }, []);
    
    const onClipClick = (type: string, name: string) => {
        dispatch({ type: SHOW_VIDEO, payload: `${type}/${name}`});
    };

    return <Files files={files} title={title} onClipClick={onClipClick} />;
}

export default FilesContainer;