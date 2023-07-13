import ThemeConstants from './constants'

const { htmlFontSize } = ThemeConstants
import { ClassNameMap, Styles, WithStylesOptions, makeStyles as makeStylesMUI } from '@mui/styles'

export const pxToRem = (px: number, baseFontSize: number = htmlFontSize) =>
  `${(px / baseFontSize).toFixed(3)}rem`

function makeStyles<ClassKey extends string = string>(
  style: Styles<ITheme, object, ClassKey>,
  options?: Omit<WithStylesOptions<ITheme>, 'withTheme'>,
): (props?: any) => ClassNameMap<ClassKey>
function makeStyles<
  Props extends object = object,
  ClassKey extends string = string
>(
  styles: Styles<ITheme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<ITheme>, 'withTheme'>,
): (props: Props) => ClassNameMap<ClassKey>

function makeStyles(styles: any, options: any) {
  return makeStylesMUI(styles, options)
}

export default makeStyles
