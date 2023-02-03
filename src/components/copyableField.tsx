import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, Box, Tooltip } from "@mui/material";

import { abbreviateHash } from "utils/truncate";

export default function CopyableField({ text }: { text: string }) {
    function copyToClipboard() {
        navigator.clipboard.writeText(text);
    }

    return (
        <Box display="flex">
            <Typography style={{ width: 108 }}>{abbreviateHash(text)}</Typography>
            <Tooltip title={`Copy ${text} to clipboard`}>
                <ContentCopyIcon
                    sx={{ cursor: "pointer", color: "text.secondary" }}
                    fontSize="small"
                    onClick={copyToClipboard}
                />
            </Tooltip>
        </Box>
    );
}
