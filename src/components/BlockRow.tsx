import { TableRow, TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { Block } from "api/types";
import CopyableField from "components/CopyableField";
import CollapsableDate from "./CollapsableDate";

type BlockRowProps = {
    block: Block;
};

const borderStyle = "1px solid #cecece";

const StyledTableCell = styled(TableCell)(() => ({
    backgroundColor: "inherit"
}));

const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "white",
    cursor: "pointer"
}));

export function getTimeStamp(block: Block) {
    if (block.timestampResultCode !== "TimestampFound") {
        return "Timestamp not available";
    }

    const date = new Date(parseInt(block.timestamp) * 1000);

    return <CollapsableDate date={date} />;
}

export default function BlockRow({ block }: BlockRowProps) {
    const navigate = useNavigate();
    function goToBlock() {
        navigate(`/blocks/${block.index}`);
    }

    return (
        <StyledTableRow onClick={goToBlock} hover>
            <StyledTableCell style={{ borderLeft: borderStyle }}>{block.index}</StyledTableCell>
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
