export const colors = {
  primary: '#2563EB', // Nice blue (blue-600) - not too bright
  secondary: '#FFFFFF', // White
  accent: '#1E40AF', // Darker blue for accents (blue-700)
  
  // Light mode colors
  light: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#232323',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    card: '#FFFFFF',
    cardBorder: '#E5E7EB',
    shadow: '#000000',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Dark mode colors
  dark: {
    background: '#111827', // neutral-900
    surface: '#1F2937', // neutral-800
    text: '#F9FAFB', // gray-100
    textSecondary: '#D1D5DB', // gray-300
    border: '#374151', // neutral-700
    borderLight: '#4B5563', // neutral-600
    card: '#1F2937', // neutral-800
    cardBorder: '#374151', // neutral-700
    shadow: '#000000',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  }
};

export type ColorScheme = 'light' | 'dark';

export interface Theme {
  colors: typeof colors.light | typeof colors.dark;
  isDark: boolean;
}

export const getTheme = (colorScheme: ColorScheme): Theme => ({
  colors: colors[colorScheme],
  isDark: colorScheme === 'dark',
}); 