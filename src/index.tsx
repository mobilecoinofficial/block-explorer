import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "theme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <CssBaseline enableColorScheme>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </CssBaseline>
    </React.StrictMode>
);
