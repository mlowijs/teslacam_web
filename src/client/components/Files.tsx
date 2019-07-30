import * as React from "react";
import { ApiFileSystemEntry } from "../../model/Models";

interface Props {
    title: string;
    files: ApiFileSystemEntry[];
}

const Files: React.FunctionComponent<Props> = (props) =>
    <div className="tile is-child box">
        <div className="title is-size-3-touch">{props.title}</div>

        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Size</th>
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
        </table>
    </div>

export default Files;