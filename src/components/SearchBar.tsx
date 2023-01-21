import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    // const navigate = useNavigate();
    const [query, setQuery] = useState("");

    async function search() {
        console.log(query);

        const response = await fetch("http://localhost:9090/wallet/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                method: "search_ledger",
                jsonrpc: "2.0",
                params: {
                    query
                },
                id: 1
            })
        });

        const json = await response.json();
        const foundBlock = json.result.results[0];
        if (foundBlock) {
            // TODO refactor CSS to allow this to go inside of router or something
            // navigate(`/blocks/${foundBlock.block.index}`);
            window.location.href = `/blocks/${foundBlock.block.index}`;
        } else {
            window.location.href = `/no-block-found`;
        }
    }

    return (
        <div className="headersearchbar">
            <input
                className="searchInput"
                placeholder="Search by txo public key or key image"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query.length ? (
                <button style={{ height: 40, fontSize: 16 }} onClick={search}>
                    search
                </button>
            ) : null}
        </div>
    );
}
