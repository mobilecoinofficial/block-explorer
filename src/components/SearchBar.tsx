import { useState } from "react";
import { css } from "@emotion/react";
import { Button } from "@mui/material";

import searchBlock from "api/searchBlock";
import { useNavigate } from "react-router-dom";

const styles = {
    headerSearchbar: css`
    position: absolute;
    bottom: -28px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 65%;
    background-color: white;
    border: 2px solid #eff1f1;
    border-radius: 8px;
    height: 56px;
    color: #666666;
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
}`,

    searchInput: css`
    width: 100%;
    border: none;
    height: 100%;
    font-size: 16px;
    &:focus {
        outline: none;
    }
}`
};

export default function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

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

    return (
        <div css={styles.headerSearchbar}>
            <input
                css={styles.searchInput}
                placeholder="Search by txo public key or key image"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputEnter}
            />
            {query.length ? (
                <Button type="submit" onClick={search}>
                    search
                </Button>
            ) : null}
        </div>
    );
}
