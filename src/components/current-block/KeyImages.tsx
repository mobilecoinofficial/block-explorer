import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    Grid,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { StyledCard, StyledCell } from "components/current-block/CurrentBlock";
import { Block } from "api/types";
import CopyableField from "components/CopyableField";
import { highlightColor } from "theme";

// handle full-service tech debt
function removeProtoBuffFromKeyImage(keyImage: string) {
    const protoBuffPrefix = /^0a20/;
    if (keyImage.match(protoBuffPrefix) && keyImage.length === 68) {
        return keyImage.slice(4);
    }
    return keyImage;
}

export default function KeyImages({
    blockContents,
    highlightItem
}: {
    blockContents: Block;
    highlightItem: string;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

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
                        <Table size="small" padding="none">
                            <TableBody>
                                {blockContents.keyImages.map((k) => (
                                    <TableRow
                                        key={k}
                                        sx={{
                                            bgcolor:
                                                highlightItem === k ? highlightColor : "inherit"
                                        }}
                                    >
                                        <StyledCell>
                                            <CopyableField
                                                text={removeProtoBuffFromKeyImage(k)}
                                                abbreviate={matches}
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
