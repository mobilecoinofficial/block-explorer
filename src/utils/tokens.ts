export const TOKENS = {
    1: {
        name: "eUSD",
        precision: 1_000_000
    },
    0: {
        name: "MOB",
        precision: 1_000_000_000_000
    },
    // This should only appear on testnet
    // Block 847220 has a mint of it
    8192: {
        name: "fauxUSD",
        precision: 1_000_000
    }
};

export function getTokenAmount(tokenId: number, amount: number) {
    const normalized = amount / TOKENS[tokenId].precision;
    if (normalized < 1) {
        return normalized;
    }
    return (amount / TOKENS[tokenId].precision).toLocaleString("en-US");
}
