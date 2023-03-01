import axios from "axios";
import camelCaseObjectKeys from "utils/camelize";

// Request to full-service
type makeFSRequestArgs = {
    method: string;
    params: Record<string, string | number> | null;
};

type FSResponse<T> = {
    data: {
        result?: T;
        error?: { data: { details: string } };
    };
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
        const response: FSResponse<T> = await axios({
            method: "post",
            headers,
            url: process.env.FULL_SERVICE_URL,
            data: JSON.stringify({
                method,
                ...FSRequiredArgs,
                params
            })
        });

        if (response.data?.error) {
            throw new Error(response.data?.error?.data.details);
        }

        return { result: camelCaseObjectKeys(response.data.result) };
    } catch (e) {
        throw new Error(e);
    }
}
