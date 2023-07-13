import {FC} from "react";
import {Box, Drawer, CssBaseline, Button, Stack, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "src/@core/redux/store";
import {toggleFilterSidebar} from "src/@core/redux/reducers/app/appSlice";
import Filters from 'src/components/Filters';
import FlightTab from "@/domains/landing/components/flight.tab";
import ArrowRightIcon from '/public/icons/arrow-right.svg';
import {position} from "stylis";
import ListSearch from "../../../public/icons/list-search.svg";

const SideBar: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const sidebar = useSelector((state: RootState) => state.app.sidebarFilter);
    const onDrawerToggle = () => {
        dispatch(toggleFilterSidebar());
    };

    return (
        <>
            <CssBaseline/>
            <Drawer
                open={sidebar}
                onClose={onDrawerToggle}
                anchor={"right"}
                sx={{
                    top: 0,
                    '& .MuiBackdrop-root': {
                        top: 0
                    },
                    '& .MuiDrawer-paperAnchorRight': {
                        top: 0,
                        boxShadow: 'none',
                        // right: '0 !important',
                        // left: 'unset !important',
                        minWidth: '285px',
                        width: '100%',
                        backgroundColor: "onPrimary.main",
                        paddingBottom: 25,
                    },
                }}
            >
                <Box sx={{
                    '& #filter-box': {
                        border: 'none'
                    }
                }}>
                    <Box sx={{
                        height: 64,
                        width: '100%',
                        position: 'relative',
                        '&:before': {
                            content: "''",
                            backgroundColor: 'neutral.main',
                            opacity: 0.1,
                            width: '100%',
                            height: '1px',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                        }
                    }}>
                        <Button variant={"text"} onClick={onDrawerToggle}>
                            <Stack flexDirection={"row"} alignItems="center" gap={1}>
                                <ArrowRightIcon/>
                                <Typography variant={"h6"} fontWeight={700} sx={{color: 'neutral.main'}}>
                                    جزئیات جستجو
                                </Typography>

                            </Stack>
                        </Button>
                    </Box>
                    <FlightTab pageUse='PLP' closeSideBar={onDrawerToggle}/>
                    <Box sx={{
                        backgroundColor: 'neutral.main',
                        opacity: 0.1,
                        width: '100%',
                        height: '1px',
                        mb: 4
                    }}></Box>
                    <Box sx={{mt: 13}}>
                        <Filters />
                    </Box>
                </Box>
            </Drawer>
        </>);
}
export default SideBar;