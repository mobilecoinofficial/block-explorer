import { TableRow, TableCell, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import moment from "moment";

import { Block } from "api/types";
import CopyableField from "components/CopyableField";

type BlockRowProps = {
    block: Block;
};

export const StyledTableCell = styled(TableCell)(() => ({
    border: "none",
    backgroundColor: "White"
}));

export function getTimeStamp(block: Block): string {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    return moment(parseInt(block.timestamp) * 1000).format("MMM D YYYY, h:mm:ss A");
}

export default function BlockRow({ block }: BlockRowProps) {
    return (
        <TableRow>
            <TableCell
                style={{ cursor: "pointer" }}
                sx={{ backgroundColor: "white", border: "none" }}
            >
                <Button>
                    <Link to={`${block.index}`} component={RouterLink}>
                        {block.index}
                    </Link>
                </Button>
            </TableCell>
            <StyledTableCell>
                <CopyableField text={block.contentsHash} />
            </StyledTableCell>
            <StyledTableCell>{block.outputs.length}</StyledTableCell>
            <StyledTableCell>{block.keyImages.length}</StyledTableCell>
            <StyledTableCell>{block.signatures?.length}</StyledTableCell>
            <StyledTableCell>{getTimeStamp(block)}</StyledTableCell>
        </TableRow>
    );
}
