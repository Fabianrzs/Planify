import {lightTheme} from './colors';
import type {Fonts, MD2Theme} from '../../types';
import configureFonts from '../../fonts';

export const MD2LightTheme: MD2Theme = {
  dark: false,
  roundness: 4,
  version: 2,
  isV3: false,
  colors: {
    ...lightTheme,
  },
  fonts: configureFonts({isV3: false}) as Fonts,
  animation: {
    scale: 1.0,
  },
};
