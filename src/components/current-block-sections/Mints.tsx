import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    CardContent,
    Table,
    TableHead,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Grid,
    Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { StyledCard, StyledCell } from "pages/CurrentBlock";
import { MintInfoResponse } from "api/types";
import { TOKENS, getTokenAmount } from "utils/tokens";
import CopyableField from "components/CopyableField";
import { base64PEMEncode } from "utils/bytesToPEM";
import { openConfigIdParamName } from "components/current-block-sections/MintConfig";

export const StyledAccordion = styled(Accordion)(() => ({
    boxShadow: "none"
}));

export const TableCellContents = styled(Box)(() => ({
    height: 36,
    display: "flex",
    alignItems: "center"
}));

export default function Mints({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintTxs.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mints
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Nonce</TableCell>
                                    <TableCell>Recipient Address</TableCell>
                                    <TableCell>Signers</TableCell>
                                    <TableCell>Mint Config</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mintInfo.mintTxs.map(
                                    ({ mintTx, mintConfig, mintTxSigners, mintConfigTx }) => (
                                        <TableRow
                                            key={mintTx.nonceHex}
                                            sx={{ verticalAlign: "top" }}
                                        >
                                            <StyledCell>
                                                <TableCellContents>
                                                    {getTokenAmount(mintTx.tokenId, mintTx.amount)}
                                                </TableCellContents>
                                            </StyledCell>
                                            <StyledCell>
                                                <TableCellContents>
                                                    {TOKENS[mintTx.tokenId].name}
                                                </TableCellContents>
                                            </StyledCell>
                                            <StyledCell>
                                                <CopyableField text={mintTx.nonceHex} />
                                            </StyledCell>
                                            <StyledCell>
                                                <CopyableField text={mintTx.recipientB58Addr} />
                                            </StyledCell>
                                            <StyledCell>
                                                <StyledAccordion disableGutters>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        sx={{ minHeight: 0, height: 36 }}
                                                    >
                                                        <Typography>Signers</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box>
                                                            <Box
                                                                display="flex"
                                                                justifyContent={"space-between"}
                                                                sx={{ marginTop: 1 }}
                                                            >
                                                                <Box>
                                                                    {mintTxSigners
                                                                        .sort()
                                                                        .map((s) => (
                                                                            <CopyableField
                                                                                text={base64PEMEncode(
                                                                                    s
                                                                                )}
                                                                                key={base64PEMEncode(
                                                                                    s
                                                                                )}
                                                                            />
                                                                        ))}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </AccordionDetails>
                                                </StyledAccordion>
                                            </StyledCell>
                                            <StyledCell>
                                                <TableCellContents>
                                                    <Link
                                                        to={`/blocks/${mintConfigTx.blockIndex}?${openConfigIdParamName}=${mintConfig.id}`}
                                                        style={{
                                                            color: "black"
                                                        }}
                                                    >
                                                        Block {mintConfigTx.blockIndex}
                                                    </Link>
                                                </TableCellContents>
                                            </StyledCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Grid>
    );
}
