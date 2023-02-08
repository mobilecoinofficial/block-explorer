import camelCaseObjectKeys from "utils/camelize";

// Request to Reserve Auditor
type makeRARequestArgs = {
    route: string;
};

type makeRARequestResult<T> = {
    error?: string;
    result: T;
};

export default async function makeRARequest<T>({
    route
}: makeRARequestArgs): Promise<makeRARequestResult<T>> {
    try {
        const response = await fetch(`${process.env.REACT_APP_RESERVE_AUDITOR_URL}/${route}`, {
            method: "GET"
        });
        if (response.status === 404) {
            throw new Error("RESERVE_AUDITOR_BLOCK_NOT_FOUND_ERROR");
        }
        const result = await response.json();
        return { result: camelCaseObjectKeys(result) };
    } catch (e) {
        throw new Error(e);
    }
}
