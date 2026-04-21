export const PALETTES = {
  // Bold purple-to-pink gradient — high energy, youth
  neon: {
    bg1: "#1a0533",
    bg2: "#3d0068",
    accent1: "#c026d3",
    accent2: "#7c3aed",
    highlight: "#f0abfc",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
  },
  // Warm sunset — lifestyle & beauty brands
  sunset: {
    bg1: "#1c0010",
    bg2: "#450a0a",
    accent1: "#f97316",
    accent2: "#e11d48",
    highlight: "#fde68a",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
  },
  // Ocean — tech, SaaS, finance
  ocean: {
    bg1: "#020617",
    bg2: "#0f172a",
    accent1: "#0ea5e9",
    accent2: "#6366f1",
    highlight: "#7dd3fc",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
  },
  // Forest — eco, health, wellness
  forest: {
    bg1: "#052e16",
    bg2: "#14532d",
    accent1: "#22c55e",
    accent2: "#15803d",
    highlight: "#bbf7d0",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
  },
  // Luxury gold — fashion, premium brands
  gold: {
    bg1: "#0c0a09",
    bg2: "#1c1917",
    accent1: "#d97706",
    accent2: "#92400e",
    highlight: "#fde68a",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
  },
} as const;

export type PaletteName = keyof typeof PALETTES;
export type Palette = (typeof PALETTES)[PaletteName];
