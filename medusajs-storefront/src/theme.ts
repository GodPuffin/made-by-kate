'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';
import 'styles/mantine.css'

const MBKGreen: MantineColorsTuple = [
  '#f2f8ec',
  '#e6eae2',
  '#cbd1c8',
  '#b0b8ab',
  '#99a293',
  '#8a9583',
  '#818e7a',
  '#6e7b67',
  '#606e5a',
  '#515f4a',
];

export const theme = createTheme({
  colors: {
    MBKGreen,
  },
  autoContrast: true,
  primaryColor: 'MBKGreen',
  primaryShade: 8,
  white: '#e8e9e2',
  black: '#31362f',
  defaultRadius: 'lg',
  fontFamily: 'Outfit',
  headings: {
    fontFamily: 'Magnat',
  },
});
