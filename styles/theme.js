import { Platform } from 'react-native';

export const COLORS = {
  background: '#0f172a', // deep background for app shells (used where needed)
  surface: '#ffffff',
  card: '#f8fafc',
  primary: '#0891b2', // bright teal
  primaryDark: '#036876',
  accent: '#7c3aed', // subtle accent (purple)
  text: '#0f172a',
  subtext: '#475569',
  muted: '#94a3b8',
  border: '#e6eef2',
  guidanceBg: '#eef6f8',
  success: '#10b981',
};

export const SIZES = {
  base: 12,
  small: 8,
  medium: 16,
  large: 20,
  xl: 28,
  radius: 12,
  scoreButton: 52,
};

export const TYPOGRAPHY = {
  fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  h6: 16,
  body: 14,
  bodyStrong: 15,
  label: 13,
};

export const SHADOW = {
  soft: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
    },
    android: {
      elevation: 4,
    },
  }),
  lifted: Platform.select({
    ios: {
      shadowColor: '#0b1020',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    android: {
      elevation: 6,
    },
  }),
};

export default {
  COLORS,
  SIZES,
  TYPOGRAPHY,
  SHADOW,
};
