import { useState, useCallback, useRef, useLayoutEffect, Suspense } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Collapse,
    LinearProgress
} from "@mui/material";
import { useLoaderData, Await } from "react-router-dom";

// import { useSyncData } from "pages/Layout";
import { Block, NetworkStatus } from "api/types";
import { INITIAL_BLOCK_COUNT } from "api/getRecentBlocks";
import getBlocks from "api/getBlocks";
import BlockRow from "components/BlockRow";
import useThrottle from "utils/useThrottle";
import { useNetworkStatus } from "./Layout";

type HeaderNumberProps = {
    title: string;
    value?: string;
};

const HeaderNumber = ({ title, value }: HeaderNumberProps) => (
    <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography variant="h5">{value ? parseInt(value).toLocaleString("en-US") : ""}</Typography>
    </Box>
);

export default function LatestBlocks() {
    const { preLoadedBlocks } = useLoaderData() as {
        preLoadedBlocks: Promise<Block[]>;
    };

    return (
        <Suspense fallback={<p>Loading package location...</p>}>
            <Await resolve={preLoadedBlocks}>
                {(blocks) => {
                    // console.log()
                    return <LatestBlocksLoaded preLoadedBlocks={blocks} />;
                }}
            </Await>
        </Suspense>
    );
}

function LatestBlocksLoaded({ preLoadedBlocks }: { preLoadedBlocks: Block[] }) {
    // const { networkStatus, preLoadedBlocks } = useLoaderData() as {
    // networkStatus: NetworkStatus;
    // preLoadedBlocks: Block[];
    // };
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

    const getTableHeightToSubtract = useCallback(() => {
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
    }, [renderTopContents]);

    return (
        <Container sx={{ overflow: "hidden" }}>
            <Collapse in={renderTopContents} timeout={800}>
                <div>
                    <Grid container sx={{ marginBottom: 2, marginTop: 1 }}>
                        <Grid item xs={6} justifyContent="center" display="flex">
                            <HeaderNumber
                                title="Number of Blocks"
                                value={networkStatus?.localBlockHeight}
                            />
                        </Grid>
                        <Grid item xs={6} justifyContent="center" display="flex">
                            <HeaderNumber
                                title="Transaction Outputs"
                                value={networkStatus?.numTxos}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h4">Latest Blocks</Typography>
                </div>
            </Collapse>
            <TableContainer
                sx={{ maxHeight: `calc(100vh - ${getTableHeightToSubtract()}px)` }}
                ref={tableEl}
            >
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0px 12px" }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Hash</TableCell>
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
