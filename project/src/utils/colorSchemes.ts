import { ColorScheme } from '../types';

export const colorSchemes: ColorScheme[] = [
  {
    id: 'default',
    name: 'Ocean Blue',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    background: '#F8FAFC',
    text: '#1F2937',
    nucleotides: {
      A: '#EF4444', // Red
      T: '#10B981', // Green
      G: '#F59E0B', // Yellow
      C: '#3B82F6'  // Blue
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#0D9488',
    accent: '#84CC16',
    background: '#F0FDF4',
    text: '#064E3B',
    nucleotides: {
      A: '#DC2626',
      T: '#059669',
      G: '#D97706',
      C: '#2563EB'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    primary: '#EA580C',
    secondary: '#DC2626',
    accent: '#F59E0B',
    background: '#FFF7ED',
    text: '#9A3412',
    nucleotides: {
      A: '#DC2626',
      T: '#059669',
      G: '#EA580C',
      C: '#7C3AED'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Purple',
    primary: '#7C3AED',
    secondary: '#3730A3',
    accent: '#EC4899',
    background: '#1E1B4B',
    text: '#E0E7FF',
    nucleotides: {
      A: '#F87171',
      T: '#34D399',
      G: '#FBBF24',
      C: '#60A5FA'
    }
  }
];

export const getColorScheme = (id: string): ColorScheme => {
  return colorSchemes.find(scheme => scheme.id === id) || colorSchemes[0];
};