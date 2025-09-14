"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#6750A4", // M3 Primary
          solidHoverBg: "#5B3D9B",
          solidActiveBg: "#381E72",
        },
        secondary: {
          solidBg: "#625B71",
          solidHoverBg: "#4D445F",
          solidActiveBg: "#332D41",
        },
        neutral: {
          solidBg: "#FFFBFE",
        },
      },
    },
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "24px",
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
