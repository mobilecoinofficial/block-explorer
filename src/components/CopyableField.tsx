import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";

import { abbreviateHash } from "utils/truncate";

export default function CopyableField({ text }: { text: string }) {
    function copyToClipboard(e: React.MouseEvent<SVGSVGElement>) {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
    }

    return (
        <Box display="flex" justifyContent="space-between" sx={{ width: 120 }} alignItems="center">
            <Typography sx={{ fontSize: 14 }}>{abbreviateHash(text)}</Typography>
            <Tooltip title={`Copy ${text} to clipboard`}>
                <IconButton>
                    <ContentCopyIcon
                        sx={{ cursor: "pointer", color: "text.secondary" }}
                        fontSize="small"
                        onClick={copyToClipboard}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
