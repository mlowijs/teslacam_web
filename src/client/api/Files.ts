import { FilesType } from "../../model/Enums";
import { ApiFileSystemEntry } from "../../model/Models";
import { get } from "./ApiClient";

export const getFiles = (filesType: FilesType): Promise<ApiFileSystemEntry[]> => {
    return get<ApiFileSystemEntry[]>(`files/${filesType}`);
};