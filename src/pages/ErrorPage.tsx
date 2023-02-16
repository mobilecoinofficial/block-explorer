import { AppBar, Box, Typography, Toolbar, Container, Link } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import MobileCoinLogo from "components/MobileCoinLogo";

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <ErrorWrapper title="This page does not exist." />;
        }

        return (
            <ErrorWrapper title="Woops! something went wrong" errorText={error.error?.message} />
        );
    }

    return <ErrorWrapper title="Woops! Something went wrong" errorText={getErrorMessage(error)} />;
}

function ErrorWrapper({ title, errorText }: { title: string; errorText?: string }) {
    console.error(errorText);
    return (
        <Container>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box display="flex" alignItems="center">
                            <MobileCoinLogo />
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
            <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight={400}
            >
                <Typography variant="h5">{title}</Typography>
                <Link href="/blocks" sx={{ marginBottom: 4 }}>
                    return to recent blocks
                </Link>
                <Typography color="error">see console for details</Typography>
            </Box>
        </Container>
    );
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
}
