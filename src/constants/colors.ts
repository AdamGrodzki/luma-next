/**
 * Centralne kolory projektu
 * Źródło prawdy dla wszystkich kolorów
 */
export const COLORS = {
  // Tła
  bg: {
    dark: "#040607",
    darker: "#0a0a0a",
    card: "#0a0c0e",
    input: "#0d1012",
  },

  // Tekst
  text: {
    primary: "#f3eadf",
    secondary: "#cbb9a5",
    muted: "#8e867d",
    accent: "#9f978d",
  },

  // Bordery
  border: {
    default: "#1f1a14",
    light: "#2a231c",
    dark: "#1d1711",
  },

  // Akcenty
  accent: {
    primary: "#c79d6a",
    secondary: "#d0a46f",
    hover: "#dcc2a2",
    gold: "#c99f6a",
  },

  // Specjalne
  special: {
    brandBg: "#110e0b",
    badgeBorder: "#3a2d20",
    badgeBg: "#131517",
  },
} as const;

// Type-safe color keys
export type ColorKey = keyof typeof COLORS;
export type ColorGroup = keyof typeof COLORS[ColorKey];
