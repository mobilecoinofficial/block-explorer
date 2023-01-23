import makeRequest from "api/makeRequest";
import { Block, BlockResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

function mergeBlockResponse(blockResponse: BlockResponse): Block {
    return {
        ...blockResponse.block,
        ...blockResponse.blockContents,
        ...blockResponse.watcherInfo
    };
}

export default async function getBlock(blockIndex: string): Promise<Block> {
    const { result, error } = await makeRequest<BlockResponse>({
        method: "get_block",
        params: {
            block_index: blockIndex
        }
    });

    if (result) {
        return mergeBlockResponse(camelCaseObjectKeys(result));
    } else if (error) {
        throw new Error(error);
    } else {
        throw new Error(`Block Index ${blockIndex} not found`);
    }
}
