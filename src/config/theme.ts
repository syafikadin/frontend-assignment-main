import { Roboto } from "next/font/google";
import { PaletteOptions, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface Palette extends PaletteOptions{
  customColors: {
    dark: string
    main: string
    light: string
    bodyBg: string
    trackBg: string
    avatarBg: string
    darkPaperBg: string
    lightPaperBg: string
    tableHeaderBg: string
    buttonEnable: string
    buttonDisable: string
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
