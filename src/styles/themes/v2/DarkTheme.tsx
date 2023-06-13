import {darkTheme} from './colors';
import type {Fonts, MD2Theme} from '../../types';
import configureFonts from '../../fonts';
import {MD2LightTheme} from './LightTheme';

export const MD2DarkTheme: MD2Theme = {
  ...MD2LightTheme,
  dark: true,
  mode: 'adaptive',
  version: 2,
  isV3: false,
  colors: {
    ...MD2LightTheme.colors,
    ...darkTheme,
  },
  fonts: configureFonts({isV3: false}) as Fonts,
};
