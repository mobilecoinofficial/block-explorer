import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";

import { SyncData } from "components/SyncStatus";
import Header from "components/Header";

export default function Layout() {
    // const syncData = useLoaderData() as SyncData;
    return (
        <Container maxWidth="xl">
            <Header />
            <Toolbar />
            <Box paddingTop={2}>
                <Outlet />
            </Box>
        </Container>
    );
}

export function useSyncData() {
    return useOutletContext<SyncData>();
}
