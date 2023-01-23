import makeRequest from "api/makeRequest";
import { Block, BlocksResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

export const INITIAL_BLOCK_COUNT = 50;

export function mergeBlocksResponse(blocksResponse: BlocksResponse): Block[] {
    const blocks: Block[] = [];
    blocksResponse.blocks.forEach((block, index) => {
        blocks.push({
            ...block,
            ...blocksResponse.blockContents[index],
            ...blocksResponse.watcherInfos[index]
        });
    });

    return blocks;
}

export default async function getRecentBlocks(): Promise<Block[]> {
    const { result, error } = await makeRequest<BlocksResponse>({
        method: "get_recent_blocks",
        params: {
            limit: 50
        }
    });

    if (result) {
        return mergeBlocksResponse(camelCaseObjectKeys(result));
    } else {
        throw new Error(error);
    }
}
