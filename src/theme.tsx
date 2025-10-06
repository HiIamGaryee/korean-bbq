import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    light: PaletteColor;
    dark: PaletteColor;
  }

  interface PaletteOptions {
    light?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}

const headingFont = "Oswald, Bebas Neue, Noto Sans KR, sans-serif";
const bodyFont = "Poppins, Inter, Noto Sans KR, sans-serif";

// Function to create a theme based on the mode
const getTheme = (mode: any) =>
  createTheme({
    shape: {
      borderRadius: 12,
    },
    palette: {
      mode,
      primary: {
        main: "#6B3CF6",
        light: "#8C64F8",
        dark: "#4B27C2",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#FF6A00",
        light: "#FF8F40",
        dark: "#CC5500",
        contrastText: "#FFFFFF",
      },
      light: {
        main: "#F5F3EF",
        light: "#FFFFFF",
        dark: "#EDE7E0",
      },
      dark: {
        main: "#0E0E0E",
        light: "#1A1A1A",
        dark: "#0A0A0A",
      },
      background: {
        default: "#0E0E0E",
        paper: "#1A1A1A",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#BDBDBD",
      },
      divider: "#2E2E2E",
      error: {
        main: "#f44336",
        light: "#e57373",
        dark: "#d32f2f",
      },
      warning: {
        main: "#ff9800",
        light: "#ffb74d",
        dark: "#f57c00",
      },
      info: {
        main: mode === "light" ? "#2196f3" : "#BBDEFB",
        light: "#64b5f6",
        dark: "#1976d2",
      },
      success: {
        main: "#4caf50",
        light: "#81c784",
        dark: "#388e3c",
      },
    },
    typography: {
      fontFamily: bodyFont,
      h1: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      h2: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      h3: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      h4: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      h5: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      h6: {
        fontFamily: headingFont,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      subtitle1: { fontFamily: headingFont },
      button: {
        fontFamily: bodyFont,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#0E0E0E",
            color: "#FFFFFF",
          },
          img: {
            borderRadius: 12,
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            backgroundColor: "#1A1A1A",
            "&.table-paper": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },
          rounded: {
            borderRadius: 12,
          },
          outlined: {
            borderColor: "#2E2E2E",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "#2E2E2E",
            backgroundColor: "#2E2E2E",
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "1px solid #2E2E2E",
            borderRadius: "4px",
            background: "linear-gradient(45deg, #1F1F1F 0%, #0E0E0E 100%)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "#6B3CF6",
              color: "#FFFFFF",
              boxShadow: "0 0 10px rgba(107,60,246,0.4)",
            },
            "&:hover": {
              backgroundColor: "#2A2A2A",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            background: "#6B3CF6",
            color: "#FFFFFF",
            borderRadius: 50,
            fontWeight: 600,
            textTransform: "uppercase",
            "&:hover": {
              background: "#5A2EE8",
              boxShadow: "0 0 10px rgba(107,60,246,0.4)",
            },
            "&.Mui-disabled": {
              color: "#666",
              background: "#333333",
            },
            "&.MuiButton-containedSecondary": {
              background: "#FF6A00",
              color: "#FFFFFF",
              "&:hover": {
                background: "#E65F00",
                boxShadow: "0 0 10px rgba(255,106,0,0.4)",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#1A1A1A",
            padding: "24px",
            borderRadius: 12,
            height: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
          },
        },
      },
    },
  });

export default getTheme;
