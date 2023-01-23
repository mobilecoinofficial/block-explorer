import { useLoaderData } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback } from "react";
import { css } from "@emotion/react";

import Page from "components/Page";
import { Block } from "api/types";
import { INITIAL_BLOCK_COUNT } from "api/getRecentBlocks";
import getBlocks from "api/getBlocks";
import BlockRow from "components/BlockRow";

const styles = {
    latestBlocksHeader: css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    `,
    latestBlocksHeaderTitle: css`
        font-size: 24px;
        font-weight: 500;
    ,`,
    latestBlocksHeaderPagination: css`
        color: #666666;
    `,
    latestBlocksTable: css`
        width: 100%;
        border-spacing: 0 16px;

        th {
            color: #666666;
            font-weight: 300;
            text-align: left;
            font-size: 16px;
            padding-left: 8px;
            height: 16px;
        }

        tbody tr {
            outline: 1px solid #eff1f1;
        }

        td {
            font-weight: 300;
            text-align: left;
            font-size: 16px;
            padding-left: 8px;
            background-color: white;
            height: 56px;
            padding: 8px;
            border: none;
        }
    `
};

export default function LatestBlocks() {
    const preLoadedBlocks = useLoaderData();
    const [blocks, setBlocks] = useState<Block[]>(preLoadedBlocks as Block[]);
    const [hasMoreBlocks, setHasMoreBlocks] = useState<boolean>(true);

    const getMoreBlocks = useCallback(async () => {
        let blockIndex = parseInt(blocks[blocks.length - 1].index) - INITIAL_BLOCK_COUNT;
        let limit = INITIAL_BLOCK_COUNT;
        if (blockIndex < 0) {
            blockIndex = 0;
            limit = parseInt(blocks[blocks.length - 1].index);
        }

        const moreBlocks = await getBlocks(blockIndex, limit);

        setBlocks([...blocks, ...moreBlocks.reverse()]);

        if (blocks[blocks.length - 1].index === "0") {
            setHasMoreBlocks(false);
        }
    }, [blocks]);

    return (
        <Page>
            <div css={styles.latestBlocksHeader}>
                <span css={styles.latestBlocksHeaderTitle}>Latest Blocks</span>
            </div>
            <div>
                <InfiniteScroll
                    dataLength={blocks.length}
                    next={getMoreBlocks}
                    hasMore={hasMoreBlocks}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Wow! you scrolled through all the blocks. Impressive!</b>
                        </p>
                    }
                >
                    <table css={styles.latestBlocksTable}>
                        <thead>
                            <tr>
                                <th>Block Index</th>
                                <th>Hash</th>
                                <th>TXOs</th>
                                <th>IMGs</th>
                                <th>SIGs</th>
                                <th>Timestamp</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {blocks.map((block) => (
                                <BlockRow block={block} key={block.id} />
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </Page>
    );
}
