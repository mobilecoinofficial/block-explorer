import camelCaseObjectKeys from "utils/camelize";

// Request to full-service
type makeFSRequestArgs = {
    method: string;
    params: Record<string, string | number> | null;
};

type makeFSRequestResult<T> = {
    error?: string;
    result: T;
};

const FSRequiredArgs = {
    jsonrpc: "2.0",
    id: 1
};
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

export default async function makeFSRequest<T>({
    method,
    params
}: makeFSRequestArgs): Promise<makeFSRequestResult<T>> {
    try {
        const response = await fetch(process.env.REACT_APP_FULL_SERVICE_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({
                method,
                ...FSRequiredArgs,
                params
            })
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error.data?.details);
        }

        return { result: camelCaseObjectKeys(result.result) };
    } catch (e) {
        throw new Error(e);
    }
}
