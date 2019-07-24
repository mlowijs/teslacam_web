import * as React from "react";
import ActionsContainer from "../containers/ActionsContainer";
import StatusContainer from "../containers/StatusContainer";
import { Container, Tile, Section, Columns, Column } from "bloomer";

const IndexPage: React.FunctionComponent = () =>
    <Section>
        <Container>
            <Columns>
                <Column>
                    <StatusContainer />
                </Column>
                <Column>
                    <ActionsContainer />
                </Column>
            </Columns>
            
            <Tile isAncestor>
                <Tile isSize={6} isVertical isParent>
                    <Tile isChild>Saved</Tile>
                    <Tile isChild>Recent</Tile>
                </Tile>

                <Tile isVertical isParent>

                    <Tile isChild>Archive</Tile>
                </Tile>
            </Tile>
        </Container>
    </Section>;

export default IndexPage;