import { AppBar } from "@mui/material";

const testnetBackground = `
conic-gradient(at 2% 50%, #0000 221.25deg, white 222deg 318deg, #0000 318.25deg),
conic-gradient(at 4% 50%, #0000 221.25deg, #ffa6b9 222deg 318deg, #0000 318.25deg),
conic-gradient(at 6% 50%, #0000 221.25deg, #00d2ff 222deg 318deg, #0000 318.25deg),
conic-gradient(at 8% 50%, #0000 221.25deg, #753000 222deg 318deg, #0000 318.25deg),
conic-gradient(at 10% 50%, #0000 221.25deg, black 222deg 318deg, #0000 318.25deg),
conic-gradient(at 12% 50%, #0000 221.25deg, red 222deg 318deg, #0000 318.25deg),
conic-gradient(at 14% 50%, #0000 221.25deg, orange 222deg 318deg, #0000 318.25deg),
conic-gradient(at 16% 50%, #0000 221.25deg, yellow 222deg 318deg, #0000 318.25deg),
conic-gradient(at 18% 50%, #0000 221.25deg, green 222deg 318deg, #0000 318.25deg),
conic-gradient(at 20% 50%, #0000 221.25deg, blue 222deg 318deg, #0000 318.25deg),
conic-gradient(at 22% 50%, #0000 221.25deg, indigo 222deg 318deg, #0000 318.25deg),
conic-gradient(at 120% 50%, #0000 221.25deg, black 222deg 318deg, #0000 318.25deg)
`;

const localBackground =
    "linear-gradient(to right, rgb(85, 205, 252), rgb(179, 157, 233), rgb(247, 168, 184), rgb(246, 216, 221), rgb(255, 255, 255) 45%, rgb(255, 255, 255), rgb(255, 255, 255) 55%, rgb(246, 216, 221), rgb(247, 168, 184), rgb(179, 157, 233), rgb(85, 205, 252))";

export default function HeaderBase({ children }) {
    const network = process.env.MC_NETWORK;
    let background: string;
    // can be "main" or "test"
    switch (network) {
        case "test":
            background = testnetBackground;
            break;
        case "local":
            background = localBackground;
            break;
    }

    return (
        <>
            <AppBar sx={{ background }}>{children}</AppBar>
            {chain !== "mainnet" && (
                <div
                    style={{
                        position: "fixed",
                        top: "40px",
                        left: "380px",
                        zIndex: 10000,
                        color: "orange"
                    }}
                >
                    {process.env.REACT_APP_CHAIN}
                </div>
            )}
        </>
    );
}
