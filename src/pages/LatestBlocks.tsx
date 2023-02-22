import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import { Block } from "api/types";
import LatestBlocksLoaded from "components/latest-blocks/LatestBlocksLoaded";
import LatestBlocksLoading from "components/latest-blocks/LatestBlocksLoading";

export default function LatestBlocks() {
    const { preLoadedBlocks } = useLoaderData() as {
        preLoadedBlocks: Promise<Block[]>;
    };

    return (
        <Suspense fallback={<LatestBlocksLoading />}>
            <Await resolve={preLoadedBlocks}>
                {(blocks) => {
                    return <LatestBlocksLoaded preLoadedBlocks={blocks} />;
                }}
            </Await>
        </Suspense>
    );
}
