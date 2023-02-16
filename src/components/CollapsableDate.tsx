import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

export default function CollapsableDate({ date }: { date: Date }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const format = matches ? "MMM D, YY" : "MMM D, YYYY h:mm:ss A";

    return <span>{moment(date).format(format)}</span>;
}
