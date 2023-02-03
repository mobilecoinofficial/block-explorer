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
import { TOKENS } from "utils/tokens";
import CopyableField from "components/CopyableField";

export default function MintConfigTxs({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintConfigTxs.length) {
        return <None title="Mint Config Txs" />;
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Mint Config Txs
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mint Limit</TableCell>
                                <TableCell>Token</TableCell>
                                <TableCell>Nonce</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mintInfo.mintConfigTxs.map((mintConfigTx) => (
                                <TableRow key={mintConfigTx.nonceHex}>
                                    <TableCell>{mintConfigTx.totalMintLimit}</TableCell>
                                    <TableCell>{TOKENS[mintConfigTx.tokenId]}</TableCell>
                                    <TableCell>
                                        <CopyableField text={mintConfigTx.nonceHex} />
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
