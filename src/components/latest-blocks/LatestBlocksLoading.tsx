import { Container, Skeleton, Box } from "@mui/material";

import TopContent from "components/latest-blocks/TopContent";
import { useNetworkStatus } from "pages/Layout";

export default function LatestBlocksLoading() {
    const networkStatus = useNetworkStatus();
    return (
        <Container>
            <TopContent networkStatus={networkStatus} />
            <Skeleton
                animation="wave"
                component={Box}
                height={"100vh"}
                sx={{ top: "-200px", bgcolor: "white", border: "1px solid #cecece" }}
            />
        </Container>
    );
}
