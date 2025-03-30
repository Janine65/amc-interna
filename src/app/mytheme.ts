import Nora from '@primeng/themes/nora';
import { definePreset } from '@primeng/themes';

export const MyPreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: '#f2f7fd',
      100: '#c2d6f5',
      200: '#91b6ed',
      300: '#6196e6',
      400: '#3076de',
      500: '#0056d6',
      600: '#0049b6',
      700: '#003c96',
      800: '#002f76',
      900: '#002256',
      950: '#001636',
    },
    text: {
      colorPrimary: '{primary.600}',
      colorLight: '{primary.100}',
      colorDark: '{primary.900}',
      colorInvert: '{primary.50}',
      colorInvertLight: '{primary.100}',
      colorInvertDark: '{primary.900}',
    },
  },
});
