import { useLoaderData } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Block, BurnTx, MintInfoResponse } from "api/types";
import Page from "components/Page";
import { getTimeStamp } from "components/BlockRow";
import Txos from "components/current-block-sections/Txos";
import KeyImages from "components/current-block-sections/KeyImages";
import Signatures from "components/current-block-sections/Signatures";
import Mints from "components/current-block-sections/Mints";
import MintConfigTxs from "components/current-block-sections/MintConfigTxs";
import Burns from "components/current-block-sections/Burns";

export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: "none",
    backgroundColor: "inherit"
}));

export function None({ title }: { title: string }) {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>None</Typography>
            </CardContent>
        </StyledCard>
    );
}

export default function BlockPage() {
    const { blockContents, mintInfo, burns } = useLoaderData() as {
        blockContents: Block;
        mintInfo: MintInfoResponse;
        burns: BurnTx[];
    };

    return (
        <Page>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 4
                }}
            >
                <Box>
                    <Typography variant="h4">Block {blockContents.index}</Typography>
                    <Typography color="text.secondary">{getTimeStamp(blockContents)}</Typography>
                </Box>
                <Box display="flex">
                    <Typography sx={{ marginRight: 1 }}>Hash:</Typography>
                    <Typography color="text.secondary">{blockContents.contentsHash}</Typography>
                </Box>
            </Box>
            <Txos blockContents={blockContents} />
            <KeyImages blockContents={blockContents} />
            <Signatures blockContents={blockContents} />
            <Mints mintInfo={mintInfo} />
            <MintConfigTxs mintInfo={mintInfo} />
            <Burns burns={burns} />
        </Page>
    );
}
