// ─────────────────────────────────────────────────────────────────────────────
// AzTU ERP — design system.
// Brand is built around the AzTU navy shield (#1B2559). We layer a lively indigo
// and warm gold accent on top for a modern, energetic admin feel.
// ─────────────────────────────────────────────────────────────────────────────

export const palette = {
  // Core AzTU navy scale
  navy950: '#0C1235',
  navy900: '#111a44',
  navy800: '#16205A',
  navy700: '#1B2559',
  navy600: '#232F73',
  navy500: '#2E3A8C',
  navy400: '#4B57B0',

  // Accent indigo (interactive / highlights)
  indigo600: '#3D4ED6',
  indigo500: '#5566F0',
  indigo400: '#7C89F6',
  indigo100: '#E5E8FF',
  indigo50: '#F1F3FF',

  // Gold — used sparingly for emphasis (matches the AzTU wave/accent)
  gold500: '#F5A524',
  gold400: '#F7B84B',
  gold100: '#FDEFD3',

  // Semantic
  green600: '#0E9F6E',
  green100: '#DEF7EC',
  red600: '#E02424',
  red100: '#FDE8E8',
  amber600: '#C27803',
  amber100: '#FDF6B2',
  sky600: '#0EA5E9',
  sky100: '#E0F2FE',

  white: '#FFFFFF',
  // Neutral grays
  gray25: '#FCFCFD',
  gray50: '#F6F7FB',
  gray100: '#EEF0F6',
  gray200: '#E3E6EF',
  gray300: '#CDD2E0',
  gray400: '#9AA1B9',
  gray500: '#6B7390',
  gray600: '#4B5270',
  gray700: '#343A54',
  gray800: '#20263D',
  gray900: '#141829',
} as const;

export const colors = {
  primary: palette.navy700,
  primaryDeep: palette.navy800,
  accent: palette.indigo500,
  gold: palette.gold500,

  bg: palette.gray50,
  surface: palette.white,
  surfaceAlt: palette.gray50,

  text: palette.gray900,
  textMuted: palette.gray500,
  textFaint: palette.gray400,
  border: palette.gray200,

  success: palette.green600,
  danger: palette.red600,
  warning: palette.amber600,
  info: palette.sky600,

  tabActive: palette.navy700,
  tabInactive: palette.gray400,
} as const;

// Gradients (start → end) for LinearGradient
export const gradients = {
  brand: ['#1B2559', '#2E3A8C', '#3D4ED6'] as const,
  brandSoft: ['#232F73', '#3D4ED6'] as const,
  gold: ['#F5A524', '#F7B84B'] as const,
  success: ['#0E9F6E', '#31C48D'] as const,
  sky: ['#0EA5E9', '#38BDF8'] as const,
  purple: ['#5566F0', '#7C89F6'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 30, fontWeight: '800' as const, letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: '800' as const, letterSpacing: -0.3 },
  h2: { fontSize: 20, fontWeight: '700' as const, letterSpacing: -0.2 },
  h3: { fontSize: 17, fontWeight: '700' as const },
  title: { fontSize: 15, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '500' as const },
  bodyStrong: { fontSize: 15, fontWeight: '600' as const },
  small: { fontSize: 13, fontWeight: '500' as const },
  caption: { fontSize: 11.5, fontWeight: '600' as const, letterSpacing: 0.3 },
  overline: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1 },
};

// Soft, layered shadows tuned for a navy brand.
export const shadow = {
  card: {
    shadowColor: '#1B2559',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  soft: {
    shadowColor: '#1B2559',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  floating: {
    shadowColor: '#0C1235',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
} as const;
