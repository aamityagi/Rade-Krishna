"use client";

import { extendTheme } from "@mui/joy/styles";

const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#6750A4",
          solidHoverBg: "#5B3EA8",
          solidActiveBg: "#381E72",
        },
        neutral: {
          solidBg: "#625B71",
          solidHoverBg: "#4D445F",
          solidActiveBg: "#332D41",
        },
      },
    },
  },
});

export default joyTheme;
