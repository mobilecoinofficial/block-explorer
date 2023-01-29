import { useLoaderData } from "react-router-dom";
import { css } from "@emotion/react";

import { Block } from "api/types";
import Page from "components/Page";
import { getTimeStamp } from "components/BlockRow";
import { abbreviateHash, truncate } from "utils/truncate";

const styles = {
    blockContainer: css`
        background-color: white;
        min-height: 100%;
        padding: 32px;
        position: relative;
    `,
    blockTable: css`
        margin-top: 24px;
        width: 100%;
        border-collapse: collapse;
        th {
            color: #666666;
            font-weight: 300;
            text-align: left;
            font-size: 16px;
            height: 8px;
        }
        td {
            font-weight: 300;
            text-align: left;
            font-size: 16px;
            height: 32px;
            border: none;
        }
    `,
    header: css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    `,
    headerTitle: css`
    font-size: 24px;
    font-weight: 500;
,`,
    divider: css`
        border-top: 1px solid #d9d9d9;
        margin-top: 40px;
        margin-bottom: 40px;
    `
};

const Divider = () => <hr css={styles.divider} />;

export default function BlockPage() {
    const block = useLoaderData() as Block;

    return (
        <Page>
            <div css={styles.blockContainer}>
                <div css={styles.header}>
                    <span css={styles.headerTitle}>Block {block.index}</span>
                </div>
                <div>
                    <table css={styles.blockTable}>
                        <thead>
                            <tr>
                                <th>Hash</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{block?.contentsHash}</td>
                                <td>{getTimeStamp(block)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Divider />
                <div>
                    <div style={{ textAlign: "left" }}>Transaction Outputs</div>
                    <div>
                        <table css={styles.blockTable}>
                            <thead>
                                <tr>
                                    <th>TXO Pubkey</th>
                                    <th>Target Address</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {block.outputs.map((txout) => (
                                    <tr key={txout.publicKey}>
                                        <td>{txout.publicKey}</td>
                                        <td>{abbreviateHash(txout.targetKey)}</td>
                                        <td>
                                            {txout.maskedAmount
                                                ? abbreviateHash(
                                                      txout.maskedAmount.maskedValue.toString()
                                                  )
                                                : "not available"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Divider />
                <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: 16 }}>Key Images</div>
                    {block.keyImages.map((k) => (
                        <div style={{ marginBottom: 16, fontWeight: 300 }} key={k}>
                            {k}
                        </div>
                    ))}
                </div>
                <Divider />
                <div>
                    <div style={{ textAlign: "left" }}>Signatures</div>
                    <div>
                        <table css={styles.blockTable}>
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>signer</th>
                                    <th>Signature</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(block.signatures ?? []).map((sig) => (
                                    <tr key={sig.blockSignature.signature}>
                                        <td>{sig.srcUrl}</td>
                                        <td>{truncate(sig.blockSignature.signer, 5)}</td>
                                        <td>{truncate(sig.blockSignature.signature, 9)}</td>
                                        <td>
                                            {new Date(
                                                parseInt(sig.blockSignature.signedAt) * 1000
                                            ).toUTCString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Page>
    );
}
