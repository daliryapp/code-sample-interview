import {useEffect, useMemo, useState} from "react";
import {
    Box,
    Typography,
    Container,
    Stack,
    Button,
    IconButton,
    Collapse,
    Skeleton
} from "@mui/material";
import LinearProgress, {LinearProgressProps} from '@mui/material/LinearProgress';
import useSearchResultStyle from '../searchResult.style';
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import classNames from "classnames";
import {setCompleteSearch, toggleFilterSidebar} from "src/@core/redux/reducers/app/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "src/@core/redux/store";
import FlightTab from 'src/domains/landing/components/flight.tab';
import {countToStr, setAvailableFilters, SmoothScroll} from "src/@core/utils/utils";
import SearchIcon from 'public/icons/search.svg';
import InfoCircleIcon from 'public/icons/info-circle.svg';
import PencilIcon from 'public/icons/pencil.svg';
import ChartBarIcon from 'public/icons/chart-bar.svg';
import FilterIcon from 'public/icons/filter.svg';
import CloseIcon from 'public/icons/x.svg';
import {useGetFetchQuery} from "@/_hooks/search/search.hook";
import {useRouter} from "next/router";
import {BootstrapTooltip} from '@/components/bootstrapTooltip';
import TimeoutModal from './timeoutModal';
import {height} from "@mui/system";

let stopRunTimeoutModal = false;

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 0}}>
                <LinearProgress variant="determinate" sx={{transform: "rotate(180deg)"}} {...props} />
            </Box>
            <Box sx={{minWidth: 35, mr: 2}}>
                <Typography variant="subtitle2" fontWeight={700} color="text.secondary">{`%${Math.round(
                    props.value,
                )}`}</Typography>
            </Box>
        </Box>
    );
}


const SearchResultHeader = ({
                                extra,
                                date,
                                return_date,
                                is_internal,
                                pageTitle,
                                adult,
                                cabin,
                                child,
                                infant,
                                loading
                            }: any) => {
    const router = useRouter();
    const completeSearch = useSelector((state: RootState) => state.app.completeSearch);
    const modal = useSelector((state: any) => state.app.modal);
    const slug = (router.query.slug as string[]) || [];
    const tripType: string | undefined = slug?.[3]?.toString();
    const [percent, setPercent] = useState(0);
    const [isSearchPress, setIsSearchPress] = useState(false);
    const [previusData, setPreviusData] = useState<any>(null);
    const data = useGetFetchQuery("search2");
    const dataSearch: any = useMemo(() => data[data.length - 1][1], [data]);
    const searchNoResult = useSelector((state: RootState) => state.app.searchNoResult);

    useEffect(() => {
        if (dataSearch && dataSearch.hasOwnProperty('filters')) {
            setPreviusData(dataSearch);
        }
    }, [dataSearch]);
    const availableFilters = useMemo(() => setAvailableFilters(previusData?.filters), [previusData])
    const classes = useSearchResultStyle();
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const passengers = {adult, cabin, child, infant};
    const [editSearchExpanded, setEditSearchExpanded] = useState<string | false>(false);
    const dispatch = useDispatch<AppDispatch>();
    const onFilterButtonClick = () => {
        dispatch(toggleFilterSidebar());
    }
    const handleChangeEditSearch =
        (panel: string) => {
            if (editSearchExpanded === panel) {
                setEditSearchExpanded(false);
            } else {
                setEditSearchExpanded(panel);
            }
        };
    const flightData: any[] = useMemo(() => {
        let retData = [];
        if (previusData) {
            switch (tripType) {
                case "1":
                    retData = previusData?.flights;
                    break;
                case "2":
                    retData = previusData?.went;
                    break;
                default:
                    retData = previusData?.flights;
                    break;
            }
        }
        return retData;
    }, [previusData, tripType]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!!previusData) {
                if (previusData?.next && percent < 100) {
                    setPercent(percent + 5);
                } else {
                    setPercent(100);
                    setIsSearchPress(false);
                    dispatch(setCompleteSearch(true));
                    clearTimeout(timer);
                }
            }
        }, 5000); // 10 min for research user
        return () => clearTimeout(timer);
    }, [percent, previusData, dispatch]);
    useEffect(() => {
        if (router.isReady && isSearchPress) {
            router.events.on('routeChangeStart', () => {
                setPercent(0);
            })
            router.events.on('routeChangeComplete', () => {
                setPercent(0)
            })
        }
        return () => {

            router.events.off('routeChangeComplete', () => {
                setPercent(0)
            })
            router.events.off('routeChangeStart', () => {
                setPercent(0)
            })
        }

    }, [router]);
    useEffect(() => {
        let intervalID: any = null;
        if (completeSearch) {
            stopRunTimeoutModal = false;
            intervalID = setTimeout(() => {
                if (stopRunTimeoutModal) {
                    clearTimeout(intervalID);
                    return;
                }
                modal.show(<TimeoutModal closeModal={() => {
                    modal.hide();
                    router.reload();
                    clearTimeout(intervalID);
                    stopRunTimeoutModal = true;
                }}
                                         newSearch={() => {
                                             clearTimeout(intervalID);
                                             stopRunTimeoutModal = true;
                                             handleChangeEditSearch('edit');
                                             const wrapper = document.querySelector("#edit_search");
                                             if (wrapper) SmoothScroll(wrapper, 1000, 0 - 80);
                                             modal.hide();
                                         }}
                />); // timeout modal

            }, 300000);//5 minutes 300000
        }
        return () => {
            clearTimeout(intervalID);
        };
    }, [completeSearch]);
    useEffect(() => {
        return () => {
            stopRunTimeoutModal = true;
        };
    }, []);
    return (<Box sx={{
        backgroundColor: "onPrimary.main",
        width: "100%",
        height: {xs: 'auto', md: editSearchExpanded === 'edit' ? "auto" : 196},
        marginTop: 20
    }}>
        <Container maxWidth="lg" sx={{
            px: {xs: '0 !important', md: 4}
        }}>
            <Stack flexDirection={{xs: "column", md: "row"}} gap={4} justifyContent="space-between" pt={9.25}
                   pb={{xs: 0, md: 9.25}}>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-start" pl={4}>
                    <Stack flexDirection="column" px={{xs: 4, md: 4}}>
                        <Stack flexDirection="row" gap={3} alignItems="flex-start">
                            {!isMobileSize &&
                                <Box className={classes.headerSearchIcon}><SearchIcon/></Box>
                            }
                            <Stack flexDirection="column" alignItems="flex-start">
                                <Stack flexDirection="row" gap={3} alignItems="center" width={"100%"}>
                                    {loading && !extra?.from?.title ?
                                        <Skeleton variant="text"
                                                  sx={{
                                                      mt: 2,
                                                      fontSize: '3rem',
                                                      height: 36,
                                                      width: 150,
                                                      transform: 'scale(1, 0.8)'
                                                  }}/>
                                        : <>
                                            <Typography variant="h2"
                                                        fontWeight={700}>{pageTitle}</Typography>
                                            <BootstrapTooltip
                                                placement="left"
                                                title={<Typography variant="button" fontWeight={600}>اطلاعات
                                                    مسیر</Typography>}
                                                arrow
                                                className={classes.tooltip}
                                            >
                                                <Box>
                                                    <InfoCircleIcon className={classes.infoIcon}/>
                                                </Box>
                                            </BootstrapTooltip>
                                        </>}
                                </Stack>
                                {loading && !extra?.from?.title ?
                                    <Skeleton variant="text" sx={{fontSize: '2rem', height: 32, width: 130,}}/>
                                    :
                                    <Typography variant="h6" fontWeight={600}
                                                sx={{
                                                    opacity: 0.7,
                                                    pt: 2,
                                                    fontSize: {xs: 12, md: 14}
                                                }} dangerouslySetInnerHTML={{ __html: countToStr(passengers) }}></Typography>
                                }
                                {!isMobileSize &&
                                    <Button variant="text" id={"edit_search"} className={classes.editButton}
                                            onClick={() => {
                                                handleChangeEditSearch('edit')
                                            }} sx={editSearchExpanded === 'edit' ? {
                                        maxHeight: 0,
                                        marginTop: 0,
                                        padding: '0 8px !important',
                                        marginRight: '-8px !important'
                                    } : {
                                        padding: '0 8px !important',
                                        marginRight: '-8px !important'
                                    }}>
                                        <Stack flexDirection="row" alignItems="center" justifyContent="flex-start"
                                               gap={1.5}>
                                            <PencilIcon/>
                                            <Typography variant="h6" component="span" fontWeight={700}>ویرایش نتایج
                                                جستجو</Typography>
                                        </Stack>
                                    </Button>
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                    {isMobileSize &&
                        <IconButton className={classNames(classes.filterButton)} onClick={onFilterButtonClick}>
                            <Stack flexDirection="row" alignItems="center" gap={3}>
                                <FilterIcon/>
                            </Stack>
                        </IconButton>
                    }
                </Stack>
                {percent < 100 ?
                    <Box className={classes.progress} pr={4} pb={{xs: 4, md: 0}}>
                        <Typography variant="overline" fontWeight={700}>
                            جستجوی اطلاعات پرواز: {flightData.length} پرواز
                            از {availableFilters?.agencies instanceof Array && availableFilters?.agencies?.length} آژانس
                            یافت شد.
                        </Typography>
                        <LinearProgressWithLabel value={percent}/>
                    </Box>
                    :
                    <> {!searchNoResult && <Stack flexDirection="column" className={classes.lowerPriceHintBox}
                                                  sx={editSearchExpanded === 'edit' ? {
                                                      maxHeight: 0,
                                                      opacity: 0,
                                                      visibility: "hidden"
                                                  } : {}}>
                        <Stack flexDirection="row" gap={1.6} alignItems="flex-start">
                            <InfoCircleIcon className={classes.infoIcon}/>
                            <Stack flexDirection="column">
                                <Typography variant="h6" component="span" fontWeight={700}
                                            lineHeight={"24px"}
                                            className={classes.lowerPriceHintText}>وقت مناسبی برای رزرو
                                    نیست</Typography>
                                <Typography variant="subtitle2" component="span" fontWeight={500}
                                            lineHeight={"24px"}
                                            className={classes.lowerPriceHintSubTitle}>در آینده قیمت‌ این سفر کاهش پیدا
                                    خواهد کرد.</Typography>
                                {!isMobileSize &&
                                    <Button variant="text" className={classes.editButton} sx={{
                                        padding: '0 8px !important',
                                        marginRight: '-8px !important',
                                        maxWidth: 166,
                                    }}>
                                        <Stack flexDirection="row" alignItems="center" justifyContent="flex-start"
                                               gap={1.5}>
                                            <ChartBarIcon/>
                                            <Typography lineHeight={"21px"} variant="h6" component="span"
                                                        fontWeight={700}>مشاهده نمودار
                                                قیمت</Typography>
                                        </Stack>
                                    </Button>
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                    }
                    </>
                }

            </Stack>
        </Container>
        <Collapse className={classes.collpase} in={editSearchExpanded === 'edit'} timeout="auto" unmountOnExit={false}
                  sx={{position: "relative"}}>
            <Container maxWidth="lg" sx={{
                px: {xs: '0 !important', md: 4},
                position: "relative"
            }}>
                <Button className={classes.closeCollapse} sx={{position: "absolute"}} onClick={() => {
                    handleChangeEditSearch('')
                }}>
                    <Stack flexDirection="row" gap={2} alignItems="center">
                        <CloseIcon/>
                        <Typography variant="subtitle2" fontWeight={700}>
                            بستن
                        </Typography>
                    </Stack>
                </Button>
                <FlightTab pageUse='PLP' onSearchPress={() => {
                    setIsSearchPress(true);
                }}/>
            </Container>
        </Collapse>

    </Box>)
        ;
}
export default SearchResultHeader;