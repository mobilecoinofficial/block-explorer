import { createTheme } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: teal,
        background: {
            default: "#faf8f6"
        }
    }
});
export default theme;
