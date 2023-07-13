type Color = import('@mui/material').Color
type SimplePaletteColorOptions = import('@mui/material/styles/createPalette').SimplePaletteColorOptions
type Theme = import('@mui/material/styles/createTheme').Theme
type ThemeOptions = import('@mui/material/styles').ThemeOptions


declare interface ITheme extends Omit<Theme, 'palette' | 'breakpoints'> {
  palette: IPalette
  variables: any
}

declare interface IThemeOptions
  extends Omit<ThemeOptions, 'palette' | 'breakpoints'> {
  palette: IPalette
}

declare interface IPalette {
  primary: DefaultPalette
  secondary: DefaultPalette
  neutral: DefaultPalette
  grey: any
  onPrimary: any
  onSecondary: any
  accent: any
  error: any
  errorLight: any
  success: any
  warning: any
  surface: any
  background: any
  onBackground: any
  btnPrimaryStates: any
  btnSecondaryStates: any
  btnOutlineText: any
  white: any
  pastel?: any
}

declare type DefaultPalette = SimplePaletteColorOptions &
  Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'>
