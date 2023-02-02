import React, { useState } from "react";
import { AppBar, Box, Container, Toolbar, Typography, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import MobileCoinLogo from "components/MobileCoinLogo";
import searchBlock from "api/searchBlock";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    }
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

export default function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

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
        const foundBlock = await searchBlock(query);
        if (foundBlock) {
            navigate(`/blocks/${foundBlock.block.index}`);
        } else {
            console.log("NO BLOCK!");
        }
    }

    function goHome() {
        navigate("/blocks");
    }
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            placeholder="Search by txo public key or key image"
                            inputProps={{ "aria-label": "search" }}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleInputEnter}
                        />
                    </Search>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
