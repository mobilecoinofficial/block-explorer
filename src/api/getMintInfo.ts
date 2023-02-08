import makeRARequest from "api/makeRARequest";
import { MintInfoResponse } from "api/types";

export default async function getMintInfo(blockIndex: string) {
    const { result } = await makeRARequest<MintInfoResponse>({
        route: `mint_info?block_index=${blockIndex}`
    });

    return result;
}
