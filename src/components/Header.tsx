import React, { useState, useEffect } from "react";
import { Box, Container, Toolbar, Typography, InputBase, Snackbar, Alert } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, Link } from "react-router-dom";

import SyncStatus, { SyncData } from "components/SyncStatus";
import MobileCoinLogo from "components/MobileCoinLogo";
import searchBlock from "api/searchBlock";
import getBlock from "api/getBlock";
import { NetworkStatus } from "api/types";
import getCounters from "api/getCounters";
import getRecentBlocks from "api/getRecentBlocks";
import HeaderBase from "components/HeaderBase";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(2),
    width: "100%"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "64ch"
        }
    }
}));

export default function Header({ networkStatus }: { networkStatus: NetworkStatus }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [syncData, setSyncData] = useState<SyncData>(null);
    const isTestNet = process.env.MC_NETWORK === "test";
    const headerText = isTestNet ? "Testnet Block Explorer" : "MobileCoin Block Explorer";

    useEffect(() => {
        const getSyncData = async () => {
            const counters = await getCounters();
            const recentBlocks = await getRecentBlocks(5);
            setSyncData({
                networkStatus,
                recentBlocks,
                counters
            });
        };

        getSyncData();
    }, [networkStatus]);

    function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    function handleInputEnter(event) {
        // enter key
        if (event.keyCode == 13) {
            search();
        }
    }

    async function search() {
        const trimmedQuery = query.trim();
        if (!isNaN(Number(trimmedQuery))) {
            try {
                await getBlock(trimmedQuery);
                setQuery("");
                navigate(`/blocks/${trimmedQuery}`);
                return;
            } catch {
                setSnackbarOpen(true);
            }
        }

        const foundBlock = await searchBlock(trimmedQuery);
        if (foundBlock) {
            setQuery("");
            navigate(`/blocks/${foundBlock.block.index}`);
            return;
        }

        setSnackbarOpen(true);
    }

    return (
        <HeaderBase>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ color: "white", textDecoration: "none" }}
                        component={Link}
                        to="/blocks"
                    >
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
                            {headerText}
                        </Typography>
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by block index, txo public key, or key image"
                            inputProps={{ "aria-label": "search" }}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleInputEnter}
                            value={query}
                        />
                    </Search>
                    {syncData && <SyncStatus syncData={syncData} />}
                </Toolbar>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                sx={{ backgroundColor: "theme.palette.warning.main" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <Alert
                    severity="error"
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ border: "1px solid black" }}
                >
                    Unable to find matching block
                </Alert>
            </Snackbar>
        </HeaderBase>
    );
}
