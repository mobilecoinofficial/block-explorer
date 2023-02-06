import { Box, Typography, Link } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Page from "components/Page";

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
                <Typography variant="h5">{title}</Typography>
                <Link href="/blocks" sx={{ marginBottom: 4 }}>
                    return to recent blocks
                </Link>
                <Typography color="error">{errorText}</Typography>
            </Box>
        </Page>
    );
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
}
