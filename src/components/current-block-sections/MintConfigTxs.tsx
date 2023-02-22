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
import { TOKENS, getTokenAmount } from "utils/tokens";
import CopyableField from "components/CopyableField";
import MintConfig from "components/current-block-sections/MintConfig";
import { TableCellContents } from "components/current-block-sections/Mints";

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
                        <Table size="small" padding="none">
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
                                    <TableRow
                                        key={mintConfigTx.mintConfigTx.nonceHex}
                                        sx={{ verticalAlign: "top" }}
                                    >
                                        <StyledCell>
                                            <TableCellContents>
                                                {getTokenAmount(
                                                    mintConfigTx.mintConfigTx.tokenId,
                                                    mintConfigTx.mintConfigTx.totalMintLimit
                                                )}
                                            </TableCellContents>
                                        </StyledCell>
                                        <StyledCell>
                                            <TableCellContents>
                                                {TOKENS[mintConfigTx.mintConfigTx.tokenId].name}
                                            </TableCellContents>
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
