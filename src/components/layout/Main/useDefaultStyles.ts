import { makeStyles } from 'src/@core/theme'

const useHeaderStyle = makeStyles(
  ({ palette: { primary, background }, shadows, spacing, grey }: any) => ({

    root: {
      // direction: 'rtl'
    },
    appBar: {},

  }),
  { name: 'default-Layout' },
)

export default useHeaderStyle
