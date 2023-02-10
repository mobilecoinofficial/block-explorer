import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Grid
} from "@mui/material";
import { StyledCard } from "pages/CurrentBlock";
import { Block } from "api/types";
import CopyableField from "components/CopyableField";

// handle full-service tech debt
function removeProtoBuffFromKeyImage(keyImage: string) {
    const protoBuffPrefix = /^0a20/;
    if (keyImage.match(protoBuffPrefix) && keyImage.length === 68) {
        return keyImage.slice(4);
    }
    return keyImage;
}

export default function KeyImages({ blockContents }: { blockContents: Block }) {
    if (!blockContents.keyImages.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
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
                                        <TableCell>
                                            <CopyableField text={removeProtoBuffFromKeyImage(k)} />
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
