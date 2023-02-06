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
import moment from "moment";

import { StyledCard, None } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block } from "api/types";

export default function signatures({ blockContents }: { blockContents: Block }) {
    if (!blockContents.signatures?.length) {
        return <None title="Signatures" />;
    }

    return (
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
                                    <TableCell>{sig.srcUrl}</TableCell>
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
    );
}