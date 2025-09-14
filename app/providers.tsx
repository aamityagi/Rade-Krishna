"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../theme/muiTheme";
import joyTheme from "../theme/joyTheme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={joyTheme}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CssVarsProvider>
  );
}
