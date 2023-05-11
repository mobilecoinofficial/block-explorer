import { Box, Typography, Container, Link } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return <ErrorWrapper errorText={getErrorMessage(error)} />;
}

function ErrorWrapper({ errorText }: { errorText?: string }) {
    return (
        <Container>
            <Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="h6">
                        No matching TXO Public Key or Key Image was found
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        searching for: {errorText}
                    </Typography>
                    <Typography>&nbsp;</Typography>
                    <Link href="/blocks" sx={{ marginBottom: 4 }}>
                        view recent blocks
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
}
