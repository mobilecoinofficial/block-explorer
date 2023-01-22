import { ReactNode } from "react";
import { css } from "@emotion/react";
import Header from "components/Header";

export default function Page({ children }: { children: ReactNode }) {
    const styles = css`
        padding-top: 64px;
        padding-left: 96px;
        padding-right: 96px;
        background-color: #faf8f6;
    `;

    return (
        <div>
            <Header />
            <div css={styles}>{children}</div>
        </div>
    );
}
