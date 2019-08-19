import * as React from "react";
import Header from "../components/Header";
import IndexPage from "../pages/IndexPage";
import VideoContainer from "../containers/VideoContainer";
import { Store } from "../hooks/StoreContext";

const App: React.FunctionComponent = () =>
    <Store>
        <Header />

        <VideoContainer />

        <IndexPage />
    </Store>;

export default App;