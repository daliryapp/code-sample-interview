import { makeStyles } from 'src/@core/theme';

const useFooterStyle = makeStyles(({ spacing, palette: { onPrimary, neutral, secondary } }: any) => ({
    footerBg: {
        backgroundColor: secondary[1400],
        position: "relative",
        marginTop: spacing(0)
    },
    socials: {
        '& a': {
            width: 40,
            height: 40,
            position: 'relative',
            background: secondary[1200],
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    phone: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing(3),
        color: onPrimary.main,
        textDecoration: 'none',
        '& path': {
            stroke: onPrimary.main,
        }
    },
    footerTitle: {
        color: neutral[700]
    },
    footerBottomLinks: {

        '& a': {
            position: "relative",
            textDecoration: "none",
            color: neutral[700],
        }
    },
    circles: {
        color: neutral[700],
        right: '-2px',
        width: 4,
        height: 4,
        top: '50%',
        marginTop: '-2px',
        background: 'currentColor',
        borderRadius: '50%',
    },
    accordion: {
        backgroundColor: `transparent !important`,
    },

}), { index: 2 });

export default useFooterStyle;