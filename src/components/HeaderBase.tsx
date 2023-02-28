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

export default function HeaderBase({ children }) {
    const isTestNet = process.env.MC_NETWORK === "test";
    const background = isTestNet ? testnetBackground : null;

    return (
        <>
            <AppBar sx={{ background }}>{children}</AppBar>
            {isTestNet && (
                <div
                    style={{
                        position: "fixed",
                        top: "40px",
                        left: "380px",
                        zIndex: 10000,
                        color: "orange"
                    }}
                >
                    testnet
                </div>
            )}
        </>
    );
}
