export const FLAG_SIZES = {
  sm: { w: 16, h: 12, r: 1 },
  md: { w: 20, h: 15, r: 1.5 },
  lg: { w: 32, h: 24, r: 2 },
} as const;

export const FLAG_SHADOWS = {
  sm: "drop-shadow(0 0 1px rgba(0,0,0,0.10))",
  md: "drop-shadow(0 1px 2px rgba(0,0,0,0.10))",
  lg: "drop-shadow(0 2px 3px rgba(0,0,0,0.10))",
} as const;

export const FLAG_GRADIENTS = {
  "top-down":
    "linear-gradient(0deg, rgba(0,0,0,0.30) 2%, rgba(255,255,255,0.70) 100%)",
  linear:
    "linear-gradient(45deg, rgba(0,0,0,0.20) 0%, rgba(39,39,39,0.22) 11%, rgba(255,255,255,0.30) 27%, rgba(0,0,0,0.24) 41%, rgba(0,0,0,0.55) 52%, rgba(255,255,255,0.26) 63%, rgba(0,0,0,0.27) 74%, rgba(255,255,255,0.30) 100%)",
};

export const FLAG_SKELETON_STYLES = {
  keyframes: `
    @keyframes flag-skeleton-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `,
  base: `
    background: oklch(0.8916 0 0);
    animation: flag-skeleton-pulse 2s cubic-bezier(.39,.575,.565,1) infinite;
  `,
  dark: `
    background: oklch(0.2559 0 0);
  `,
  darkSelector: ':is(.dark, [data-theme="dark"]) .flag-skeleton',
  className: "flag-skeleton",
} as const;
