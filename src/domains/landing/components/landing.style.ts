import {makeStyles} from 'src/@core/theme';

const useSearchStyle = makeStyles(({spacing, palette: {onPrimary, neutral, primary, grey}}: any) => ({
    tabs: {
        height: 71,
        '& .MuiTabs-indicator': {
            backgroundColor: 'transparent'
        },
        '& .MuiTabs-flexContainer': {
            height: 71,
            backgroundColor: neutral[50],
            '@media (max-width: 760px)': {
                backgroundColor: 'transparent',
                color: neutral[700]
            },
            '& .Mui-selected': {
                backgroundColor: onPrimary.main,
                '@media (max-width: 760px)': {
                    backgroundColor: 'transparent',
                    color: neutral[1400]
                }
            },
            '& .Mui-disabled': {
                opacity: 1,
                cursor: "no-drop"
            }
        }
    },
    badge: {
        backgroundColor: primary[1000],
        borderRadius: spacing(2),
        padding: spacing(1, 2),
        color: onPrimary.main
    },
    hr: {
        width: "100%",
        opacity: 0.6,
        borderBottom: `1px solid ${neutral[100]}`,

    },
    inputLabel: {
        color: neutral[700]
    },
    inputSearchLocation: {
        background: onPrimary.main,
        border: `1px solid ${grey[1]}`,
        borderRadius: 8,
        fontWeight: 600,
        color: grey[10],
        padding: spacing(3, 4, 3, 4.2),
        transition: 'color .17s ease-out, border .17s ease-out, background .17s ease-out',
        maxWidth: '100%',
        position: 'relative',
        width: 225,
        minHeight: 50,
        '@media (max-width: 1177px)': {
            width: 205,
        },
        '@media (max-width: 1140px)': {
            width: 190,
        },
        '@media (max-width: 1100px)': {
            width: 180,
        },

        '& input': {
            fontFamily: 'Iransans',
            width: '98%',
            fontSize: 14,
            fontWeight: 600,
            border: 0,
            outline: 'none',
            color: neutral[1400],
            '&::placeholder': {
                color: neutral[700],
            }
        }
    },
    noRadiusLeft: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    noRadiusRight: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    searchTabPanel: {
        overflow: 'visible'
    },
    searchButton: {
        minWidth: `163px !important`,
        height: 50,
        marginTop: `${spacing(6.5)} !important`,
        '@media (max-width: 760px)': {
            marginTop: '0 !important',
            width: '100%'
        }
    },
    searchButtonPlp: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        left: 16,
        width: "auto",
        zIndex:5
    },
    beforeTravelYabex: {
        color: neutral[900]
    },
    bgBeforeTravel: {
        backgroundColor: neutral[50],
        height: 585
    },
    faqDesc: {
        color: neutral[900],
        paddingBottom: spacing(4)
    },
    accordion: {
        backgroundColor: 'transparent !important',
        borderBottom: `1px solid ${neutral[100]} !important`,
    },
    accordion2: {
        backgroundColor: `${onPrimary.main} !important`,
    },
    color900: {
        color: neutral[900],
    },
    deactiveTabColor: {
        color: neutral[900]
    },
    activeTabColor: {
        color: primary[800]
    },
    flightButton: {
        width: '100% !important',
        '& button': {
            height: 50,
            width: '100% !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
            padding: '0 !important',
            borderColor: `${neutral[100]} !important`
        },
        '& .Mui-disabled': {
            backgroundColor: neutral[50],
            color: neutral[400],
        }

    },
    fullWidthInput: {
        width: '100%',
        position: "relative",
        '& .MuiFormControl-root': {
            width: '100%',

        },
        '& .MuiFormHelperText-root': {
            position: "absolute",
            top: 54,
            textAlign: "start",
            width: "100%",
        }
    },
    withTwoLineTravel: {
        marginTop: '-1px !important',
        '& .MuiInputBase-root': {
            '& fieldset': {
                borderRight: 0,
                borderLeft: 0,
                borderTop: `1px solid ${grey[1]}`,
                borderBottom: 0
            }
        }
    },
    noBorder: {
        border: 0,
        width: '100%',
        position: "relative",
        paddingRight: spacing(10),
        "&::before": {
            content: '""',
            position: 'absolute',
            right: '16px',
            top: '22px',
            bottom: '25px',
            width: '10px',
            height: '10px',
            background: '#fff',
            border: `1px solid ${grey[1]}`,
            borderRadius: '50%',
            zIndex: 2,
        }
    },
    mobileLocationBorder: {
        border: `1px solid ${neutral[100]}`,
        borderRadius: 8,
        position: "relative"
    },
    dateBoxNoBorder: {
        borderRadius: 8,
        position: "relative"
    },
    borderBox: {
        border: `1px solid ${neutral[100]}`,
    },
    dateBox: {
        width: '115%',
        position: 'relative',

        '& #date1': {
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${grey[1]}`
            },
            '& input': {
                paddingLeft: 0,
            },
            '& fieldset': {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: 0,
            }
        },
        '& #date2': {
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${grey[1]}`
            },
            '& input': {
                paddingLeft: 0,
            },
            '& fieldset': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: 0,

            }
        }
    },
    dateBox2: {
        width: '115%',
        position: 'relative',

        '& #date1': {
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${grey[1]}`
            },
            '& input': {
                paddingLeft: 0,
            },
        },
        '& #date2': {
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${grey[1]}`
            },
            '& input': {
                paddingLeft: 0,
            },
            '& fieldset': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: 0,

            }
        }
    },
    dateDivider: {
        background: '#b1b1b1',
        width: 1,
        height: '38%',
        bottom: 0,
        zIndex: 2,
        marginTop: '28px',
    },
    divider: {
        borderBottom: `1px solid ${neutral[100]}`,
        width: '79%',
        opacity: 0.6,
        position: "relative",
    },
    rightDivider: {
        position: 'absolute',
        right: '21px',
        top: '25px',
        bottom: '25px',
        width: '1px',
        height: '56px',
        background: grey[1],
        zIndex: 1
    },
    favoriteMobileBox: {
        border: `1px solid ${grey[1]}`,
        padding: spacing(4),
        borderRadius: 8,
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        color: grey[7],
        textDecoration: "none",
    },
    curve: {
        position: 'relative',
        width: '100%',
        '& svg': {
            width: '100%',
            height: 'auto',
            display: 'block'
        },
        '@media (min-width: 900px)': {
            marginTop: "-37px"
        },
        '@media (min-width: 1300px)': {
            marginTop: "-62px"
        },
        '@media (min-width: 2000px)': {
            marginTop: "-95px"
        },
        '@media (min-width: 3000px)': {
            marginTop: "-185px"
        },
        '@media (min-width: 4500px)': {
            marginTop: "-300px"
        },
        '@media (min-width: 5500px)': {
            marginTop: "-458px"
        },

    },
    radioText: {
        color: neutral[900]
    },
    disableText: {
        color: neutral[400]
    },


}), {index: 6});

export default useSearchStyle;