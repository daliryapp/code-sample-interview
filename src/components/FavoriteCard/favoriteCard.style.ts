import { makeStyles } from 'src/@core/theme';

const useFavoriteCadStyle = makeStyles(({ spacing, palette: { onPrimary, neutral, primary } }: any) => ({
    dateText: {
        color: neutral[900]
    },
    card: {
        width: 287,
        border: '1px solid',
        borderColor: neutral[100],
        borderRadius: '16px !important',
        backgroundColor: `${onPrimary.main} !important`,
        padding: spacing(2),
        '& .MuiCardMedia-root': {
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
        }
    },
    flightIcon: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0,
        backgroundColor: primary[800],
        borderRadius: 8,
        width: 32,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: spacing(4)
    }
}), { index: 9 });

export default useFavoriteCadStyle;