import {Components} from "@mui/material/styles/components";
import palette from "./palette";
import IranSansBoldWoff2 from 'src/assets/fonts/IransansX/IRANSansX-Bold.woff2';
import IranSansBoldWoff from 'src/assets/fonts/IransansX/IRANSansX-Bold.woff';
import IranSansBoldttf from 'src/assets/fonts/IransansX/IRANSansX-Bold.ttf';

import IranSansMediumWoff2 from 'src/assets/fonts/IransansX/IRANSansX-Medium.woff2';
import IranSansMediumWoff from 'src/assets/fonts/IransansX/IRANSansX-Medium.woff';
import IranSansMediumttf from 'src/assets/fonts/IransansX/IRANSansX-Medium.ttf';

import IranSansRegularTtf from 'src/assets/fonts/IransansX/IRANSansX-Regular.ttf';
import IranSansRegularWof from 'src/assets/fonts/IransansX/IRANSansX-Regular.woff';
import IranSansRegularWoff2 from 'src/assets/fonts/IransansX/IRANSansX-Regular.woff2';

const overrides: Components = {
    MuiTypography: {
        styleOverrides: {
            root: {
                fontFeatureSettings: '"ss02"'
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: palette.onPrimary.main,
                transition:"all .3s ease-out,box-shadow .3s ease-out"
            }
        }
    },
    MuiCssBaseline: {

        styleOverrides: `
         body {
            background-color:#FFFFFF;
            '@media (max-width: 760px)': {
                 background-color:#F7F8F9;
             }
         };
        @font-face {
          font-family: 'Iransans';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url(${IranSansRegularWoff2}) format('woff2'),
          url(${IranSansRegularWof}) format('woff'),
          url(${IranSansRegularTtf}) format('truetype');
        };
         @font-face {
          font-family: 'Iransans';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url(${IranSansMediumWoff2}) format('woff2'),
          url(${IranSansMediumWoff}) format('woff'),
          url(${IranSansMediumttf}) format('truetype');
        };
         @font-face {
          font-family: 'Iransans';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url(${IranSansBoldWoff2}) format('woff2'),
          url(${IranSansBoldWoff}) format('woff'),
          url(${IranSansBoldttf}) format('truetype');
        };
        input {
            font-family: 'Iransans';
            font-feature-settings: "ss02";
            
        };
        input::placeholder { 
                font-size: 14px;
         }
        #nprogress {
        pointer-events: none;
         .bar {
        left: 0;
        top: 0;
        height: 3px;
        width: 100%;
        z-index: 2000;
        position: fixed;
        background-color: ${palette.primary[800]};
      }
    }
      `,
    },
    MuiContainer: {
        styleOverrides: {
            maxWidthLg: {
                maxWidth: '1300px !important',
                paddingRight: `0px !important`,
                paddingLeft: `0px !important`,
                '@media (max-width: 900px)': {
                    paddingRight: `16px !important`,
                    paddingLeft: `16px !important`,
                }
            }
        }
    },

    MuiButton: {
        styleOverrides: {
            root: {
                paddingTop: 16,
                paddingBottom: 16,
                paddingRight: 32,
                paddingLeft: 32,
                borderRadius: 8,
                boxShadow: 'none'
            },
            containedPrimary: {
                colorPrimary: {
                    backgroundColor: palette.primary[800]
                }
            }
        }
    },
    MuiIconButton: {
        styleOverrides: {
            root: {},

        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                width: 225,
                fontFeatureSettings: '"ss02"',
                '& .MuiInputBase-input': {
                    fontFamily: 'Iransans',
                    fontSize: 14,
                    fontWeight: 600,
                    border: 0,
                    outline: 'none',
                    color: palette.neutral.main,
                    '&::placeholder': {
                        color: palette.neutral[700],
                        opacity: 1
                    }
                },
                '& .MuiInputBase-root': {
                    minHeight: 50,
                    transition: 'color .17s ease-out, border .17s ease-out, background .17s ease-out',
                    padding: '0 16px 0 16.8px',
                    "&:hover": {
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `1px solid ${palette.grey[1]}`,
                        }
                    },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: `1px solid ${palette.grey[1]}`,
                    borderRadius: 8,
                },

            }
        }
    }
};

export default overrides;
