// src/theme/index.ts

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: {
        '@apply bg-black text-white': {},
      },
      body: {
        '@apply bg-black text-white': {},
      },
      '#animatedBox': {
        '@apply bg-gradient-to-r from-green-500 to-green-800': {},
        '*animations': {
          animation: 'bgrotate infinite 30s',
        },
      },
      '#animatedBox2': {
        '@apply bg-gradient-to-r from-gray-800 to-gray-900': {},
        '*animations': {
          animation: 'bgrotate-alt infinite 30s',
        },
      },
      '@keyframes bgrotate': {
        '0%': {
          '--angle': '135deg',
        },
        '100%': {
          '--angle': '315deg',
        },
      },
      '@keyframes bgrotate-alt': {
        '0%': {
          '--angle': '135deg',
        },
        '100%': {
          '--angle': '315deg',
        },
      },
    },
  },
});

export default theme;
