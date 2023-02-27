import { Suspense } from "react";
import { Outlet, useLoaderData, useOutletContext, Await } from "react-router-dom";
import { Box, Toolbar, CircularProgress, Typography, Container } from "@mui/material";

import Header from "components/Header";
import { NetworkStatus } from "api/types";
import MobileCoinLogo from "components/MobileCoinLogo";
import HeaderBase from "components/HeaderBase";

export default function Layout() {
    const { networkStatus } = useLoaderData() as { networkStatus: Promise<NetworkStatus> };
    return (
        <Suspense fallback={<StaticHeader loading />}>
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

export function StaticHeader({ loading }: { loading: boolean }) {
    const logoComponent = loading ? (
        <CircularProgress sx={{ color: "white" }} size={45} />
    ) : (
        <MobileCoinLogo />
    );
    return (
        <HeaderBase>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center">
                        {logoComponent}
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
        </HeaderBase>
    );
}

export function useNetworkStatus() {
    return useOutletContext<NetworkStatus>();
}
