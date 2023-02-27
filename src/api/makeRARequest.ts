import axios from "axios";

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
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_RESERVE_AUDITOR_URL}/${route}`
        });

        if (response.status === 404) {
            throw new Error("RESERVE_AUDITOR_BLOCK_NOT_FOUND_ERROR");
        }

        return { result: camelCaseObjectKeys(response.data) };
    } catch (e) {
        throw new Error(e);
    }
}
