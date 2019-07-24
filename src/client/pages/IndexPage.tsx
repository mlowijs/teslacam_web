import * as React from "react";
import ActionsContainer from "../containers/ActionsContainer";
import StatusContainer from "../containers/StatusContainer";
import { Container, Tile, Section, Columns, Column } from "bloomer";
import FilesContainer from "../containers/FilesContainer";

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
                    <FilesContainer title="Saved" />
                    <FilesContainer title="Recent" />
                </Tile>

                <Tile isVertical isParent>
                    <FilesContainer title="Archive" />
                </Tile>
            </Tile>
        </Container>
    </Section>;

export default IndexPage;