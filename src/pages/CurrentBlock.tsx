import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Typography, Card, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { Block, BurnTx, MintInfoResponse } from "api/types";
import Page from "components/Page";
import { getTimeStamp } from "components/BlockRow";
import Txos from "components/current-block-sections/Txos";
import KeyImages from "components/current-block-sections/KeyImages";
import Signatures from "components/current-block-sections/Signatures";
import Mints from "components/current-block-sections/Mints";
import MintConfigTxs from "components/current-block-sections/MintConfigTxs";
import CopyableField from "components/CopyableField";
import { useSyncData } from "./Layout";

export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: "none",
    backgroundColor: "inherit"
}));

export default function BlockPage() {
    const navigate = useNavigate();
    const { networkStatus } = useSyncData();
    const { blockContents, mintInfo, burns } = useLoaderData() as {
        blockContents: Block;
        mintInfo: MintInfoResponse;
        burns: BurnTx[];
    };

    const isPrevDisabled = Number(blockContents.index) === 0;
    function goPrevious() {
        navigate(`/blocks/${Number(blockContents.index) - 1}`);
    }
    const isNextDisabled =
        Number(networkStatus.networkBlockHeight) <= Number(blockContents.index) + 1;
    function goNext() {
        navigate(`/blocks/${Number(blockContents.index) + 1}`);
    }

    return (
        <Page>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 1
                }}
            >
                <Box>
                    <Typography variant="h4">Block {blockContents.index}</Typography>
                    <Typography color="text.secondary">{getTimeStamp(blockContents)}</Typography>
                    <CopyableField text={blockContents.contentsHash} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4
                }}
            >
                <Box
                    sx={{ cursor: "pointer" }}
                    display="flex"
                    alignItems="center"
                    onClick={goPrevious}
                >
                    {isPrevDisabled ? (
                        <div />
                    ) : (
                        <>
                            <NavigateBeforeIcon color="primary" />
                            <Link underline="none" color="primary">
                                Previous Block
                            </Link>
                        </>
                    )}
                </Box>
                <Box
                    sx={{ cursor: "pointer" }}
                    display={isNextDisabled ? "none" : "flex"}
                    alignItems="center"
                    onClick={goNext}
                >
                    <Link underline="none">Next Block</Link>
                    <NavigateNextIcon color="primary" />
                </Box>
            </Box>
            <Txos blockContents={blockContents} burns={burns} />
            <KeyImages blockContents={blockContents} />
            <Mints mintInfo={mintInfo} />
            <MintConfigTxs mintInfo={mintInfo} />
            <Signatures blockContents={blockContents} />
        </Page>
    );
}
