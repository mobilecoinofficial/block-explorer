import makeRARequest from "api/makeRARequest";
import { BurnsResponse, BurnTx } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

export default async function getMintInfo(blockIndex: string): Promise<BurnTx[]> {
    const { result } = await makeRARequest<BurnsResponse>({
        route: `burns?block_index=${blockIndex}`
    });

    return camelCaseObjectKeys(result.burn_txs);
}
