import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8D5FFF"
        },
        warning: {
            main: "#ffa726"
        },
        secondary: teal,
        background: {
            default: "#faf8f6"
        }
    },
    typography: {
        fontFamily: "Sohne-Buch"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
            font-family: "Sohne-Buch";
            src: url("./assets/fonts/Sohne-Buch.otf") format("opentype");
            }
            
          `
        }
    }
});
export default theme;
