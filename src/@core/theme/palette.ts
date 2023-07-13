const primary: any = {
  get main() {
    return this[800]
  },
  get contrastText() {
    return accent.main
  },
  50: '#FEEBEF',
  100: '#FDD6E0',
  200: '#FCC2D0',
  300: '#FA99B0',
  400: '#F985A1',
  500: '#F87091',
  600: '#F75C81',
  700: '#F64772',
  800: '#F53362',
  900: '#DC2E58',
  1000: "#C4294E",
  1100: "#AB2445",
  1200: "#931F3B",
  1300: "#7A1931",
  1400: "#490F1D",
  1500: "#310A14",
  1600: "#18050A",
}

const secondary: any = {
  get main() {
    return this[300]
  },
  get contrastText() {
    return accent.main
  },
  50: '#E6F4FB',
  100: '#CEE8F8',
  200: '#B5DDF4',
  300: '#83C7EC',
  400: '#6BBBE9',
  500: '#52B0E5',
  600: '#39A5E1',
  700: '#2199DE',
  800: '#088EDA',
  900: '#0780C4',
  1000: "#0672AE",
  1100: "#066399",
  1200: "#055583",
  1300: "#04476D",
  1400: "#022B41",
  1500: "#021C2C",
  1600: "#010E16",
}

const neutral: any = {
  get main() {
    return this[1400]
  },
  get contrastText() {
    return accent.main
  },
  20: "#F8FAFB",
  25: "#F0F3F5",
  50: '#F5F7F8',
  100: '#E0E6EA',
  200: '#CCD6DC',
  300: '#B8C6CF',
  400: '#A5B6C1',
  500: '#92A7B4',
  600: '#7F97A7',
  700: '#6D889A',
  800: '#5B7A8D',
  900: '#506A7B',
  1000: "#455A69",
  1100: "#3A4C57",
  1200: "#303D47",
  1300: "#253037",
  1400: "#1C2328",
  1500: "#131619",
  1600: "#070A0B",
}

const grey = {
  main: '#E5E5E5',
  '1': '#ECECED',
  '2': '#E5E5E5',
  '3': '#D9DADA',
  '4': '#C6C7C8',
  '5': '#B2B2B2',
  '6': '#999999',
  '7': '#7B7D7E',
  '8': '#686A6C',
  '9': '#555859',
  '10': '#424547',
}
const onPrimary = {
  get main() {
    return '#FFFFFF'
  },
}

const onSecondary = {
  get main() {
    return '#00403A'
  },
}

const btnPrimaryStates = {
  600: '#F53362',
  625: '#F53362',
  650: '#F53362',
  675: '#F53362',
  700: '#F53362',
}

const btnSecondaryStates = {
  200: '#4CFFCF',
  225: '#3CF5C8',
  250: '#28F0BE',
  275: '#20EDB9',
  300: '#1DE9B6',
}

const btnOutlineText = {
  5: '#0066FF0D',
  10: '#0066FF1A',
  15: '#0066FF26',
  20: '#0066FF33',
  30: '#0066FF4D',
  50: '#0066FF80',
  100: '#0066FF',
}

const white = {
  5: '#ffffff0D',
  10: '#ffffff1A',
  15: '#ffffff26',
  20: '#ffffff33',
  30: '#ffffff4D',
  50: '#ffffff80',
  100: '#ffffff',
}

const accent = {
  get main() {
    return '#840CF9'
  },
}

const error = {
  get main() {
    return '#ED0063'
  },
}

const errorLight = {
  get main() {
    return '#FFE3EF'
  },
}

const warning = {
  get main() {
    return '#FFB84D'
  },
}

const success = {
  get main() {
    return '#00AB3A'
  },
}

const pastel = {
  red: '#FF9B9B',
  yellow: '#FFE297',
  green: '#DAFFBD',
  cyan: '#A0FFEE',
  blue: '#5BD8FF',
  purple: '#94BFFF',
}

const palette: IPalette = {
  primary,
  onPrimary,
  secondary,
  onSecondary,
  neutral,
  grey,
  accent,
  error,
  errorLight,
  success,
  warning,
  btnPrimaryStates,
  btnSecondaryStates,
  btnOutlineText,
  white,
  surface: {
    default: '#fff',
  },
  background: {
    default: onPrimary.main, //'#F8FCFF' => this is incorrect color for background,
    paper: '#fafafa',
  },
  onBackground: {
    default: '#17212A',
  },
  pastel,
}

export default palette
