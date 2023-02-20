import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionSummary, AccordionDetails, Box, Divider, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CopyableField from "components/CopyableField";
import { base64PEMEncode } from "utils/bytesToPEM";
import { MintConfig } from "api/types";
import { getTokenAmount } from "utils/tokens";
import { StyledAccordion } from "components/current-block-sections/Mints";

export const openConfigIdParamName = "open_config_ids";

export default function MintConfig({ config }: { config: MintConfig }) {
    const sortedSigs = config.signerSet.signers.sort();
    const [params, setParams] = useSearchParams();
    const openConfigIds = params.getAll(`${openConfigIdParamName}[]`) ?? [];

    const handleChange = (id: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded) {
            params.append(`${openConfigIdParamName}[]`, `${id}`);
            setParams(params);
        } else {
            const newIds = openConfigIds.filter((oid) => oid !== `${id}`);
            params.delete(`${openConfigIdParamName}[]`);
            if (newIds.length) {
                for (const newId of newIds) {
                    params.append(`${openConfigIdParamName}[]`, `${newId}`);
                }
            }
        }
        setParams(params);
    };

    return (
        <StyledAccordion
            expanded={openConfigIds.includes(`${config.id}`) ?? false}
            onChange={handleChange(config.id)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 0, height: 36 }}>
                <Typography>Config {config.id}</Typography>
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
