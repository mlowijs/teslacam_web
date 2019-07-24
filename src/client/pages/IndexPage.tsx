import * as React from "react";
import { Columns, Column, Box } from "bloomer";
import ActionsContainer from "../containers/ActionsContainer";

const IndexPage: React.FunctionComponent = () =>
    <Columns>
        <Column isSize="3/4">
            <ActionsContainer />
        </Column>
        <Column>
            <Box>
                <h2>Status</h2>
            </Box>
        </Column>
    </Columns>;

export default IndexPage;