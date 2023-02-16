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

export default function Mints({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintTxs.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mints
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Nonce</TableCell>
                                    <TableCell>Recipient Address</TableCell>
                                    <TableCell>Mint Config</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mintInfo.mintTxs.map(({ mintTx, mintConfig }) => (
                                    <TableRow key={mintTx.nonceHex}>
                                        <StyledCell>
                                            {getTokenAmount(mintTx.tokenId, mintTx.amount)}
                                        </StyledCell>
                                        <StyledCell>{TOKENS[mintTx.tokenId].name}</StyledCell>
                                        <StyledCell>
                                            <CopyableField text={mintTx.nonceHex} />
                                        </StyledCell>
                                        <StyledCell>
                                            <CopyableField text={mintTx.recipientB58Addr} />
                                        </StyledCell>
                                        <StyledCell>
                                            <MintConfig config={mintConfig} />
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
