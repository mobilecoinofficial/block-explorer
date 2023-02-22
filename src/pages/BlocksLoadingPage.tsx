import { AppBar, Container, Toolbar, Box, Typography, CircularProgress } from "@mui/material";

export default function BlocksLoadingPage() {
    return (
        <>
            <AppBar>
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Box display="flex" alignItems="center">
                            <CircularProgress sx={{ color: "white" }} />
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
            <Toolbar />
        </>
    );
}
