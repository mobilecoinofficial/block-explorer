import { useParams } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

import Page from "components/Page";

export default function NoBlockFound() {
    const { blockIndex } = useParams();
    return (
        <Page>
            <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight={400}
            >
                <Typography variant="h5"> No block with index {blockIndex} found.</Typography>
                <Link href="/blocks">return to recent blocks</Link>
            </Box>
        </Page>
    );
}
