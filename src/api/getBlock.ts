import makeFSRequest from "api/makeFSRequest";
import { Block, BlockResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";
import getMintInfo from "./getMintInfo";

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

    const info = await getMintInfo(blockIndex);
    console.log(info);

    if (result) {
        return mergeBlockResponse(camelCaseObjectKeys(result));
    } else if (error) {
        throw new Error(error);
    } else {
        throw new Error(`Block Index ${blockIndex} not found`);
    }
}
