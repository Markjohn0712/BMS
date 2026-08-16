/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    cardBorder: '#EBECF1',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    cardBorder: '#2A2C31',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Brand palette for the DPWH Bridge Inspector product surfaces (login, dashboard).
 * Scheme-independent — the navy/orange identity stays constant in light and dark mode.
 */
export const Brand = {
  navy: '#16226B',
  navyDeep: '#0F1A52',
  orange: '#FF6A1A',
  iconBlueBg: '#DCE7FD',
  iconBlueFg: '#2F6FED',
  iconAmberBg: '#FCEBD0',
  iconAmberFg: '#E0891A',
} as const;

/**
 * Palette for the Bridge Inspection File Explorer (desktop-optimized photo library).
 * Given as exact hex values in the design spec — kept separate from `Brand` rather than
 * reconciled with it, since the two were specified independently with slightly different values.
 */
export const FileExplorer = {
  deepNavy: '#172B68',
  primaryBlue: '#23418A',
  orange: '#F47B20',
  lightOrange: '#FFF0E6',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#17213D',
  textSecondary: '#737B91',
  success: '#22A06B',
  warning: '#E6A21A',
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
