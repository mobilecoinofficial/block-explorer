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
import { BurnTx } from "api/types";
import { TOKENS } from "utils/tokens";
import CopyableField from "components/CopyableField";

export default function Burns({ burns }: { burns: BurnTx[] }) {
    if (!burns.length) {
        return <None title="Burns" />;
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
                                    <TableCell>{burn.amount}</TableCell>
                                    <TableCell>{TOKENS[burn.tokenId]}</TableCell>
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
