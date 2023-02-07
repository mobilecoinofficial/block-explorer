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
import { BurnTx } from "api/types";
import { TOKENS, getTokenAmount } from "utils/tokens";
import CopyableField from "components/CopyableField";

export default function Burns({ burns }: { burns: BurnTx[] }) {
    if (!burns.length) {
        return null;
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Burns
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>Token</TableCell>
                                <TableCell>Public Key</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {burns.map((burn) => (
                                <TableRow key={burn.publicKeyHex}>
                                    <TableCell>
                                        {getTokenAmount(burn.tokenId, burn.amount)}
                                    </TableCell>
                                    <TableCell>{TOKENS[burn.tokenId].name}</TableCell>
                                    <TableCell>
                                        <CopyableField text={burn.publicKeyHex} />
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
