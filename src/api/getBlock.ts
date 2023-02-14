import makeFSRequest from "api/makeFSRequest";
import { Block, BlockResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

function mergeBlockResponse(blockResponse: BlockResponse): Block {
    return {
        ...blockResponse.block,
        ...blockResponse.blockContents,
        // in case watcher isn't running
        ...(blockResponse.watcherInfo ?? {})
    };
}

export default async function getBlock(blockIndex: string): Promise<Block> {
    const { result, error } = await makeFSRequest<BlockResponse>({
        method: "get_block",
        params: {
            block_index: blockIndex
        }
    });

    if (result) {
        return mergeBlockResponse(camelCaseObjectKeys(result));
    } else if (error) {
        throw new Error("FULL_SERVICE_BLOCK_NOT_FOUND");
    }
}
