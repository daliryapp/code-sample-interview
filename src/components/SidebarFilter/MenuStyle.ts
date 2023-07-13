import { makeStyles } from 'src/@core/theme';

const useMenuListStyle = makeStyles(({ spacing, palette: { onPrimary, neutral, primary, error } }: any) => ({
    // menuListScrollWrapper: {
    //     overflowY: 'auto',
    //     height: '85vh',
    //     padding: spacing(6.75, 5.5)
    // },
    // divider: {
    //     // borderBottom: `1px solid ${neutral[100]}`,
    //     width: '100%',
    //     marginBottom: spacing(6)
    // }
})
    , { classNamePrefix: 'MenuListStyle' });

export default useMenuListStyle;