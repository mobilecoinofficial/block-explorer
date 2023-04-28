import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionSummary, AccordionDetails, Box, Divider, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CopyableField from "components/CopyableField";
import { base64PEMEncode } from "utils/bytesToPEM";
import { MintConfig, SignerSet } from "api/types";
import { getTokenAmount } from "utils/tokens";
import { StyledAccordion } from "components/current-block/Mints";

export const openConfigIdParamName = "open_config_ids[]";

export function extractSigners(signerSet: SignerSet): number[][] {
    const allSigners: number[][] = [...signerSet.individualSigners];

    for (const multiSignerSet of signerSet.multiSigners) {
        allSigners.push(...extractSigners(multiSignerSet));
    }

    return allSigners;
}

export default function MintConfig({ config }: { config: MintConfig }) {
    console.log(config);
    const [params, setParams] = useSearchParams();
    const openConfigIds = params.getAll(`${openConfigIdParamName}`) ?? [];
    const signerThreshold = config.signerSet.multiSigners.length
        ? "Hierarchical"
        : config.signerSet.threshold;

    const handleChange = (id: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded) {
            params.append(openConfigIdParamName, `${id}`);
        } else {
            const newIds = openConfigIds.filter((oid) => oid !== `${id}`);
            params.delete(openConfigIdParamName);
            for (const newId of newIds) {
                params.append(openConfigIdParamName, newId);
            }
        }
        setParams(params);
    };

    return (
        <StyledAccordion
            expanded={openConfigIds.includes(`${config.id}`)}
            onChange={handleChange(config.id)}
            disableGutters
            sx={{ width: 250 }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ minHeight: 0, height: 36, paddingLeft: 0 }}
            >
                <Typography>Config {config.id}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: 0 }}>
                <Box>
                    <Box display="flex" sx={{ marginBottom: 1 }}>
                        <Typography color="text.secondary" sx={{ width: 80 }}>
                            Limit:
                        </Typography>
                        <Typography>{getTokenAmount(config.tokenId, config.mintLimit)}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" sx={{ marginTop: 1 }}>
                        <Typography color="text.secondary" sx={{ width: 80 }}>
                            Signers
                        </Typography>
                        <Box>
                            {extractSigners(config.signerSet).map((s) => (
                                <CopyableField text={base64PEMEncode(s)} key={base64PEMEncode(s)} />
                            ))}
                        </Box>
                    </Box>
                    <Box display="flex" sx={{ marginTop: 1 }}>
                        <Typography color="text.secondary" sx={{ width: 80 }}>
                            Threshold
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" sx={{ width: "50%" }}>
                            <Typography>{signerThreshold}</Typography>
                        </Box>
                    </Box>
                </Box>
            </AccordionDetails>
        </StyledAccordion>
    );
}
