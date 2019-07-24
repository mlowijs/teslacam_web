import * as React from "react";
import { Title, HeroBody, Container, Hero } from "bloomer";

const Header: React.FunctionComponent = () =>
    <Hero isColor="primary">
        <HeroBody>
            <Container>
                <Title>TeslaCam Browser</Title>
            </Container>
        </HeroBody>
    </Hero>;

export default Header;