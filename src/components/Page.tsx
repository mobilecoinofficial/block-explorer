import { ReactNode } from "react";
import { Box } from "@mui/material";
import { css } from "@emotion/react";
import Header from "components/Header";

export default function Page({ children }: { children: ReactNode }) {
    const styles = css`
        padding-top: 96px;
        padding-left: 96px;
        padding-right: 96px;
    `;

    return (
        <div>
            <Header />
            <Box css={styles}>{children}</Box>
        </div>
    );
}
