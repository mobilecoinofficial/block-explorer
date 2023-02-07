export const TOKENS = {
    1: {
        name: "eUSD",
        precision: 1000000
    }
};

export function getTokenAmount(tokenId: number, amount: number) {
    return (amount / TOKENS[tokenId].precision).toLocaleString("en-US");
}
