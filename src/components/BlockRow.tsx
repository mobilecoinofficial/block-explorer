import { TableRow, TableCell, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

import { Block } from "api/types";
import CopyableField from "components/CopyableField";

type BlockRowProps = {
    block: Block;
};

export function getTimeStamp(block: Block): string {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    return moment(parseInt(block.timestamp) * 1000).format("MMM D YYYY, h:mm:ss A");
}

export default function BlockRow({ block }: BlockRowProps) {
    return (
        <TableRow>
            <TableCell style={{ cursor: "pointer" }}>
                <Button>
                    <Link to={`${block.index}`} component={RouterLink}>
                        {block.index}
                    </Link>
                </Button>
            </TableCell>
            <TableCell>
                <CopyableField text={block.contentsHash} />
            </TableCell>
            <TableCell>{block.outputs.length}</TableCell>
            <TableCell>{block.keyImages.length}</TableCell>
            <TableCell>{block.signatures?.length}</TableCell>
            <TableCell>{getTimeStamp(block)}</TableCell>
        </TableRow>
    );
}
