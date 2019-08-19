import { ApiStatus } from "../../model/Models";
import { get } from "./ApiClient";

export const getStatus = (): Promise<ApiStatus> => {
    return get<ApiStatus>("status");
};