const baseUri = process.env.SERVER_URI;

export const get = async <TResponse>(path: string): Promise<TResponse> => {
    const response = await fetch(`${baseUri}/${path}`, {
        method: "get"
    });

    return await response.json() as TResponse;
};