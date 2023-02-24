import { useLoaderData } from "react-router-dom";

import { Block, BurnTx, MintInfoResponse } from "api/types";
import CurrentBlock from "components/current-block/CurrentBlock";

export type BlockInfo = {
    blockContents: Block;
    mintInfo: MintInfoResponse;
    burns: BurnTx[];
};

export default function CurrentBlockPage() {
    const blockInfo = useLoaderData() as BlockInfo;

    return <CurrentBlock {...blockInfo} />;
}
