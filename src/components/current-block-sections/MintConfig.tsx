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

const StyledAccordion = styled(Accordion)(() => ({
    boxShadow: "none"
}));

export default function MintConfig({ config }: { config: MintConfig }) {
    return (
        <StyledAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Mint Config</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <Box display="flex" justifyContent={"space-between"} sx={{ marginBottom: 1 }}>
                        <Typography color="text.secondary">Limit:</Typography>
                        <Typography>{config.mintLimit.toLocaleString("en-US")}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent={"space-between"} sx={{ marginTop: 1 }}>
                        <Typography color="text.secondary">Signers</Typography>
                        <Box>
                            {config.signerSet.signers.map((s) => (
                                <CopyableField text={base64PEMEncode(s)} key={base64PEMEncode(s)} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </AccordionDetails>
        </StyledAccordion>
    );
}
