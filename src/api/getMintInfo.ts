import makeRARequest from "api/makeRARequest";
import { MintInfoResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

export default async function getMintInfo(blockIndex: string) {
    const { result } = await makeRARequest<MintInfoResponse>({
        route: `mint_info?block_index=${blockIndex}`
    });
    console.log(result);

    return camelCaseObjectKeys(result);
}
