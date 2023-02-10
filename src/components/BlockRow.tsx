import { TableRow, TableCell, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import moment from "moment";

import { Block } from "api/types";
import CopyableField from "components/CopyableField";

type BlockRowProps = {
    block: Block;
};

const borderStyle = "1px solid #cecece";

const StyledTableCell = styled(TableCell)(() => ({
    border: "none",
    backgroundColor: "inherit",
    borderTop: borderStyle,
    borderBottom: borderStyle
}));

const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "white"
}));

export function getTimeStamp(block: Block): string {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    return moment(parseInt(block.timestamp) * 1000).format("MMM D YYYY, h:mm:ss A");
}

export default function BlockRow({ block }: BlockRowProps) {
    return (
        <StyledTableRow>
            <StyledTableCell style={{ borderLeft: borderStyle }}>
                <Button>
                    <Link to={`${block.index}`} component={RouterLink}>
                        {block.index}
                    </Link>
                </Button>
            </StyledTableCell>
            <StyledTableCell>
                <CopyableField text={block.contentsHash} />
            </StyledTableCell>
            <StyledTableCell>{block.outputs.length}</StyledTableCell>
            <StyledTableCell>{block.keyImages.length}</StyledTableCell>
            <StyledTableCell>{block.signatures?.length}</StyledTableCell>
            <StyledTableCell sx={{ borderRight: borderStyle }}>
                {getTimeStamp(block)}
            </StyledTableCell>
        </StyledTableRow>
    );
}
