"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

const theme = extendTheme({
  // Optional: add Joy UI theme customizations here
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background text-gray-900">
      <head>
        <title>Radha-Krishna SaaS</title>
        <meta
          name="description"
          content="AI-powered SaaS for keyword research, content creation, ecommerce, and more."
        />
      </head>
      <body className="min-h-screen antialiased">
        <CssVarsProvider theme={theme}>
          {children}
          <Analytics />
        </CssVarsProvider>
      </body>
    </html>
  );
}
