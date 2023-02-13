import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Grid
} from "@mui/material";
import moment from "moment";

import { StyledCard } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block } from "api/types";

function stripNodeURl(url: string): string {
    // anything following the first instance of .com/ and string trailing /
    const nodeText = /(?<=\.com\/)(.*)(?=\/)/;
    const match = url.match(nodeText);
    return match ? match[0] : url;
}

export default function signatures({ blockContents }: { blockContents: Block }) {
    if (!blockContents.signatures?.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Signatures
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>URL</TableCell>
                                    <TableCell>Signer</TableCell>
                                    <TableCell>Signature</TableCell>
                                    <TableCell>Timestamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blockContents.signatures.map((sig) => (
                                    <TableRow key={sig.blockSignature.signature}>
                                        <TableCell>{stripNodeURl(sig.srcUrl)}</TableCell>
                                        <TableCell>
                                            <CopyableField text={sig.blockSignature.signer} />
                                        </TableCell>
                                        <TableCell>
                                            <CopyableField text={sig.blockSignature.signature} />
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                parseInt(sig.blockSignature.signedAt) * 1000
                                            ).format("MMM D YYYY, h:mm:ss A")}
                                        </TableCell>
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
