import {
    Typography,
    CardContent,
    Table,
    TableHead,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Grid
} from "@mui/material";

import { StyledCard, StyledCell } from "pages/CurrentBlock";
import { MintInfoResponse } from "api/types";
import { TOKENS } from "utils/tokens";
import CopyableField from "components/CopyableField";
import MintConfig from "components/current-block-sections/MintConfig";

export default function MintConfigTxs({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintConfigTxs.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mint Config Txs
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mint Limit</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Nonce</TableCell>
                                    <TableCell>Mint Configs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mintInfo.mintConfigTxs.map((mintConfigTx) => (
                                    <TableRow key={mintConfigTx.mintConfigTx.nonceHex}>
                                        <StyledCell>
                                            {mintConfigTx.mintConfigTx.totalMintLimit.toLocaleString(
                                                "en-US"
                                            )}
                                        </StyledCell>
                                        <StyledCell>
                                            {TOKENS[mintConfigTx.mintConfigTx.tokenId].name}
                                        </StyledCell>
                                        <StyledCell>
                                            <CopyableField
                                                text={mintConfigTx.mintConfigTx.nonceHex}
                                            />
                                        </StyledCell>
                                        <StyledCell>
                                            {mintConfigTx.mintConfigs.map((config, i) => (
                                                <MintConfig
                                                    config={config}
                                                    key={`configTxconfig-${i}`}
                                                />
                                            ))}
                                        </StyledCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Grid>
    );
}
