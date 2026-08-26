/** Brand tokens per PRD section 8.1. Adjust once PFS approves final brand palette. */
export const colors = {
  navy: "#0A2A57",
  darkNavy: "#071D3D",
  gold: "#B9903C",
  orange: "#F36E21",
  green: "#006442",
  background: "#FAFAF8",
  border: "#E4E1D8",
} as const;

export type ColorToken = keyof typeof colors;
