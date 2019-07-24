import * as React from "react";
import ActionsContainer from "../containers/ActionsContainer";
import StatusContainer from "../containers/StatusContainer";
import { Container, Tile, Section } from "bloomer";

const IndexPage: React.FunctionComponent = () =>
    <Section>
        <Container>
            <Tile isAncestor>
                <Tile isSize={6} isVertical isParent>
                    <ActionsContainer />
                    <Tile isChild>Saved</Tile>
                    <Tile isChild>Recent</Tile>
                </Tile>

                <Tile isVertical isParent>
                    <StatusContainer />
                    <Tile isChild>Archive</Tile>
                </Tile>
            </Tile>
        </Container>
    </Section>;

export default IndexPage;