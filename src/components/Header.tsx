import React, { useState } from "react";
import { AppBar, Box, Container, Toolbar, Typography, InputBase, Snackbar } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import SyncStatus, { SyncData } from "components/SyncStatus";
import MobileCoinLogo from "components/MobileCoinLogo";
import searchBlock from "api/searchBlock";
import getBlock from "api/getBlock";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "100%"
    // [theme.breakpoints.up("sm")]: {
    //     marginLeft: theme.spacing(1),
    //     width: "auto"
    // }
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

export default function Header({ syncData }: { syncData: SyncData }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
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
        if (!isNaN(Number(query))) {
            try {
                await getBlock(query);
                setQuery("");
                navigate(`/blocks/${query}`);
                return;
            } catch {
                setSnackbarOpen(true);
            }
        }

        const foundBlock = await searchBlock(query);
        if (foundBlock) {
            setQuery("");
            navigate(`/blocks/${foundBlock.block.index}`);
            return;
        }

        setSnackbarOpen(true);
    }

    function goHome() {
        navigate("/blocks");
    }
    return (
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        onClick={goHome}
                        sx={{ cursor: "pointer" }}
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
                            MobileCoin Block Explorer
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
                    <SyncStatus syncData={syncData} />
                </Toolbar>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Unable to find matching block"
            />
        </AppBar>
    );
}
