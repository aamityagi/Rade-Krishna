"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6750A4" },
    secondary: { main: "#625B71" },
  },
  shape: {
    borderRadius: 8, // fixes radius errors
  },
  typography: {
    fontSize: 14, // fixes fontSize null error
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
