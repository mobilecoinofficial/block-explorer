// import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback, useRef, useLayoutEffect } from "react";
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
    Collapse
} from "@mui/material";

import { useSyncData } from "pages/Layout";
import { Block } from "api/types";
import { INITIAL_BLOCK_COUNT } from "api/getRecentBlocks";
import getBlocks from "api/getBlocks";
import BlockRow from "components/BlockRow";

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
    const tableEl = useRef(null);
    const [renderTopContents, setRenderTopContents] = useState(true);
    const { preLoadedBlocks, networkStatus } = useSyncData();
    const [blocks, setBlocks] = useState<Block[]>(preLoadedBlocks as Block[]);
    const [distanceBottom, setDistanceBottom] = useState(0);
    const [hasMoreBlocks, setHasMoreBlocks] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const loadMoreBlocks = useCallback(async () => {
        setLoading(true);
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
        setLoading(false);
    }, [blocks]);

    const scrollListener = useCallback(() => {
        if (tableEl.current.scrollTop === 0 && !renderTopContents) {
            setRenderTopContents(true);
        } else if (renderTopContents) {
            setRenderTopContents(false);
        }

        // if (tableEl.current.scrollTop != 0 && renderTopContents) {
        // }
        const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
        // if you want to change distanceBottom every time new data is loaded
        // don't use the if statement
        if (!distanceBottom) {
            // calculate distanceBottom that works for you
            setDistanceBottom(Math.round(bottom * 0.2));
        }
        if (tableEl.current.scrollTop > bottom - distanceBottom && hasMoreBlocks && !loading) {
            loadMoreBlocks();
        }
    }, [hasMoreBlocks, loadMoreBlocks, loading, distanceBottom, renderTopContents]);

    useLayoutEffect(() => {
        const tableRef = tableEl.current;
        tableRef.addEventListener("scroll", scrollListener);
        return () => {
            tableRef.removeEventListener("scroll", scrollListener);
        };
    }, [scrollListener]);

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
            {/* <div style={{ display: renderTopContents ? "inherit" : "none" }}> */}
            <Collapse in={renderTopContents} timeout={600}>
                <Grid container sx={{ marginBottom: 2, marginTop: 1 }}>
                    <Grid item xs={6} justifyContent="center" display="flex">
                        <HeaderNumber
                            title="Number of Blocks"
                            value={networkStatus?.localBlockHeight}
                        />
                    </Grid>
                    <Grid item xs={6} justifyContent="center" display="flex">
                        <HeaderNumber title="Transaction Outputs" value={networkStatus?.numTxos} />
                    </Grid>
                </Grid>
                <Typography variant="h4">Latest Blocks</Typography>
            </Collapse>
            {/* </div> */}
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
            </TableContainer>
        </Container>
    );
}
