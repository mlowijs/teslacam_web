import * as React from "react";
import { Tile, Box, Title, Table } from "bloomer";
import { ApiFileSystemEntry } from "../../model/Models";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
}

const Files: React.FunctionComponent<Props> = (props) =>
    <Tile isChild render={(tileProps: any) =>
        <Box {...tileProps}>
            <Title className="is-size-3-touch">{props.title}</Title>

            <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Date</td>
                        <td>Size</td>
                    </tr>
                </thead>
                <tbody>
                {props.files.map(f =>
                    <tr key={f.name}>
                        <td>{f.name}</td>
                        <td>{f.date}</td>
                        <td>{f.size}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Box>
    } />

export default Files;