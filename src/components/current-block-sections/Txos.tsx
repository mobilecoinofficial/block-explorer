import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import { StyledCard } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block } from "api/types";

export default function Txos({ blockContents }: { blockContents: Block }) {
    if (!blockContents.outputs.length) {
        return null;
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Transaction Outputs
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>TXO Public Key</TableCell>
                                <TableCell>Target Address</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blockContents.outputs.map((txout) => (
                                <TableRow key={txout.publicKey}>
                                    <TableCell>{txout.publicKey}</TableCell>
                                    <TableCell>
                                        <CopyableField text={txout.targetKey} />
                                    </TableCell>
                                    <TableCell>
                                        {txout.maskedAmount ? (
                                            <CopyableField
                                                text={txout.maskedAmount.maskedValue.toString()}
                                            />
                                        ) : (
                                            "not available"
                                        )}
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
