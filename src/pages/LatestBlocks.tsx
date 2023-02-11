import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback } from "react";
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
    TableBody
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
    const { preLoadedBlocks, networkStatus } = useSyncData();
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
        <Container>
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
            <div>
                <InfiniteScroll
                    dataLength={blocks.length}
                    next={getMoreBlocks}
                    hasMore={hasMoreBlocks}
                    loader={<Typography variant="h4">Loading...</Typography>}
                    endMessage={
                        <div style={{ textAlign: "center" }}>
                            <Typography variant="h4">
                                Wow! you scrolled through all the blocks. Impressive!
                            </Typography>
                        </div>
                    }
                >
                    <TableContainer>
                        <Table sx={{ borderCollapse: "separate", borderSpacing: "0px 12px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Block Index</TableCell>
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
                </InfiniteScroll>
            </div>
        </Container>
    );
}
