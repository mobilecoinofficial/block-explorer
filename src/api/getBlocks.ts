import makeRequest from "api/makeRequest";
import { Block, BlocksResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";
import { mergeBlocksResponse } from "api/getRecentBlocks";

export default async function getBlocks(firstBlockIndex: number, limit: number): Promise<Block[]> {
    const { result, error } = await makeRequest<BlocksResponse>({
        method: "get_blocks",
        params: {
            first_block_index: firstBlockIndex.toString(),
            limit: limit
        }
    });

    if (result) {
        return mergeBlocksResponse(camelCaseObjectKeys(result));
    } else {
        throw new Error(error);
    }
}
