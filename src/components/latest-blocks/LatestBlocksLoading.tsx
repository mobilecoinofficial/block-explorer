import { Container, Skeleton, Box } from "@mui/material";

import TopContent from "components/latest-blocks/TopContent";
import { useNetworkStatus } from "pages/Layout";
import { getTableHeightToSubtract } from "components/latest-blocks/LatestBlocksLoaded";

export default function LatestBlocksLoading() {
    const tableHeightToSubtract = getTableHeightToSubtract(true);
    const networkStatus = useNetworkStatus();
    return (
        <Container>
            <TopContent networkStatus={networkStatus} />
            <Skeleton
                animation="wave"
                component={Box}
                sx={{
                    transform: "none",
                    bgcolor: "white",
                    border: "1px solid #cecece",
                    height: `calc(100vh - ${tableHeightToSubtract}px)`
                }}
            />
        </Container>
    );
}
