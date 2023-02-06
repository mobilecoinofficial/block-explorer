// Request to Reserve Auditor
type makeRARequestArgs = {
    route: string;
};

type makeRARequestResult<T> = {
    error?: string;
    result: T;
};

// TODO replace const with config or env vars or something
const host = "localhost";
const AUDITOR_URL = `http://${host}:8080/`;

export default async function makeRARequest<T>({
    route
}: makeRARequestArgs): Promise<makeRARequestResult<T>> {
    try {
        const response = await fetch(`${AUDITOR_URL}${route}`, {
            method: "GET"
        });
        if (response.status === 404) {
            throw new Error("RESERVE_AUDITOR_BLOCK_NOT_FOUND_ERROR");
        }
        const result = await response.json();
        return { result };
    } catch (e) {
        throw new Error(e);
    }
}
