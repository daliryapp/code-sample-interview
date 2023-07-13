import {makeStyles} from 'src/@core/theme';

const useAppbarStyle = makeStyles<{ stickyclass: boolean }>(({
                                                                 spacing,
                                                                 palette: {onPrimary, neutral, primary}
                                                             }: any) => ({
    appBar: {
        height: 104,
        backgroundColor: "rgba(255,255,255,0.0) !important",
        backdropFilter:
            "blur(3px) saturate(160%) contrast(100%) brightness(110%)",
        padding: spacing(0, 0),
        boxShadow: 'none !important',
        borderBottom: "1px solid hsla(0,0%,100%,.1)",
        zIndex: '6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noTransition: {
        transition: "none !important",
    },
    stickyAppbar: {
        boxShadow: "0 3px 50px rgb(4 71 109 / 10%) !important",
        backgroundColor: `${onPrimary.main} !important`,
        height: 88,
        '@media (max-width: 900px)': {
            boxShadow: 'none !important',
            '&:before': {
                width: '100%',
                height: '1px',
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                content: "''",
                backgroundColor: neutral[1400],
                opacity: 0.1
            }
        }
    },
    appBarLink: {
        transition: "all .3s ease-out,box-shadow .3s ease-out",
        '& a': {
            transition: "color .3s ease-out,box-shadow .3s ease-out",
            color: onPrimary.main,
            textDecoration: 'none',
        }
    },
    appBarLinkSticky: {
        '& a': {
            color: neutral[1400]
        }
    },
    logoContent: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& img': {
            height: '40px !important'
        }
    },
    phone: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing(3),
        '& path': {
            stroke: onPrimary.main,
        }
    },
    stickyPhone: {
        '& path': {
            stroke: neutral[1400],
        }
    }
}), {index: 1});

export default useAppbarStyle;