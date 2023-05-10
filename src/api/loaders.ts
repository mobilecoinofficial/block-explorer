import { defer } from "react-router-dom";

import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import getMintInfo from "api/getMintInfo";
import getBurns from "api/getBurns";
import getNetworkStatus from "api/getNetworkStatus";
import searchBlock from "api/searchBlock";

const getBlockInfo = async (blockIndex) => {
    const blockContents = await getBlock(blockIndex);
    const mintInfo = await getMintInfo(blockIndex);
    const burns = await getBurns(blockIndex);
    return {
        blockContents,
        mintInfo,
        burns
    };
};

const getLatestBlock = async () => {
    const latestBlocks = await getRecentBlocks(1);
    return getBlockInfo(latestBlocks[0].index);
};

export async function latestBlockLoader() {
    return defer({
        getLatestBlock: getLatestBlock()
    });
}

export async function layoutLoader() {
    return defer({
        networkStatus: getNetworkStatus()
    });
}

export async function recentBlocksLoader() {
    return defer({
        preLoadedBlocks: getRecentBlocks()
    });
}

export async function currentBlockLoader({ params }) {
    return getBlockInfo(params.blockIndex);
}

export async function byTxoCurrentBlockLoader({ params }) {
    const foundBlock = await searchBlock(params.pubKeyOrKeyImage.trim());
    if (foundBlock) {
        return getBlockInfo(foundBlock.block.index);
    } else {
        throw new Error(params.pubKeyOrKeyImage);
    }
}
