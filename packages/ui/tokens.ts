/** Brand tokens per PRD section 8.1. Adjust once PFS approves final brand palette. */
export const colors = {
  navy: "#0A2A57",
  darkNavy: "#071D3D",
  gold: "#B9903C",
  orange: "#F36E21",
  green: "#006442",
  background: "#FAFAF8",
  border: "#E4E1D8",

  // Semantic colors
  primary: "#0A2A57",
  primaryHover: "#071D3D",
  primaryLight: "#E8EDF5",
  secondary: "#B9903C",
  secondaryHover: "#9D7A32",
  success: "#006442",
  successLight: "#E8F5EE",
  warning: "#F36E21",
  warningLight: "#FEF3EB",
  error: "#C0392B",
  errorLight: "#FDEDEA",

  // Neutral scale
  neutral: {
    50: "#FAFAF8",
    100: "#F2F0EB",
    200: "#E4E1D8",
    300: "#D0CCC1",
    400: "#A8A395",
    500: "#868171",
    600: "#6B6759",
    700: "#555246",
    800: "#434036",
    900: "#36332B",
    950: "#1E1C17",
  },

  // Surface colors
  surface: "#FFFFFF",
  surfaceHover: "#F2F0EB",
  surfaceBorder: "#E4E1D8",
} as const;

export type ColorToken = keyof typeof colors;

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), system-ui, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const borderRadius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

export const transitions = {
  fast: "150ms ease",
  normal: "200ms ease",
  slow: "300ms ease",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;

export const layout = {
  sidebarWidth: "280px",
  sidebarCollapsedWidth: "72px",
  headerHeight: "64px",
  mobileHeaderHeight: "56px",
  containerMaxWidth: "1400px",
} as const;