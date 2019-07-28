import * as React from "react";
import { Tile, Box, Title } from "bloomer";

interface Props {
    title: string;
}

const Files: React.FunctionComponent<Props> = (props) =>
    <Tile isChild render={(tileProps: any) =>
        <Box {...tileProps}>
            <Title className="is-size-3-touch">{props.title}</Title>
        </Box>
    } />

export default Files;