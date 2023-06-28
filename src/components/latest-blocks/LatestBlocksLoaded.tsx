import { useState, useCallback, useRef, useLayoutEffect, useMemo } from "react";
import {
    Container,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Collapse,
    LinearProgress
} from "@mui/material";

import { Block } from "api/types";
import { INITIAL_BLOCK_COUNT } from "api/getRecentBlocks";
import getBlocks from "api/getBlocks";
import BlockRow from "components/latest-blocks/BlockRow";
import useThrottle from "utils/useThrottle";
import { useNetworkStatus } from "pages/Layout";
import TopContent from "components/latest-blocks/TopContent";

export const getTableHeightToSubtract = (renderTopContents = false) => {
    // This is a little brittle a needs to be adjusted if we modify the top of this page.
    // We want the table to be as tall as possible, but we need to provide a fixed height
    // in order for the infinite scroll to work
    const headerHeight = 64;
    const headerPadding = 16;
    const topContentsHeight = 116;
    const tableBottomPadding = 32;
    let tableHeightToSubtract =
        headerHeight + headerPadding + topContentsHeight + tableBottomPadding;
    if (!renderTopContents) {
        tableHeightToSubtract -= topContentsHeight;
    }
    return tableHeightToSubtract;
};

export default function LatestBlocksLoaded({ preLoadedBlocks }: { preLoadedBlocks: Block[] }) {
    const networkStatus = useNetworkStatus();
    // state used for dynamically rendering top content on scroll
    const scrollHeight = useRef(0);
    const [renderTopContents, setRenderTopContents] = useState(true);

    const [blocks, setBlocks] = useState<Block[]>(preLoadedBlocks as Block[]);
    const [hasMoreBlocks, setHasMoreBlocks] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const distanceBottom = useRef(0);

    // state used for both
    const tableEl = useRef(null);

    const loadMoreBlocks = useCallback(async () => {
        setLoading(true);
        let blockIndex = Number(blocks[blocks.length - 1].index) - INITIAL_BLOCK_COUNT;
        let limit = INITIAL_BLOCK_COUNT;
        if (blockIndex < 0) {
            blockIndex = 0;
            limit = Number(blocks[blocks.length - 1].index);
        }

        const moreBlocks = await getBlocks(blockIndex, limit);

        setBlocks([...blocks, ...moreBlocks.reverse()]);
        setLoading(false);

        if (blocks[blocks.length - 1].index === "0") {
            setHasMoreBlocks(false);
        }
    }, [blocks]);

    const throttledContentListener = useThrottle(() => {
        // ignore sideways scrolling
        if (scrollHeight.current - tableEl.current.scrollTop === 0) {
            return;
        }
        // anytime we're scrolling down, hide the top content.
        // any time we're scrolling up, show the top content.
        const scrollDirection =
            scrollHeight.current - tableEl.current.scrollTop > 0 ? "up" : "down";
        if (scrollDirection === "up" && !renderTopContents) {
            setRenderTopContents(true);
        } else if (scrollDirection === "down" && renderTopContents) {
            setRenderTopContents(false);
        }
        scrollHeight.current = tableEl.current.scrollTop;
    }, 500);

    const throttledBlocksListener = useThrottle(() => {
        const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
        if (!distanceBottom.current) {
            distanceBottom.current = Math.round(bottom * 0.6);
        }
        if (
            tableEl.current.scrollTop > bottom - distanceBottom.current &&
            hasMoreBlocks &&
            !loading
        ) {
            loadMoreBlocks();
        }
    }, 50);

    useLayoutEffect(() => {
        const tableRef = tableEl.current;
        tableRef.addEventListener("scroll", throttledContentListener);
        tableRef.addEventListener("scroll", throttledBlocksListener);
        return () => {
            tableRef.removeEventListener("scroll", throttledContentListener);
            tableRef.removeEventListener("scroll", throttledBlocksListener);
        };
    }, [throttledContentListener, throttledBlocksListener]);

    const tableHeightToSubtract = useMemo(
        () => getTableHeightToSubtract(renderTopContents),
        [renderTopContents]
    );

    return (
        <Container sx={{ overflow: "hidden" }}>
            <Collapse in={renderTopContents} timeout={800}>
                <TopContent networkStatus={networkStatus} />
            </Collapse>
            <TableContainer
                sx={{ maxHeight: `calc(100vh - ${tableHeightToSubtract}px)` }}
                ref={tableEl}
            >
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>TXOs</TableCell>
                            <TableCell>IMGs</TableCell>
                            <TableCell>SIGs</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blocks.map((block) => (
                            <BlockRow block={block} key={block.id} />
                        ))}
                    </TableBody>
                </Table>
                {loading && <LinearProgress />}
            </TableContainer>
        </Container>
    );
}
