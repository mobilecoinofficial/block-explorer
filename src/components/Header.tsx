import { useState, useEffect } from "react";
import { css } from "@emotion/react";

import MobileCoinLogo from "components/MobileCoinLogo";
import { NetworkStatus } from "api/types";
import SearchBar from "./SearchBar";

type HeaderNumberProps = {
    title: string;
    value: number;
};

// TODO clean up styles and move search bar styles to search bar component
const headerCSS = {
    header: css`
        height: 256px;
        background-color: black;
        color: white;
        padding-top: 32px;
        padding-bottom: 32px;
        padding-left: 56px;
        padding-right: 56px;
        position: relative;
    `,
    logoText: css`
        display: flex;
        align-items: center;
        font-size: 32px;
        text-align: left;
        margin-bottom: 56px;
        cursor: pointer;
    `,
    headerNumbers: css`
        display: flex;
        justify-content: space-around;
        width: 70%;
    `,

    headerNumbersContainer: css`
    display: flex;
    justify-content: center;
}`,

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

const HeaderNumber = ({ title, value }: HeaderNumberProps) => (
    <div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 32 }}>{value.toLocaleString("en-US")}</div>
    </div>
);

export default function Header() {
    const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);

    // TODO, move this to standalone api fn
    const getNwStatus = async () => {
        const response = await fetch("http://localhost:9090/wallet/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                method: "get_network_status",
                jsonrpc: "2.0",
                id: 1
            })
        });

        const json = await response.json();
        const nwStatus = {
            networkBlockHeight: json.result.network_status.network_block_height,
            numTxos: json.result.network_status.local_num_txos
        };
        setNetworkStatus(nwStatus);
    };

    useEffect(() => {
        getNwStatus();
    }, []);

    return (
        <div css={headerCSS.header}>
            <div
                css={headerCSS.logoText}
                onClick={() => {
                    window.location.href = `/blocks`;
                }}
            >
                <MobileCoinLogo />
                &nbsp;Block Explorer
            </div>
            <div css={headerCSS.headerNumbersContainer}>
                <div css={headerCSS.headerNumbers}>
                    <HeaderNumber
                        title="Number of Blocks"
                        value={networkStatus?.networkBlockHeight ?? 0}
                    />
                    <HeaderNumber
                        title="Number of Transaction Outputs"
                        value={networkStatus?.numTxos ?? 0}
                    />
                </div>
            </div>
            <SearchBar />
        </div>
    );
}
