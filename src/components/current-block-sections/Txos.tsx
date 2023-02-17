import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Grid,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { StyledCard, StyledCell } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block, BurnTx, TxOut } from "api/types";
import { getTokenAmount, TOKENS } from "utils/tokens";

export default function Txos({ blockContents, burns }: { blockContents: Block; burns: BurnTx[] }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    if (!blockContents.outputs.length) {
        return null;
    }

    function RenderOutput({ txout }: { txout: TxOut }) {
        const matchingBurn = burns.find((burn) => burn.publicKeyHex === txout.publicKey);

        if (matchingBurn) {
            return (
                <TableRow>
                    <StyledCell>
                        <CopyableField text={txout.publicKey} abbreviate={matches} />
                    </StyledCell>
                    <StyledCell>
                        <Typography>Burn</Typography>
                    </StyledCell>
                    <StyledCell>
                        <>
                            {getTokenAmount(matchingBurn.tokenId, matchingBurn.amount)}
                            &nbsp;
                            {TOKENS[matchingBurn.tokenId].name}
                        </>
                    </StyledCell>
                </TableRow>
            );
        }

        return (
            <TableRow>
                <StyledCell>
                    <CopyableField text={txout.publicKey} abbreviate={matches} />
                </StyledCell>
                <StyledCell>
                    <CopyableField text={txout.targetKey} />
                </StyledCell>
                <StyledCell>
                    {txout.maskedAmount ? (
                        <CopyableField text={txout.maskedAmount.maskedValue.toString()} />
                    ) : (
                        "not available"
                    )}
                </StyledCell>
            </TableRow>
        );
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Transaction Outputs
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>TXO Public Key</TableCell>
                                    <TableCell>Target Address</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blockContents.outputs.map((txout) => (
                                    <RenderOutput txout={txout} key={txout.publicKey} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Grid>
    );
}
