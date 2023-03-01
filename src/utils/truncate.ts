export function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export function abbreviateHash(hash: string) {
    const start = hash.slice(0, 5);
    const end = hash.slice(hash.split("").length - 5, hash.split("").length);
    return start + "..." + end;
}
