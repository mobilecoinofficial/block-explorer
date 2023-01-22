import makeRequest from "api/makeRequest";
import { SearchResult } from "api/types";

export default async function searchBlock(query: string) {
    const { result, error } = await makeRequest<SearchResult>({
        method: "search_ledger",
        params: { query }
    });

    if (result) {
        return result.results[0];
    } else {
        throw new Error(error);
    }
}
