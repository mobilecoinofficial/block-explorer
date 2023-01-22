type MakeRequestArgs = {
    method: string;
    params: Record<string, string | number> | null;
};

type MakeRequestResult<T> = {
    error?: string;
    result: T;
};

// TODO add port & host as env config for deployment
const port = "9090";
const host = "localhost";
const address = `http://${host}:${port}/wallet/v2`;
const FSRequiredArgs = {
    jsonrpc: "2.0",
    id: 1
};
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

export default async function makeRequest<T>({
    method,
    params
}: MakeRequestArgs): Promise<MakeRequestResult<T>> {
    try {
        const response = await fetch(address, {
            method: "POST",
            headers,
            body: JSON.stringify({
                method,
                ...FSRequiredArgs,
                params
            })
        });

        const result = await response.json();

        return { result: result.result };

        // TODO: better error handling
    } catch (e) {
        console.log(e);
        return e;
    }
}
