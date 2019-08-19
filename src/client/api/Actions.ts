import { post } from "./ApiClient";

export const forceArchive = async () => {
    await post("actions/forceArchive");
}

export const forceUpload = async () => {
    await post("actions/forceUpload");
}