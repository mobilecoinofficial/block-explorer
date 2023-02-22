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

import { StyledCard, StyledCell } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block } from "api/types";
import CollapsableDate from "components/CollapsableDate";

function stripNodeURl(url: string): string {
    // remove https:// and trailing /
    const urlPrefix = /[^(https://)](.*)[^.net/$|.com/$]/;
    const match = url.match(urlPrefix);
    return match ? match[0] : url;
    // const strippedUrl = match ? match[0] : url;
    // return truncate(strippedUrl, 16);
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
                        <Table size="small">
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
                                        <StyledCell>
                                            <CopyableField text={stripNodeURl(sig.srcUrl)} />
                                        </StyledCell>
                                        <StyledCell>
                                            <CopyableField text={sig.blockSignature.signer} />
                                        </StyledCell>
                                        <StyledCell>
                                            <CopyableField text={sig.blockSignature.signature} />
                                        </StyledCell>
                                        <StyledCell>
                                            <CollapsableDate
                                                date={
                                                    new Date(
                                                        parseInt(sig.blockSignature.signedAt) * 1000
                                                    )
                                                }
                                            />
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
