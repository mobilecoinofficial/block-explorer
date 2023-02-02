import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import { StyledCard } from "pages/CurrentBlock";
import { Block } from "api/types";

// handle full-service tech debt
function removeProtoBuffFromKeyImage(keyImage: string) {
    const protoBuffPrefix = /^0a20/;
    if (keyImage.match(protoBuffPrefix) && keyImage.length === 68) {
        return keyImage.slice(4);
    }
    return keyImage;
}

export default function KeyImages({ blockContents }: { blockContents: Block }) {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Key Images
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {blockContents.keyImages.map((k) => (
                                <TableRow key={k}>
                                    <TableCell>{removeProtoBuffFromKeyImage(k)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    );
}
