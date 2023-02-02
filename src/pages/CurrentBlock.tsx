import { useLoaderData } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";

import { Block, MintInfoResponse } from "api/types";
import Page from "components/Page";
import { getTimeStamp } from "components/BlockRow";
import { TOKENS } from "utils/tokens";
import CopyableField from "components/copyableField";

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: "none",
    backgroundColor: "inherit"
}));

export default function BlockPage() {
    const { blockContents, mintInfo } = useLoaderData() as {
        blockContents: Block;
        mintInfo: MintInfoResponse;
    };

    return (
        <Page>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 4
                }}
            >
                <Box>
                    <Typography variant="h4">Block {blockContents.index}</Typography>
                    <Typography color="text.secondary">{blockContents.contentsHash}</Typography>
                </Box>
                <Typography color="text.secondary">{getTimeStamp(blockContents)}</Typography>
            </Box>

            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Transaction Outputs
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>TXO Pubkey</TableCell>
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
                                        <TableCell>{k}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>

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
                                {(blockContents.signatures ?? []).map((sig) => (
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

            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mints
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Nonce</TableCell>
                                    <TableCell>Recipient Address</TableCell>
                                    <TableCell>Config Limit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mintInfo.mintTxs.map(({ mintTx, mintConfig }) => (
                                    <TableRow key={mintTx.nonceHex}>
                                        <TableCell>{mintTx.amount}</TableCell>
                                        <TableCell>{TOKENS[mintTx.tokenId]}</TableCell>
                                        <TableCell>
                                            <CopyableField text={mintTx.nonceHex} />
                                        </TableCell>
                                        <TableCell>
                                            <CopyableField text={mintTx.recipientB58Addr} />
                                        </TableCell>
                                        <TableCell>{mintConfig.mintLimit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Page>
    );
}
