import { Suspense } from "react";
import { useLoaderData, Link, Await, useParams } from "react-router-dom";
import { Box, Typography, Card, Tooltip, Button, Grid, Container, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { Block, BurnTx, MintInfoResponse, NetworkStatus } from "api/types";
import { getTimeStamp } from "components/BlockRow";
import Txos from "components/current-block-sections/Txos";
import KeyImages from "components/current-block-sections/KeyImages";
import Signatures from "components/current-block-sections/Signatures";
import Mints from "components/current-block-sections/Mints";
import MintConfigTxs from "components/current-block-sections/MintConfigTxs";
import CopyableField from "components/CopyableField";
import { useSyncData } from "./Layout";

export const StyledCard = styled(Card)(() => ({
    boxShadow: "none",
    border: "1px solid #cecece",
    height: "100%"
    // backgroundColor: "inherit"
}));

export const StyledCell = styled(TableCell)(() => ({
    border: "none"
}));

export default function BlockPage() {
    const { blockContents, mintInfo, burns, networkStatus } = useLoaderData() as {
        blockContents: Promise<Block>;
        mintInfo: Promise<MintInfoResponse>;
        burns: Promise<BurnTx[]>;
        networkStatus: Promise<NetworkStatus>;
    };

    return (
        <Suspense fallback={<BlockPageLoading />}>
            <Await resolve={Promise.all([blockContents, mintInfo, burns, networkStatus])}>
                {(promised) => {
                    return (
                        <BlockPageLoaded
                            blockContents={promised[0]}
                            mintInfo={promised[1]}
                            burns={promised[2]}
                            networkStatus={promised[3]}
                        />
                    );
                }}
            </Await>
        </Suspense>
    );
}

function BlockPageLoading() {
    const { blockIndex } = useParams();
    return (
        <Container>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="h4">Block {blockIndex}</Typography>
            </Box>
        </Container>
    );
}

function BlockPageLoaded({
    blockContents,
    mintInfo,
    burns,
    networkStatus
}: {
    blockContents: Block;
    mintInfo: MintInfoResponse;
    burns: BurnTx[];
    networkStatus: NetworkStatus;
}) {
    // const { networkStatus } = useSyncData();
    // const { blockContents, mintInfo, burns, networkStatus } = useLoaderData() as {
    //     blockContents: Block;
    //     mintInfo: MintInfoResponse;
    //     burns: BurnTx[];
    //     networkStatus: NetworkStatus;
    // };

    const isPrevDisabled = Number(blockContents.index) === 0;
    const isNextDisabled =
        Number(networkStatus.networkBlockHeight) <= Number(blockContents.index) + 1;

    return (
        <Container>
            <Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="h4">Block {blockContents.index}</Typography>
                    <Typography color="text.secondary">{getTimeStamp(blockContents)}</Typography>
                    <CopyableField text={blockContents.contentsHash} />
                </Box>
                <Box sx={{ display: "flex" }}>
                    {isPrevDisabled ? (
                        <div />
                    ) : (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: 0, marginRight: 1 }}
                            component={Link}
                            to={`/blocks/${Number(blockContents.index) - 1}`}
                        >
                            <NavigateBeforeIcon color="primary" fontSize="small" />
                        </Button>
                    )}
                    {isNextDisabled ? (
                        <div />
                    ) : (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: 0 }}
                            component={Link}
                            to={`/blocks/${Number(blockContents.index) + 1}`}
                        >
                            <NavigateNextIcon color="primary" fontSize="small" />
                        </Button>
                    )}
                </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={2}>
                    <Txos blockContents={blockContents} burns={burns} />
                    <KeyImages blockContents={blockContents} />
                    <Mints mintInfo={mintInfo} />
                    <MintConfigTxs mintInfo={mintInfo} />
                    <Signatures blockContents={blockContents} />
                </Grid>
            </Box>
        </Container>
    );
}
