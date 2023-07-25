import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    Tooltip,
    Button,
    Grid,
    Container,
    TableCell,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { getTimeStamp } from "components/latest-blocks/BlockRow";
import Txos from "components/current-block/Txos";
import KeyImages from "components/current-block/KeyImages";
import Signatures from "components/current-block/Signatures";
import Mints from "components/current-block/Mints";
import MintConfigTxs from "components/current-block/MintConfigTxs";
import CopyableField from "components/CopyableField";
import { useNetworkStatus } from "pages/Layout";
import { BlockInfo } from "pages/CurrentBlock";

export const StyledCard = styled(Card)(() => ({
    boxShadow: "none",
    border: "1px solid #cecece",
    height: "100%"
}));

export const StyledCell = styled(TableCell)(() => ({
    border: "none"
}));

export default function CurrentBlock({ blockContents, mintInfo, burns, highlightItem }: BlockInfo) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const networkStatus = useNetworkStatus();
    const isPrevDisabled = Number(blockContents.index) === 0;
    const isNextDisabled =
        Number(networkStatus.networkBlockHeight) <= Number(blockContents.index) + 1;

    return (
        <Container>
            <Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="h4">Block {blockContents.index}</Typography>
                    <Typography color="text.secondary">{getTimeStamp(blockContents)}</Typography>
                    <CopyableField text={blockContents.id} name="Id" abbreviate={matches} />
                </Box>
                <Box sx={{ display: "flex" }}>
                    {isPrevDisabled ? (
                        <div />
                    ) : (
                        <Tooltip title="Prev block">
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 0, marginRight: 1 }}
                                component={Link}
                                to={`/blocks/${Number(blockContents.index) - 1}`}
                            >
                                <NavigateBeforeIcon color="primary" fontSize="small" />
                            </Button>
                        </Tooltip>
                    )}
                    {isNextDisabled ? (
                        <div />
                    ) : (
                        <Tooltip title="Next block">
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 0 }}
                                component={Link}
                                to={`/blocks/${Number(blockContents.index) + 1}`}
                            >
                                <NavigateNextIcon color="primary" fontSize="small" />
                            </Button>
                        </Tooltip>
                    )}
                </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={2}>
                    <Txos
                        blockContents={blockContents}
                        burns={burns}
                        highlightItem={highlightItem}
                    />
                    <KeyImages blockContents={blockContents} highlightItem={highlightItem} />
                    <Mints mintInfo={mintInfo} />
                    <MintConfigTxs mintInfo={mintInfo} />
                    <Signatures blockContents={blockContents} />
                </Grid>
            </Box>
        </Container>
    );
}
