import { TableRow, TableCell, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
            <TableCell>{block.index}</TableCell>
            <TableCell>
                <CopyableField text={block.contentsHash} />
            </TableCell>
            <TableCell>{block.outputs.length}</TableCell>
            <TableCell>{block.keyImages.length}</TableCell>
            <TableCell>{block.signatures?.length}</TableCell>
            <TableCell>{getTimeStamp(block)}</TableCell>
            <TableCell style={{ cursor: "pointer" }}>
                <Link to={`${block.index}`} underline="none" component={RouterLink}>
                    details
                </Link>
                <NavigateNextIcon
                    fontSize="small"
                    color="primary"
                    sx={{ verticalAlign: "middle" }}
                />
            </TableCell>
        </TableRow>
    );
}
