import { defer } from "react-router-dom";

import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import getMintInfo from "api/getMintInfo";
import getBurns from "api/getBurns";
import getNetworkStatus from "api/getNetworkStatus";

const getLatestBlock = async () => {
    const latestBlocks = await getRecentBlocks(1);
    const latestBlockIndex = latestBlocks[0].index;
    const blockContents = await getBlock(latestBlockIndex);
    const mintInfo = await getMintInfo(latestBlockIndex);
    const burns = await getBurns(latestBlockIndex);
    return {
        blockContents,
        mintInfo,
        burns
    };
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
    const blockContents = await getBlock(params.blockIndex);
    const mintInfo = await getMintInfo(params.blockIndex);
    const burns = await getBurns(params.blockIndex);
    return {
        blockContents,
        mintInfo,
        burns
    };
}
