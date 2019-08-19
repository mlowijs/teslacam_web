import * as React from "react";
import Video from "../components/Video";
import { StoreContext } from "../hooks/StoreContext";
import { CLOSE_VIDEO } from "../actions/Actions";

const VideoContainer: React.FunctionComponent = () => {
    const { state, dispatch } = React.useContext(StoreContext);
    
    const onCloseClick = () => {
        dispatch({ type: CLOSE_VIDEO });
    }

    return <Video path={state.videoPath} onCloseClick={onCloseClick} />
};

export default VideoContainer;