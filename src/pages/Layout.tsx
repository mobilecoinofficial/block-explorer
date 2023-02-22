import { Suspense } from "react";
import { Outlet, useLoaderData, useOutletContext, Await } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";

import { SyncData } from "components/SyncStatus";
import Header from "components/Header";
import { NetworkStatus } from "api/types";
import BlocksLoadingPage from "pages/BlocksLoadingPage";

export default function Layout() {
    const { networkStatus } = useLoaderData() as { networkStatus: Promise<NetworkStatus> };
    return (
        <Suspense fallback={<BlocksLoadingPage />}>
            <Await resolve={networkStatus}>
                {(networkStatusLoaded) => {
                    return (
                        <Container maxWidth="xl">
                            <Header />
                            <Toolbar />
                            <Box paddingTop={2}>
                                <Outlet context={networkStatusLoaded} />
                            </Box>
                        </Container>
                    );
                }}
            </Await>
        </Suspense>
    );
}

export function useNetworkStatus() {
    return useOutletContext<NetworkStatus>();
}
