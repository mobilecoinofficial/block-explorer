import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Divider,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CopyableField from "components/CopyableField";
import { base64PEMEncode } from "utils/bytesToPEM";
import { MintConfig } from "api/types";
import { getTokenAmount } from "utils/tokens";

const StyledAccordion = styled(Accordion)(() => ({
    boxShadow: "none"
}));

export default function MintConfig({ config }: { config: MintConfig }) {
    const sortedSigs = config.signerSet.signers.sort();

    return (
        <StyledAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Mint Config</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <Box display="flex" justifyContent={"space-between"} sx={{ marginBottom: 1 }}>
                        <Typography color="text.secondary">Limit:</Typography>
                        <Typography>{getTokenAmount(config.tokenId, config.mintLimit)}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent={"space-between"} sx={{ marginTop: 1 }}>
                        <Typography color="text.secondary">Signers</Typography>
                        <Box>
                            {sortedSigs.map((s) => (
                                <CopyableField text={base64PEMEncode(s)} key={base64PEMEncode(s)} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </AccordionDetails>
        </StyledAccordion>
    );
}
