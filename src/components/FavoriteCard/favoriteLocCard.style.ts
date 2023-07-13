import { makeStyles } from 'src/@core/theme';

const useFavoriteLocCadStyle = makeStyles(({ spacing, palette: { onPrimary, neutral, primary } }: any) => ({
    card: {
        width: 247,
        height: 370,
        borderRadius: '16px !important',
        position: "relative",
    },

}), { index: 9 });

export default useFavoriteLocCadStyle;