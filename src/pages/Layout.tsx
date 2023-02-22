import { Suspense } from "react";
import { Outlet, useLoaderData, useOutletContext, Await } from "react-router-dom";
import { AppBar, Box, Toolbar, CircularProgress, Typography, Container } from "@mui/material";

import Header from "components/Header";
import { NetworkStatus } from "api/types";

export default function Layout() {
    const { networkStatus } = useLoaderData() as { networkStatus: Promise<NetworkStatus> };
    return (
        <Suspense fallback={<LoadingHeader />}>
            <Await resolve={networkStatus}>
                {(networkStatusLoaded) => {
                    return (
                        <Container maxWidth="xl">
                            <Header networkStatus={networkStatusLoaded} />
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

function LoadingHeader() {
    return (
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center">
                        <CircularProgress sx={{ color: "white" }} size={45} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "block" },
                                marginLeft: 1
                            }}
                        >
                            MobileCoin Block Explorer
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export function useNetworkStatus() {
    return useOutletContext<NetworkStatus>();
}
