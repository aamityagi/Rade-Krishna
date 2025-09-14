"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  // Optional: customizations
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
      </body>
    </html>
  );
}
