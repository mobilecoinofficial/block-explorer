import { AppBar } from "@mui/material";

export default function HeaderBase({ children }) {
    const isTestNet = process.env.MC_NETWORK === "test";
    const background = isTestNet ? "linear-gradient(to right, #7C5EE4, black 90%);" : null;

    return <AppBar sx={{ background }}>{children}</AppBar>;
}
