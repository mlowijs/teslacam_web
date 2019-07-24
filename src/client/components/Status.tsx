import * as React from "react";
import { Title, Box, Tile } from "bloomer";

const Status: React.FunctionComponent = () =>
    <Tile isChild render={(tileProps: any) =>
        <Box {...tileProps}>

            <Title size={4}>Status</Title>
            <p>Last archive: 2019-07-23 18:54:00</p>
            <p>Last upload: 2019-07-23 18:52:12</p>
            <p>Disk: 24GB free, 40GB used, 64GB total</p>
            <p>28GB in Saved Clips</p>
            <p>12GB in Recent Clips</p>
        </Box>
    } />;

export default Status;