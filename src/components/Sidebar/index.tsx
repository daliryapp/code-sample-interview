import { FC, forwardRef } from "react";
import { Box, Drawer, CssBaseline, Stack, Typography } from '@mui/material';
import useMenuListStyle from './MenuStyle';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/@core/redux/store";
//@ts-ignore
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { toggleSidebar } from "src/@core/redux/reducers/app/appSlice";
import RedUserIcon from "public/icons/red-user.svg"

const SideBar: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const sidebar = useSelector((state: RootState) => state.app.sidebar);
    const classes = useMenuListStyle();
    const onDrawerToggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <>
            <CssBaseline />
            <Drawer
                open={sidebar}
                onClose={onDrawerToggle}
                dir="rtl"
                anchor="right"
                sx={{
                    top: 88,
                    '& .MuiBackdrop-root': {
                        top: 88
                    },
                    '& .MuiDrawer-paperAnchorRight': {
                        top: 88,
                        // right: '0 !important',
                        // left: 'unset !important',
                        minWidth: '318px',
                        backgroundColor: "onPrimary.main",
                        boxShadow: 'none',
                    }
                }}
            >
                <Box className={classes.menuListScrollWrapper}>
                    <Stack flexDirection="row" alignItems="center" gap={2} mb={6.25}>
                        <RedUserIcon />
                        <Typography variant="h6" color="primary.main" fontWeight={700}>ورود به حساب کاربری</Typography>
                    </Stack>
                    <Box className={classes.divider}></Box>
                    <Typography variant="h6" fontWeight={700} mb={6}>بلیط هواپیما</Typography>
                    <Typography variant="h6" fontWeight={700} mb={6}>جستجوی نقشه</Typography>
                    <Typography variant="h6" fontWeight={700} mb={6}>مسیرهای پروازی</Typography>
                    <Typography variant="h6" fontWeight={700} mb={6}>جام جهانی قطر ۲۰۲۲</Typography>
                </Box>
            </Drawer>
        </>);
}
export default SideBar;