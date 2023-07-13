import { makeStyles } from 'src/@core/theme';

const useCustomeRadioStyle = makeStyles(({ spacing, palette: { onPrimary, neutral, primary, grey } }: any) => ({
    customeRadio: {
        color: grey[7],
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::before': {
            content: '""',
            display: 'inline-block',
            verticalAlign: 'middle',
            width: 18,
            height: 18,
            border: '1px solid',
            borderColor: grey[3],
            boxShadow: `inset 0 0 0 8px ${onPrimary.main}`,
            borderRadius: '50%',
            marginLeft: spacing(2),
            transition: '.3s ease-out',
        }
    },
    active: {
        '&::before': {
            backgroundColor: primary[800],
            boxShadow: `inset 0 0 0 4px ${onPrimary.main}`
        }
    },
    customeRadioDisable: {
        cursor: "no-drop"
    }

}), { index: 4 });

export default useCustomeRadioStyle;