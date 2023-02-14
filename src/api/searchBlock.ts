import makeFSRequest from "api/makeFSRequest";
import { LedgerSearchResult } from "api/types";

export default async function searchBlock(query: string): Promise<LedgerSearchResult> {
    const { result, error } = await makeFSRequest<{ results: LedgerSearchResult }>({
        method: "search_ledger",
        params: { query }
    });

    if (result) {
        return result.results[0];
    } else {
        throw new Error(error);
    }
}
