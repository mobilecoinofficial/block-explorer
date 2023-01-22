import { Link } from "react-router-dom";

import { Block } from "api/types";
import { abbreviateHash } from "utils/truncate";

type BlockRowProps = {
    block: Block;
};

export function getTimeStamp(block: Block): string {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    return new Date(parseInt(block.timestamp) * 1000).toUTCString();
}

export default function BlockRow({ block }: BlockRowProps) {
    return (
        <tr className="latestblocks-table-row">
            <td>{block.index}</td>
            <td>{abbreviateHash(block.contentsHash)}</td>
            <td>{block.outputs.length}</td>
            <td>{block.keyImages.length}</td>
            <td>{block.signatures?.length}</td>
            <td>{getTimeStamp(block)}</td>
            <td style={{ cursor: "pointer" }}>
                <Link to={block.index}>details</Link>
            </td>
        </tr>
    );
}
