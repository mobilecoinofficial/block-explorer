import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";

import { Block } from "api/types";
import { abbreviateHash } from "utils/truncate";

type BlockRowProps = {
    block: Block;
};

const styles = {
    // TODO constants for all these colors
    link: css`
        color: #666666;
        text-decoration: none;
    `
};

export function getTimeStamp(block: Block): string {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    return moment(parseInt(block.timestamp) * 1000).format("MMM D YYYY, h:mm:ss A");
}

export default function BlockRow({ block }: BlockRowProps) {
    function copyHash() {
        navigator.clipboard.writeText(block.contentsHash);
    }

    return (
        <tr>
            <td>{block.index}</td>
            <td style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <span style={{ width: 108 }}>{abbreviateHash(block.contentsHash)}</span>
                <ContentCopyIcon css={styles.link} fontSize="small" onClick={copyHash} />
            </td>
            <td>{block.outputs.length}</td>
            <td>{block.keyImages.length}</td>
            <td>{block.signatures?.length}</td>
            <td>{getTimeStamp(block)}</td>
            <td style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Link css={styles.link} to={block.index}>
                    details
                </Link>
                <NavigateNextIcon css={styles.link} fontSize="small" />
            </td>
        </tr>
    );
}
