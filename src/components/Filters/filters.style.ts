import {makeStyles} from 'src/@core/theme';

const useFilterStyle = makeStyles(({spacing, palette: {primary, onPrimary, neutral}}: any) => ({
    clearFilter: {
        padding: '0 !important',
        height: 'auto !important',
        minWidth: "unset !important",
        '& span': {
            color: primary.main,

        }
    },
    filterBox: {
        paddingRight: spacing(5),
        paddingLeft: spacing(5),
        paddingBottom: spacing(5),

        '& .MuiAccordion-root': {
            boxShadow: 'none',
            position: "relative",
            backgroundColor: "transparent",
            '&.Mui-disabled': {
                backgroundColor: 'transparent !important'
            },
            '&:before': {
                backgroundColor: neutral[100],
                top: "unset",
                bottom: 0,
                opacity: '1 !important',
                zIndex: 1,
                height: 1
            },
            '& .MuiAccordionSummary-root': {
                padding: 0,
            },
            '& .MuiAccordionSummary-content': {
                margin: spacing(6, 0),
            },
            '& .MuiAccordionDetails-root': {
                padding: 0,
                paddingBottom: spacing(3.75),
                '& nav': {
                    padding: 0,
                }
            }
        }
    },
    categoryText: {
        color: `${primary.main} !important`,
        fontWeight: '500 !important'
    },
    categoryButton: {
        '& .MuiListItemIcon-root': {
            minWidth: 30,

        }
    },
    priceField: {
        height: 40,
        '& fieldset': {
            borderRadius: 12
        },
    },
    sliderBox: {
        // marginRight: '-15px',
        // marginLeft: '27px',
        '& .MuiSlider-track': {
            color: neutral[800],
            // transform: "translate(-19px, -3px)"
        },
        '& .MuiSlider-thumb': {
            color: neutral[800],
            '&:hover': {
                boxShadow: "0px 0px 0px 8px rgba(91, 122, 141, 0.16) !important"
            }

        },
        '& .MuiSlider-rail': {
            color: neutral[200],
            // left: '-20px',
        },
        '& .Mui-focusVisible': {
            boxShadow: "0px 0px 0px 8px rgba(91, 122, 141, 0.16) !important"
        }
    },
    sliderText: {
        '& span': {
            color: neutral[800]
        }
    },
    switch: {
        '& .MuiSwitch-thumb': {
            color: primary.main
        }
    },
    subtitleColor: {
        color: neutral[600]
    },
    checkBoxLabel: {
        color: `${neutral[800]} !important`,
    },
    checkBox: {
        color: `${neutral[800]} !important`,
        padding: 0,

        '&:hover': {
            backgroundColor: "rgba(91, 122, 141, 0.19) !important"
        },
        '& svg': {
            color: neutral[800],
        }
    },
    collpase: {
        backgroundColor: `transparent !important`,
    },
    tooltip: {
        '& .MuiTooltip-tooltip': {
            height: 39,
            width: 69,
            backgroundColor: neutral.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            marginLeft: 0,
            marginRight: spacing(3.5),

        }
    },
}), {index: 5});

export default useFilterStyle;