import {makeStyles} from 'src/@core/theme';

const useTicketDetailStyle = makeStyles(({
                                             spacing,
                                             palette: {onPrimary, neutral, primary, success, secondary}
                                         }: any) => ({
    ticketDetailContainer: {
        width: 640,
        backgroundColor: onPrimary.main,
        padding: spacing(8),
        position: "relative",
        '@media (max-width: 900px)': {
            width: '100%',
            padding: spacing(6, 4),
        }
    },
    routeIcon: {
        width: 48,
        height: 48,
        backgroundColor: neutral[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '50% !important'
    },
    closeIcon: {
        position: "absolute",
        top: 33,
        left: 16,
        '@media (max-width: 900px)': {
            top: 14,
            left: 3
        }
    },
    divider: {
        border: `1px solid ${neutral[100]}`,
        width: '100%',
    },
    flightInfoBox: {
        backgroundColor: neutral[50],
        padding: spacing(8, 8.5),
        width: '100%',
        '@media (max-width: 900px)': {
            padding: spacing(8, 4),
        }
    },
    flightCard: {

        borderRadius: '16px !important',
        padding: spacing(4),
        width: "100%",
        '@media (max-width: 900px)': {}
    },
    sliderBack: {
        '& .MuiSlider-rail': {
            '&:after': {
                backgroundImage: `url(/icons/plane-right.svg)  !important`,
                right: '-3px !important',
            }
        },
        '& .MuiSlider-thumb': {
            '&:before': {
                backgroundImage: `url(/icons/plane-right.svg) !important`,
            }
        },
    },
    slider: {
        width: '100%',
        '& .MuiSlider-root': {
            marginBottom: 0,
            marginTop: spacing(3.25)
        },
        '& .MuiSlider-markLabel': {
            transform: "translateX(0%) translateY(-51px)",
            color: neutral[900],
            fontFeatureSettings: '"ss02"',
            width: '100%',
            right: '0 !important',
            textAlign: 'center',
            fontSize: '10px !important',
            fontWeight: 500,

        },
        '& .MuiSlider-valueLabelOpen': {
            transform: 'translateY(23px) scale(1) !important',
            backgroundColor: 'transparent',
            color: primary.main,
            fontWeight: 600,
            fontSize: 10,
            '&:before': {
                display: 'none'
            }
        },
        '& .MuiSlider-rail': {
            color: neutral[400],
            opacity: 1,
            '&:after': {
                content: '""',
                backgroundImage: `url(/icons/plane-left.svg)`,
                backgroundColor: neutral[50],
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                width: 16,
                height: 16,
                position: 'absolute',
                left: '-3px',
                top: '-7px',
            }
        },
        '& .MuiSlider-thumb': {
            width: 6,
            height: 6,
            color: primary.main,
        }
    },
    noStop: {
        '& .MuiSlider-thumb': {
            color: 'transparent',
            '&:before': {
                content: '""',
                backgroundImage: `url(/icons/plane-left.svg)`,
                backgroundColor: neutral[50],
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                width: 16,
                height: 16,
            }
        },
        '& .MuiSlider-valueLabelOpen': {
            display: 'none',
        },
        '& .MuiSlider-rail': {
            '&:after': {
                display: "none"
            }
        }
    },
    time: {
        color: neutral[900]
    },
    accordion: {
        backgroundColor: 'transparent !important',
        boxShadow: "none !important",
        border: `1px solid rgba(224, 230, 234, 0.8)`,
        borderRadius: '16px !important',
        marginTop: `${spacing(2)} !important`,
        '&:before': {
            opacity: '0 !important'
        },
        '& .MuiAccordionSummary-root': {
            '@media (max-width: 900px)': {
                alignItems: "flex-start",
                '& .MuiAccordionSummary-expandIconWrapper': {
                    position: 'absolute',
                    left: '20px',
                    top: '7px',
                }
            }
        },
        '& .MuiAccordionSummary-content': {
            margin: '0 !important',
            '@media (max-width: 900px)': {
                paddingTop: spacing(4)
            }
        }
    },
    agencyBox: {
        height: 82,
        backgroundColor: onPrimary.main,
        padding: spacing(4),
        width: "100%",
        borderRadius: '16px !important',
        marginBottom: spacing(2),
        '@media (max-width: 900px)': {
            height: 'auto',
        }
    },
    agencyName: {
        color: neutral[900]
    },
    reserveButton: {
        width: '140px !important',
        height: '50px !important',
        borderRadius: '8px !important',
        color: `${primary.main} !important`,
        border: `2px solid ${primary.main} !important`
    },
    price: {
        color: neutral[900]
    },
    priceGreen: {
        color: success.main
    },
    containedButton: {
        width: '140px !important',
        height: '50px !important',
        borderRadius: '8px !important',
        border: `2px solid ${primary.main} !important`,
        color: primary.main,

        '&:hover': {
            backgroundColor: `${primary.main} !important`,
            color: `${onPrimary.main} !important`,
        }
    },
    tagBox: {
        padding: spacing(0.5, 1),
        borderRadius: 4,
        backgroundColor: neutral[100],
        color: neutral[900]
    },
    tagBoxGreen: {
        color: success.main,
        backgroundColor: 'rgba(0, 171, 58, 0.1)'
    },
    tagBoxBlue: {
        backgroundColor: secondary[100],
        color: secondary[800]
    },
    ticketDetailTime: {
        color: neutral[900]
    },
    stopBox: {
        backgroundColor: 'rgba(224, 230, 234, 0.6)',
        borderRadius: '8px',
        paddingTop: spacing(2.25),
        paddingBottom: spacing(2),
        paddingRight: spacing(11),
        color: primary.main,
        margin: spacing(5, 0),
        '@media (max-width: 900px)': {
            paddingRight: spacing(2),
        }
    },
    mobileClockText: {
        color: neutral[400]
    },
    tooltip: {
        '& .MuiTooltip-tooltip': {
            height: 39,
            width: 100,
            backgroundColor: neutral.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            marginLeft: 0,
            marginRight: spacing(3.5),
            '& .MuiTooltip-arrow': {
                marginLeft: "0.06em !important"
            }
        }
    },
    changeButtons: {
        position: "fixed",
        right: 0,
        bottom: 24,
        width: 40,
        height: 96,
        marginRight: '682px !important'
    },
    changeFlighBtnt: {
        width: '40px',
        height: '40px',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        backgroundColor: `${onPrimary.main} !important`,
        borderRadius: '50px !important',
    },
    disableBtn: {
        cursor: 'default !important',
        '& svg': {
            filter: 'grayscale(1)',
        }
    }
}), {index: 10});

export default useTicketDetailStyle;