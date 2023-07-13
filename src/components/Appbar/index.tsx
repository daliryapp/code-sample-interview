import {FC} from "react";
import {
    AppBar,
    Stack,
    Container,
    Typography,
    IconButton,
    Box
} from "@mui/material";
import React, {useState, useEffect} from 'react'
import useAppbarStyle from './appbar.style';
//@ts-ignore
import Image from "next/image";
import classNames from "classnames";
//@ts-ignore
import {useRouter} from 'next/router';
import Link from 'next/link';
import PhoneIcon from 'public/icons/phone.svg';
import UserIcon from 'public/icons/user.svg';
import Line2 from 'public/icons/Line2.svg';
import Line2White from 'public/icons/Line-2-white.svg';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "src/@core/redux/store";
import {toggleSidebar} from "src/@core/redux/reducers/app/appSlice";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import MenuIcon from 'public/icons/menu-2.svg';
import ArrowRightIcon from 'public/icons/arrow-right-menu.svg';

const Appbar: FC = () => {
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const dispatch = useDispatch<AppDispatch>();
    const sidebar = useSelector((state: RootState) => state.app.sidebar);
    const router = useRouter();
    const [stickyclass, setStickyClass] = useState<boolean>(false);
    const classes = useAppbarStyle({stickyclass});
    const stickyClassHandler = (url: string) => {
        if (url === "/") {
            if (!isMobileSize) {
                setStickyClass(false);
                let activeClass = false;
                if (window.scrollY >= 200) {
                    activeClass = true;
                }
                setStickyClass(activeClass);
            } else {
                setStickyClass(true);
            }

        } else {
            setStickyClass(true);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            stickyClassHandler(router.route);
        });
        // eslint-disable-next-line
    }, [router]);
    const onMenuButtonClick = () => {
        dispatch(toggleSidebar());
    }
    return (
        <AppBar position="fixed" className={classNames(classes.appBar, stickyclass ? classes.stickyAppbar : null,router.route.includes('search-result') && classes.noTransition)}>
            <Container
                maxWidth="lg"
                sx={{
                    color: "#fff",
                    p: 0,
                }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={8} py={!stickyclass ? 6 : 6} px={0}
                           className={classNames(classes.appBarLink, stickyclass ? classes.appBarLinkSticky : null)}>
                        <Box sx={{cursor: "pointer"}} onClick={() => {
                            router.push('/');
                            router.push('/');
                        }}>
                            {isMobileSize ? <>
                                <Image src={"/logo/Logo.svg"} width="115" height="40" alt="لوگو"/>
                            </> : <>
                                {!stickyclass ?
                                    <Image src={"/logo/logo-w.svg"} width="115" height="40" alt="لوگو"/>
                                    :
                                    <Image src={"/logo/logo.svg"} width="115" height="40" alt="لوگو"/>
                                }
                            </>}

                        </Box>
                        {!isMobileSize && <>
                            <Link href="/flight"><Typography variant="h6" component="span" fontWeight={700}>بلیط
                                هواپیما</Typography></Link>
                            <Link href="/flight/THR-MHD/1401-06-25"><Typography component="span" variant="h6"
                                                                                fontWeight={700}>جستجوی
                                نقشه</Typography></Link>
                            <a href="#"><Typography variant="h6" component="span" fontWeight={700}>مسیرهای
                                پروازی</Typography></a>
                            <a href="https://yabex.net/qatar2022" target="_blank" rel="noreferrer"><Typography
                                component="span" variant="h6" fontWeight={700}>جام جهانی قطر 2022</Typography></a>
                        </>}
                    </Stack>
                    {!isMobileSize ?
                        <Stack flexDirection="row" alignItems="center" gap={7} p={!stickyclass ? 6 : 3.3} px={0}
                               className={classNames(classes.appBarLink, stickyclass ? classes.appBarLinkSticky : null)}
                        >
                            <a href="tel:02126370020"
                               className={classNames(classes.phone, stickyclass ? classes.stickyPhone : null)}>
                                <Typography variant="h6" component="span" fontWeight={700} dir="ltr">
                                    ۰۲۱ - ۲۶۳۷۰۰۲۰
                                </Typography>
                                <Box>
                                    <PhoneIcon/>
                                </Box>
                            </a>
                            {stickyclass ?
                                <Line2White/>
                                :
                                <Line2/>
                            }
                            <a href="#" className={classNames(classes.phone, stickyclass ? classes.stickyPhone : null)}>
                                <UserIcon/>
                            </a>
                        </Stack>
                        :
                        <IconButton
                            sx={{
                                width: 40,
                                height: 40,
                                mt: -1,
                                p:'10px 6.67px',
                            }} onClick={onMenuButtonClick}>
                            {!sidebar ? <MenuIcon/> : <ArrowRightIcon/>}
                        </IconButton>
                    }
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Appbar;