import ThemeConstants from './constants'
import { pxToRem } from './helpers'

const {
  htmlFontSize,
  fontFamily,
  fontSize,
  fontWeightLight, //300
  fontWeightRegular, //760
  fontWeightMedium, //500
  fontWeightSemiBold, //600
  fontWeightBold, //700
} = ThemeConstants

const typography: any = {
  htmlFontSize,
  fontFamily,
  fontSize,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightSemiBold,
  fontWeightBold,
  h1: {
    fontSize: `${32}px !important`,
    lineHeight: '48px !important',
    textTransform: 'none',
    '@media (max-width: 760px)': {
      fontSize: `${24}px !important`,
      lineHeight: '36px !important',
    }
  },
  h2: {
    fontSize: `${24}px !important`,
    lineHeight: '36px !important',
    textTransform: 'none !important',
    '@media (max-width: 760px)': {
      fontSize: `${18}px !important`,
      lineHeight: '27px !important',
    }
  },
  h3: {
    fontSize: `${20}px`,
    lineHeight: '30px',
    textTransform: 'none !important',
    '@media (max-width: 760px)': {
      fontSize: `${16}px`,
    }
  },
  h4: {
    fontSize: `${18}px `,
    lineHeight: '27px',
    textTransform: 'none !important',

  },
  h5: {
    fontSize: `${16}px`,
    lineHeight: '24px !important',
    textTransform: 'none !important',
    // '@media (max-width: 760px)': {
    //   fontSize: `${14}px !important`,
    //   lineHeight: '21px !important',
    // }
  },
  h6: {
    fontSize: `${14}px`,
    lineHeight: '32px',
    textTransform: 'none !important',
  },

  subtitle1: {
    fontSize: `${15.69}px !important`,
    lineHeight: '18.83px !important',
    textTransform: 'none !important',
  },
  subtitle2: {
    fontSize: `${12}px`,
    lineHeight: '18px',
    textTransform: 'none !important',

  },
  body1: {
    fontSize: `${14.7}px !important`,
    lineHeight: '17.64px !important',
    textTransform: 'none !important',
  },
  body2: {
    fontSize: `${13.78}px !important`,
    lineHeight: '16.54px !important',
    textTransform: 'none !important',
  },
  button: {
    fontSize: `${12}px !important`,
    lineHeight: '18px !important',
    textTransform: 'uppercase !important',
  },
  caption: {
    fontSize: `${12.6}px !important`,
    lineHeight: '15.12px !important',
    textTransform: 'none !important',
  },
  overline: {
    fontSize: `${10}px !important`,
    lineHeight: '15px !important',
    textTransform: 'none !important',
  },
}

export default typography
