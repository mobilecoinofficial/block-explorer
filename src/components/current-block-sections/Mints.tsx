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

import { StyledCard, None } from "pages/CurrentBlock";
import { MintInfoResponse } from "api/types";
import { TOKENS, getTokenAmount } from "utils/tokens";
import CopyableField from "components/CopyableField";
import MintConfig from "components/current-block-sections/MintConfig";

export default function Mints({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintTxs.length) {
        return <None title="Mints" />;
    }

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
                                <TableCell>Mint Config</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mintInfo.mintTxs.map(({ mintTx, mintConfig }) => (
                                <TableRow key={mintTx.nonceHex}>
                                    <TableCell>
                                        {getTokenAmount(mintTx.tokenId, mintTx.amount)}
                                    </TableCell>
                                    <TableCell>{TOKENS[mintTx.tokenId].name}</TableCell>
                                    <TableCell>
                                        <CopyableField text={mintTx.nonceHex} />
                                    </TableCell>
                                    <TableCell>
                                        <CopyableField text={mintTx.recipientB58Addr} />
                                    </TableCell>
                                    <TableCell>
                                        <MintConfig config={mintConfig} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    );
}
