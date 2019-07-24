import * as React from "react";
import { Columns, Column, Box } from "bloomer";
import ActionsContainer from "../containers/ActionsContainer";
import { Title } from "bloomer/lib/elements/Title";

const IndexPage: React.FunctionComponent = () =>
    <Columns>
        <Column isSize="2/3">
            <ActionsContainer />
        </Column>
        <Column>
            <Box>
                <Title size={4}>Status</Title>
                <p>Something: Something</p>
                <p>Something: something2</p>
            </Box>
        </Column>
    </Columns>;

export default IndexPage;