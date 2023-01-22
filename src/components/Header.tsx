import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MobileCoinLogo from "components/MobileCoinLogo";
import { NetworkStatus } from "api/types";
import SearchBar from "./SearchBar";
import getNetowrkStatus from "api/getNetworkStatus";

const styles = {
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
    `
};

type HeaderNumberProps = {
    title: string;
    value?: number;
};

const HeaderNumber = ({ title, value }: HeaderNumberProps) => (
    <div style={{ width: 200 }}>
        <div style={{ fontSize: 16, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 32 }}>{value?.toLocaleString("en-US")}</div>
    </div>
);

export default function Header() {
    const navigateTo = useNavigate();
    const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);

    const getNwStatus = async () => {
        const status = await getNetowrkStatus();
        setNetworkStatus(status);
    };

    useEffect(() => {
        getNwStatus();
    }, []);

    return (
        <AppBar css={styles.header}>
            <div css={styles.logoText} onClick={() => navigateTo("/blocks")}>
                <>
                    <MobileCoinLogo />
                    <span style={{ marginBottom: -7 }}>&nbsp;Block Explorer </span>
                </>
            </div>
            <div css={styles.headerNumbersContainer}>
                <div css={styles.headerNumbers}>
                    <HeaderNumber title="Blocks" value={networkStatus?.networkBlockHeight} />
                    <HeaderNumber title="Transaction Outputs" value={networkStatus?.numTxos} />
                </div>
            </div>
            <SearchBar />
        </AppBar>
    );
}
