import makeFSRequest from "api/makeFSRequest";
import { Block, BlocksResponse } from "api/types";

export const INITIAL_BLOCK_COUNT = 50;

export function mergeBlocksResponse(blocksResponse: BlocksResponse): Block[] {
    const blocks: Block[] = [];
    blocksResponse.blocks.forEach((block, index) => {
        blocks.push({
            ...block,
            ...blocksResponse.blockContents[index],
            // in case watcher isn't running
            ...(blocksResponse.watcherInfos[index] ?? {})
        });
    });

    return blocks;
}

export default async function getRecentBlocks(): Promise<Block[]> {
    const { result, error } = await makeFSRequest<BlocksResponse>({
        method: "get_recent_blocks",
        params: {
            limit: 50
        }
    });

    if (result) {
        return mergeBlocksResponse(result);
    } else {
        throw new Error(error);
    }
}
