import {
    Typography,
    CardContent,
    Table,
    TableHead,
    TableContainer,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";

import { StyledCard } from "pages/CurrentBlock";
import { MintInfoResponse } from "api/types";
import { TOKENS } from "utils/tokens";
import CopyableField from "components/CopyableField";

export default function Mints({ mintInfo }: { mintInfo: MintInfoResponse }) {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Mints
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>Token</TableCell>
                                <TableCell>Nonce</TableCell>
                                <TableCell>Recipient Address</TableCell>
                                <TableCell>Config Limit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mintInfo.mintTxs.map(({ mintTx, mintConfig }) => (
                                <TableRow key={mintTx.nonceHex}>
                                    <TableCell>{mintTx.amount}</TableCell>
                                    <TableCell>{TOKENS[mintTx.tokenId]}</TableCell>
                                    <TableCell>
                                        <CopyableField text={mintTx.nonceHex} />
                                    </TableCell>
                                    <TableCell>
                                        <CopyableField text={mintTx.recipientB58Addr} />
                                    </TableCell>
                                    <TableCell>{mintConfig.mintLimit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    );
}
