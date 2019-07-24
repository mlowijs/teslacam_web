import * as React from "react";
import { Container } from "bloomer";
import Header from "../components/Header";
import IndexPage from "../pages/IndexPage";

const App: React.FunctionComponent = () =>
    <Container>
        <Header />

        <IndexPage />
    </Container>;

export default App;