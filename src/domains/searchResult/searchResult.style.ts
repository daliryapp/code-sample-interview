import {makeStyles} from 'src/@core/theme';

const useSearchResultStyle = makeStyles(({
                                             spacing,
                                             palette: {onPrimary, neutral, primary, success, secondary, grey}
                                         }: any) => ({
    bg: {
        backgroundColor: neutral[25],
    },
    headerSearchIcon: {
        width: 48,
        height: 48,
        backgroundColor: neutral[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    infoIcon: {
        width: 18,
        height: 18,
        marginRight: spacing(-2),
        marginTop: spacing(0.5)
    },
    editButton: {
        color: primary[800],
        padding: '0 !important',
        justifyContent: "flex-start !important",
        marginTop: `${spacing(5.5)} !important`,
        overflow: "hidden",
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity .3s ease-out, visibility .3s ease-out, max-height .3s ease-out, margin-top .3s ease-out !important',
        '& span': {
            color: 'inherit'
        }
    },
    lowerPriceHintBox: {
        backgroundColor: neutral[50],
        width: 314,
        maxHeight: 131,
        height: "100%",
        borderRadius: 16,
        padding: spacing(4, 4.5),
        transition: 'opacity .3s ease-out, visibility .3s ease-out, max-height .3s ease-out',
        '@media (max-width: 900px)': {
            width: "100%",
            borderRadius: 0,
            maxHeight: 80,
        }
    },
    lowerPriceHintText: {
        color: neutral[800],
        '@media (max-width: 900px)': {
            fontSize: '12px !important'
        }
    },
    lowerPriceHintSubTitle: {
        paddingTop: spacing(2),
        color: neutral[600]
    },
    ticketCard: {
        // padding: spacing(4),
        backgroundColor: `${onPrimary.main} !important`,
        borderRadius: `16px !important`,
        border: '1px solid rgba(224, 230, 234, 0.6)',
        boxShadow: 'none !important',
        marginBottom: spacing(4),
        '& .MuiCardContent-root': {
            padding: 0,
            paddingBottom: '0 !important',
        }
    },
    tag: {
        padding: spacing(0.5, 1),
        backgroundColor: neutral[100],
        borderRadius: 4,
        color: neutral[900]
    },
    nullTag: {
        padding: spacing(0.5, 1),
        minHeight: 19,
    },
    tagGreen: {
        color: success.main,
        background: 'rgba(0, 171, 58, 0.1)',
    },
    tagBlue: {
        backgroundColor: secondary.main,
        color: secondary[1000]
    },
    agencyName: {
        color: neutral[900],
        '@media (max-width: 900px)': {
            fontSize: '10px !important'
        }
    },
    agencyCount: {
        color: neutral[500]
    },
    time: {
        color: neutral[900]
    },
    sliderBack: {
        '& .MuiSlider-rail': {
            left: 0,

            '&:after': {
                backgroundImage: `url(/icons/plane-right.svg)  !important`,
                backgroundColor: onPrimary.main,
                right: '-15px !important',
            }
        },
        '& .MuiSlider-thumb': {
            '&:before': {
                backgroundImage: `url(/icons/plane-right.svg) !important`,
                backgroundColor: onPrimary.main,
            }
        },
    },
    slider: {
        width: '100%',
        '& .MuiSlider-root': {
            marginBottom: '0 !important',
        },
        '& .MuiSlider-markLabel': {
            transform: "translateX(0%) translateY(-51px)",
            color: neutral[900],
            fontFeatureSettings: '"ss02"',
            width: '100%',
            right: '0 !important',
            textAlign: 'center',
            fontSize: '10px !important',
            fontWeight: 500
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
            width: '95%',
            '&:after': {
                content: '""',
                backgroundImage: `url(/icons/plane-left.svg)`,
                backgroundColor: onPrimary.main,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                width: 16,
                height: 16,
                position: 'absolute',
                left: '-15px',
                top: '-7.6px',
            }
        },
        '& .MuiSlider-thumb': {
            width: 6,
            height: 6,
            color: primary.main,
            top: '51%'
        }
    },
    noStop: {
        '& .MuiSlider-thumb': {
            color: 'transparent',
            '&:before': {
                content: '""',
                backgroundImage: `url(/icons/plane-left.svg)`,
                backgroundColor: onPrimary.main,
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
    priceBox: {
        borderRight: '1px solid rgba(224, 230, 234, 0.6)',
        maxWidth: 265,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing(0, 3),
        '@media (max-width: 900px)': {
            maxWidth: 'unset',
            borderRight: 'none',
            borderTop: '1px solid rgba(224, 230, 234, 0.6)',
            paddingTop: spacing(4),
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            gap: spacing(3),
            padding: spacing(0),
        }
    },
    greenText: {
        color: success.main
    },
    agencyText: {
        paddingTop: spacing(2),
        color: neutral[900],
        '@media (max-width: 900px)': {
            fontSize: '11px !important'
        }
    },
    selectButton: {
        marginTop: `${spacing(2)} !important`,
        width: '100% !important',
        maxWidth: 201,
        height: '50px !important',
        fontWeight: `900 !important`,
        color: "#FFF !important",
        borderRadius: `8px !important`,
        backgroundColor: `${primary[800]} !important`,
        '@media (max-width: 900px)': {
            maxWidth: 180
        }
    },
    mod: {
        paddingTop: spacing(2),
        color: neutral[500],
    },
    selectdDaysSkeletone: {
        height: 90,
        marginLeft: spacing(4)
    },
    slectDaysCard: {
        position: "relative",
        padding: spacing(0),
        backgroundColor: `${onPrimary.main} !important`,
        borderRadius: `16px !important`,
        boxShadow: 'none !important',
        marginBottom: spacing(4),
        minHeight: 94,
        '& .swiper-slide': {
            display: "flex",
            justifyContent: "center"
        },
        '& .MuiCardContent-root': {
            padding: 0,
            paddingBottom: '0 !important',
        },
    },
    daySelectTitle: {
        color: neutral[400]
    },
    dayItem: {
        cursor: "pointer",
        borderBottom: "3px  solid transparent",
        height: "100%",
        position: "relative",
        padding: spacing(4),
        width: 88,
        '&:after': {
            content: '""',
            height: '60%',
            width: 1,
            backgroundColor: 'rgba(224, 230, 234, 0.6)',
            position: "absolute",
            left: -10
        }
    },
    expensiveItem: {
        cursor: "pointer",
        position: "relative",
        padding: spacing(4),
        paddingBottom: spacing(3),
        width: 154,
        height: 118,
        '& h4': {
            '& span': {
                color: neutral[900]
            }
        }
    },
    expensiveItemMobile: {
        cursor: "pointer",
        position: "relative",
        paddingRight: spacing(3),
        width: '100%',
        height: 43,
        '& h6': {
            '& span': {
                color: neutral[900]
            }
        }
    },
    activeExpensiveMobile: {
        '&:before': {
            content: '""',
            position: "absolute",
            right: 0,
            top: 5,
            width: "4px",
            height: '100%',
            backgroundColor: secondary[800]
        },
        '& h4': {
            '& span': {
                color: secondary[800]
            }
        }
    },
    activeDay: {
        '&:before': {
            content: '""',
            position: "absolute",
            bottom: -2,
            right: 0,
            width: "100%",
            height: 3,
            backgroundColor: secondary[800]
        },
        '& h3': {
            '& span': {
                color: secondary[800]
            }
        }
    },
    activeExpensive: {
        '&:before': {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: 3,
            backgroundColor: secondary[800]
        },
        '& h4': {
            '& span': {
                color: secondary[800]
            }
        }
    },
    expensiveCard: {
        position: "relative",
        backgroundColor: `${onPrimary.main} !important`,
        borderRadius: `16px !important`,
        boxShadow: 'none !important',
        marginBottom: spacing(4),
        '& .MuiCardContent-root': {
            padding: 0,
            paddingBottom: '0 !important',
        },
    },
    expensiveCardMobile: {
        position: "relative",
        backgroundColor: `${onPrimary.main} !important`,
        borderRadius: `8px !important`,
        boxShadow: 'none !important',
        marginBottom: spacing(4),
        '& .MuiCardContent-root': {
            padding: 0,
            paddingBottom: '0 !important',
        },
        '& fieldset': {
            borderRadius: `8px`,
        }
    },
    expensiveTime: {
        color: neutral[900]
    },
    expensivePrice: {
        color: grey[7]
    },
    divider: {
        height: 90,
        marginTop: spacing(3),
        marginRight: spacing(2),
        marginLeft: spacing(2),
        backgroundColor: 'rgba(224, 230, 234, 0.6)',
        width: 1
    },
    expensivePopover: {
        '& .MuiPopover-paper': {
            minWidth: 226,
            padding: spacing(4),
            borderRadius: 16,
            overflow: "visible",
            zIndex: 2,
            backgroundColor: onPrimary.main,
            marginLeft: -95,
            '@media (max-width: 1350px)': {
                marginLeft: -56,
            },
            '@media (max-width: 1290px)': {
                marginLeft: -23,
            },
            '@media (max-width: 1220px)': {
                marginLeft: 36,
            },
            '@media (max-width: 1050px)': {
                marginLeft: 64,
            },
            '&:before': {
                content: "''",
                position: 'absolute',
                right: -6,
                top: 62,
                width: 22,
                height: 22,
                backgroundColor: onPrimary.main,
                transform: 'rotate(45deg)',
                zIndex: 1,
            }
        }

    },
    responsivePopover: {
        '& .MuiPopover-paper': {
            minWidth: 225,
            paddingTop: spacing(6),
            paddingBottom: spacing(6),
            paddingLeft: spacing(4),
            borderRadius: 16,
            overflow: "visible",
            zIndex: 2,
            backgroundColor: onPrimary.main,
            marginTop:178,
            '&:before': {
                content: "''",
                position: 'absolute',
                top: -6,
                left: 20,
                width: 22,
                height: 22,
                backgroundColor: onPrimary.main,
                transform: 'rotate(45deg)',
                zIndex: -1,
            }
        }

    },
    filterButton: {
        border: `1.5px solid ${primary[800]} !important`,
        borderRadius: '8px !important'
    },
    progress: {
        maxWidth: 399,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiLinearProgress-root': {
            height: 8,
            borderRadius: 16,
            backgroundColor: neutral[100],
        },
        "& .MuiLinearProgress-bar": {
            backgroundColor: neutral[800],
        }
    },
    timeoutContainer: {
        maxWidth: 480,
        width: "100%",
        minHeight: 325,
        backgroundColor: onPrimary.main,
        borderRadius: 16,
        padding: spacing(8)
    },
    outlinedButton: {
        border: `2px solid ${primary.main} !important`,
        borderRadius: '8px !important',
        height: 50
    },
    containedButton: {
        color: `${onPrimary.main} !important`,
        height: 50

    },
    adsBox: {
        width: 204,
        height: 204,
        borderRadius: 8,
        backgroundColor: neutral[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        '& img': {
            position: "relative !important",
            width: "100% !important",
            height: "100% !important",

        }
    },
    adsBoxHug: {
        marginTop: spacing(4),
        width: 204,
        height: 'auto',
        borderRadius: 8,
        backgroundColor: neutral[100],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        '& img': {
            position: "relative !important",
            width: "100% !important",
            height: "100% !important",

        }
    },
    closeCollapse: {
        position: "absolute",
        left: 0,
        height: '34px !important',
        top: '-34px',
        color: `${neutral.main} !important`,
        minWidth: '80px !important',
        backgroundColor: `${neutral[20]} !important`,
        padding: `0 !important`,
        borderBottomRightRadius: '0 !important',
        borderBottomLeftRadius: '0 !important',
        borderTopRightRadius: '16px !important',
        borderTopLeftRadius: '16px !important',

    },
    collpase: {
        backgroundColor: `${neutral[20]} !important`,
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
                marginLeft: "9.06em !important"
            }
        }
    },
    sortSelect: {
        position: "relative",
        '& .MuiSelect-select': {
            paddingRight: `${spacing(4)} !important`,
            fontSize: 14,
            fontWeight: 600,
            color: neutral.main
        },
        '& svg': {
            display: 'none'
        },
        '&:before': {
            content: "''",
            position: "absolute",
            backgroundImage: `url(/icons/chevron-down-sort.svg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: 16,
            height: 16,
            left: spacing(4)

        },

    },
    sortSelectMobile: {
        position: "relative",
        backgroundColor: `${onPrimary.main} !important`,
        color: `${neutral.main} !important`,
        paddingRight: `${spacing(4)} !important`,
        textAlign: "start",
        justifyContent: "flex-start !important",
        border: `1px solid ${neutral[100]} !important`,
        borderRadius: 8,
        height: 50,

        '&:before': {
            content: "''",
            position: "absolute",
            backgroundImage: `url(/icons/chevron-down-sort.svg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: 16,
            height: 16,
            left: spacing(4)

        },

    },
    priceTypo: {
        '@media (max-width: 900px)': {
            fontSize: '16px !important'
        }
    }
}), {index: 7});

export default useSearchResultStyle;