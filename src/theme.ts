import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8D5FFF"
        },
        secondary: teal,
        background: {
            default: "#faf8f6"
        }
    }
});
export default theme;
