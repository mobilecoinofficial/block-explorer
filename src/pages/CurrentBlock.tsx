import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Typography, Card, Tooltip, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { Block, BurnTx, MintInfoResponse } from "api/types";
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
        <Container>
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
                    marginBottom: 4
                }}
            >
                {isPrevDisabled ? (
                    <div />
                ) : (
                    <Tooltip title="Previous Block">
                        <Button
                            onClick={goPrevious}
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: 0, marginRight: 1 }}
                        >
                            <NavigateBeforeIcon color="primary" fontSize="small" />
                        </Button>
                    </Tooltip>
                )}
                {isNextDisabled ? (
                    <div />
                ) : (
                    <Tooltip title="Next Block">
                        <Button
                            onClick={goNext}
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: 0 }}
                        >
                            <NavigateNextIcon color="primary" fontSize="small" />
                        </Button>
                    </Tooltip>
                )}
            </Box>
            <Txos blockContents={blockContents} burns={burns} />
            <KeyImages blockContents={blockContents} />
            <Mints mintInfo={mintInfo} />
            <MintConfigTxs mintInfo={mintInfo} />
            <Signatures blockContents={blockContents} />
        </Container>
    );
}
