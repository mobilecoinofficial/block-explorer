import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";

import { abbreviateHash } from "utils/truncate";

export default function CopyableField({
    text,
    abbreviate = true
}: {
    text: string;
    abbreviate?: boolean;
}) {
    function copyToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
    }

    const renderedText = abbreviate ? abbreviateHash(text) : text;
    const width = abbreviate ? 90 : null;

    return (
        <Box display="flex" alignItems="center">
            <Typography sx={{ fontSize: 14, width }}>{renderedText}</Typography>
            <Tooltip title={`Copy ${text} to clipboard`}>
                <IconButton onClick={copyToClipboard}>
                    <ContentCopyIcon
                        sx={{ cursor: "pointer", color: "text.secondary" }}
                        fontSize="small"
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
