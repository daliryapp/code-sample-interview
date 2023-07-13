import React, {useEffect, useMemo, useState} from 'react';
import {
    Stack,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Skeleton
} from "@mui/material";
import Popover from '@mui/material/Popover';
import useSearchResultStyle from '../searchResult.style';
import CurrencyFormat from 'react-currency-format';
import classNames from "classnames";
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import SortDescendingIcon from 'public/icons/sort-descending.svg';
import {useGetFetchQuery} from "@/_hooks/search/search.hook";
import {setAvailableFilters, persianPriceFormatter, generateFilterUrl} from "@/@core/utils/utils";
import {useRouter} from "next/router";
import moment from "moment-jalaali";

const SortSection = ({loading}: any) => {
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];
    const [sort, setSort] = useState('cheapest')
    const tripType: string | undefined = slug?.[3]?.toString();
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const [previusData, setPreviusData] = useState<any>(null);
    const data = useGetFetchQuery("search2");
    const dataSearch: any = useMemo(() => data[data.length - 1][1], [data]);
    const classes = useSearchResultStyle();
    const [activeSlide, setActiveSlide] = useState<string>('cheapest');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorElMobile, setAnchorElMobile] = useState<HTMLButtonElement | null>(null);
    const openPopover = Boolean(anchorEl);
    const openPopoverMobile = Boolean(anchorElMobile);
    useEffect(() => {
        if (dataSearch && dataSearch.hasOwnProperty('filters')) {
            setPreviusData(dataSearch);
        }
    }, [dataSearch]);
    const flightData: any = useMemo(() => {
        let retData: any[] = [];
        let filters: any = null;
        if (previusData) {
            switch (tripType) {
                case "1":
                    retData = previusData?.flights;
                    filters = previusData?.filters;
                    break;
                case "2":
                    retData = previusData?.went;
                    filters = previusData?.filters_went;
                    break;
                default:
                    retData = previusData?.flights;
                    filters = previusData?.filters;
                    break;
            }
        }
        return {flights: retData, filters};
    }, [previusData, tripType]);

    const availableFilters = useMemo(() => setAvailableFilters(flightData?.filters), [flightData])
    const cheapest = flightData?.flights.length && flightData?.flights.filter((item: any) => item.price == availableFilters.minPrice)[0];
    const soonest = flightData?.flights.length && flightData?.flights.filter((item: any) => item.departure_time == (availableFilters.minDeparture / 1000))[0];
    const costly = flightData?.flights.length && flightData?.flights.filter((item: any) => item.price == availableFilters.maxPrice)[0];
    const latest = flightData?.flights.length && flightData?.flights.filter((item: any) => item.departure_time == (availableFilters.maxDeparture / 1000))[0];
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseMobile = () => {
        setAnchorElMobile(null);
    };
    const handleChangeSelectBox = (event: SelectChangeEvent) => {
        setActiveSlide(event.target.value);
        setSort(event.target.value);
    };
    useEffect(() => {
        const genUrl = generateFilterUrl(Object.assign(router.query, {sort}));
        router.push(
            {
                pathname: genUrl.url,
                query: genUrl.query,
            },
            undefined,
            {scroll: false, shallow: true}
        );
        // eslint-disable-next-line
    }, [sort])

    return (
        <>
            {isMobileSize &&
                <Typography variant="subtitle2" fontWeight={700} className={classes.expensiveTime} pb={2}>
                    مرتب‌سازی
                </Typography>
            }
            <Card className={!isMobileSize ? classes.expensiveCard : classes.expensiveCardMobile}>
                <CardContent>
                    {!isMobileSize ?
                        <Stack flexDirection="row" alignItems="flex-start">
                            <Stack flexDirection="column" justifyContent="flex-start" onClick={() => {
                                setActiveSlide('cheapest');
                                setSort('cheapest')
                            }} alignItems="flex-start" gap={2}
                                   className={classNames(classes.expensiveItem, activeSlide === 'cheapest' && classes.activeExpensive)}>
                                <Typography variant="h6" fontWeight={700}
                                            className={classes.daySelectTitle}>ارزانترین </Typography>
                                {cheapest && !loading ?
                                    <Typography variant="h4" fontWeight={600}>
                                        <CurrencyFormat value={persianPriceFormatter(cheapest.price)}
                                                        displayType={'text'} thousandSeparator={true}/>
                                    </Typography>
                                    : <Skeleton variant="text"
                                                sx={{fontSize: '2rem', width: '100%', transform: 'scale(1, 0.8)'}}/>
                                }
                                {cheapest && !loading ?
                                    <Typography variant="subtitle2" fontWeight={600} className={classes.expensiveTime}>ساعت
                                        {cheapest && moment(cheapest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                    :
                                    <Skeleton variant="text"
                                              sx={{
                                                  fontSize: '2rem',
                                                  width: '100%'
                                              }}/>
                                }
                            </Stack>
                            <Box className={classes.divider}></Box>
                            <Stack flexDirection="column" justifyContent="flex-start" onClick={() => {
                                setActiveSlide('departure_time');
                                setSort('departure_time');
                            }} alignItems="flex-start" gap={2}
                                   className={classNames(classes.expensiveItem, activeSlide === 'departure_time' && classes.activeExpensive)}>
                                <Typography variant="h6" fontWeight={700}
                                            className={classes.daySelectTitle}>زودترین </Typography>
                                {soonest && !loading ?
                                    <Typography variant="h4" fontWeight={600}>
                                        <CurrencyFormat value={persianPriceFormatter(soonest.price)}
                                                        displayType={'text'} thousandSeparator={true}/>
                                    </Typography>
                                    : <Skeleton variant="text"
                                                sx={{fontSize: '2rem', width: '100%', transform: 'scale(1, 0.8)'}}/>
                                }
                                {soonest && !loading ?
                                    <Typography variant="subtitle2" fontWeight={600} className={classes.expensiveTime}>ساعت
                                        {soonest && moment(soonest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                    :
                                    <Skeleton variant="text"
                                              sx={{
                                                  fontSize: '2rem',
                                                  width: '100%'
                                              }}/>
                                }
                            </Stack>
                            <Box className={classes.divider}></Box>
                            <Stack flexDirection="column" justifyContent="flex-start" onClick={() => {
                                setActiveSlide('custom');
                                setSort('custom')
                            }} alignItems="flex-start" gap={2}
                                   className={classNames(classes.expensiveItem, activeSlide === 'custom' && classes.activeExpensive)}>
                                <Typography variant="h6" fontWeight={700}
                                            className={classes.daySelectTitle}>بهترین </Typography>
                                {cheapest && !loading ?
                                    <Typography variant="h4" fontWeight={600}>
                                        <CurrencyFormat value={persianPriceFormatter(cheapest.price)}
                                                        displayType={'text'} thousandSeparator={true}/>
                                    </Typography>
                                    : <Skeleton variant="text"
                                                sx={{fontSize: '2rem', width: '100%', transform: 'scale(1, 0.8)'}}/>
                                }
                                {cheapest && !loading ?
                                    <Typography variant="subtitle2" fontWeight={600} className={classes.expensiveTime}>ساعت
                                        {cheapest && moment(cheapest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                    :
                                    <Skeleton variant="text"
                                              sx={{
                                                  fontSize: '2rem',
                                                  width: '100%'
                                              }}/>
                                }
                            </Stack>
                            <Box className={classes.divider}></Box>
                            <Stack flexDirection="column" justifyContent="center"
                                   onClick={(event: any) => {
                                       setAnchorEl(event.currentTarget);
                                   }}
                                   alignItems="center" gap={3} className={classNames(classes.expensiveItem)}>
                                <Stack flexDirection="row" gap={2} alignItems="center">
                                    <Box>
                                        <SortDescendingIcon/>
                                    </Box>
                                    <Typography variant="subtitle2" fontWeight={600} className={classes.expensiveTime}>سایر
                                        حالات و شرایط</Typography>
                                </Stack>
                            </Stack>
                            <Popover
                                className={classes.expensivePopover}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                open={openPopover}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                            >

                                <Stack flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('costly');
                                    setSort('costly')
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItem, activeSlide === 'costly' && classes.activeExpensive)}
                                       mt={0} sx={{width: '100% !important', height: '65px !important'}}>
                                    <Typography variant="h4" fontWeight={600} pb={1}>
                                        <span>گرانترین</span>
                                    </Typography>
                                    <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-end"
                                           gap={2} width="100%">
                                        {costly && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensiveTime}>
                                                <CurrencyFormat value={persianPriceFormatter(costly.price)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}/>
                                            </Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: '100%',
                                                          transform: 'scale(1, 0.8)'
                                                      }}/>
                                        }
                                        {costly && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensiveTime}>ساعت {costly && moment(costly.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: '100%'
                                                      }}/>
                                        }
                                    </Stack>
                                </Stack>
                                <Stack flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('departure_time_dir');
                                    setSort('departure_time_dir')
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItem, activeSlide === 'departure_time_dir' && classes.activeExpensive)}
                                       sx={{width: '100% !important', height: '65px !important'}}>
                                    <Typography variant="h4" fontWeight={600} pb={1}>
                                        <span>دیرترین</span>
                                    </Typography>
                                    <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-end"
                                           gap={2} width="100%">
                                        {latest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensiveTime}>
                                                <CurrencyFormat value={persianPriceFormatter(latest.price)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}/>
                                            </Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: '100%',
                                                          transform: 'scale(1, 0.8)'
                                                      }}/>
                                        }
                                        {latest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensiveTime}>ساعت {latest && moment(latest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: '100%'
                                                      }}/>
                                        }
                                    </Stack>
                                </Stack>
                            </Popover>
                        </Stack>
                        :
                        <Stack flexDirection="column" gap={2}>
                            <Button
                                variant="contained"
                                id="demo-simple-select"
                                onClick={(event: any) => {
                                    setAnchorElMobile(event.currentTarget);
                                }}
                                className={classes.sortSelectMobile}
                            >
                                <Typography variant={"h6"} fontWeight={600}>
                                    {activeSlide === 'cheapest' && "ارزانترین"}
                                    {activeSlide === 'custom' && "بهترین"}
                                    {activeSlide === 'departure_time' && "زودترین"}
                                    {activeSlide === 'costly' && "گرانترین"}
                                    {activeSlide === 'departure_time_dir' && "دیرترین"}
                                </Typography>
                            </Button>
                            <Popover
                                className={classes.responsivePopover}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                open={openPopoverMobile}
                                anchorEl={anchorElMobile}
                                onClose={handleCloseMobile}
                            >

                                <Stack mb={4} flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('cheapest');
                                    setSort('cheapest');
                                    handleCloseMobile();
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItemMobile, activeSlide === 'cheapest' && classes.activeExpensiveMobile)}
                                       mt={0} sx={{width: '100% !important'}}>
                                    <Typography variant="h6" fontWeight={700} pb={1}>
                                        <span>
                                        ارزانترین
                                            </span>
                                    </Typography>
                                    <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                                        {cheapest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>
                                                <CurrencyFormat value={persianPriceFormatter(cheapest.price)}
                                                                displayType={'text'} thousandSeparator={true}/>
                                            </Typography>
                                            : <Skeleton variant="text"
                                                        sx={{
                                                            fontSize: '2rem',
                                                            width: 50,
                                                            transform: 'scale(1, 0.8)'
                                                        }}/>
                                        }
                                        {cheapest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>ساعت
                                                {cheapest && moment(cheapest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: 50,
                                                      }}/>
                                        }

                                    </Stack>
                                </Stack>


                                <Stack mb={4} flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('departure_time');
                                    setSort('departure_time');
                                    handleCloseMobile();
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItemMobile, activeSlide === 'departure_time' && classes.activeExpensiveMobile)}
                                       mt={0} sx={{width: '100% !important'}}>
                                    <Typography variant="h6" fontWeight={700} pb={1}>
                                        <span>
                                        زودترین
                                            </span>
                                    </Typography>
                                    <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                                        {soonest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>
                                                <CurrencyFormat value={persianPriceFormatter(soonest.price)}
                                                                displayType={'text'} thousandSeparator={true}/>
                                            </Typography>
                                            : <Skeleton variant="text"
                                                        sx={{
                                                            fontSize: '2rem',
                                                            width: 50,
                                                            transform: 'scale(1, 0.8)'
                                                        }}/>
                                        }
                                        {soonest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>ساعت
                                                {soonest && moment(soonest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: 50,
                                                      }}/>
                                        }

                                    </Stack>
                                </Stack>

                                <Stack mb={4} flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('custom');
                                    setSort('custom');
                                    handleCloseMobile();
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItemMobile, activeSlide === 'custom' && classes.activeExpensiveMobile)}
                                       mt={0} sx={{width: '100% !important'}}>
                                    <Typography variant="h6" fontWeight={700} pb={1}>
                                        <span>
                                        بهترین
                                            </span>
                                    </Typography>
                                    <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                                        {cheapest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>
                                                <CurrencyFormat value={persianPriceFormatter(cheapest.price)}
                                                                displayType={'text'} thousandSeparator={true}/>
                                            </Typography>
                                            : <Skeleton variant="text"
                                                        sx={{
                                                            fontSize: '2rem',
                                                            width: 50,
                                                            transform: 'scale(1, 0.8)'
                                                        }}/>
                                        }
                                        {cheapest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>ساعت
                                                {cheapest && moment(cheapest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: 50,
                                                      }}/>
                                        }

                                    </Stack>
                                </Stack>


                                <Stack mb={4} flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('costly');
                                    setSort('costly');
                                    handleCloseMobile();
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItemMobile, activeSlide === 'costly' && classes.activeExpensiveMobile)}
                                       mt={0} sx={{width: '100% !important'}}>
                                    <Typography variant="h6" fontWeight={700} pb={1}>
                                        <span>
                                        گرانترین
                                            </span>
                                    </Typography>
                                    <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                                        {costly && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>
                                                <CurrencyFormat value={persianPriceFormatter(costly.price)}
                                                                displayType={'text'} thousandSeparator={true}/>
                                            </Typography>
                                            : <Skeleton variant="text"
                                                        sx={{
                                                            fontSize: '2rem',
                                                            width: 50,
                                                            transform: 'scale(1, 0.8)'
                                                        }}/>
                                        }
                                        {costly && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>ساعت
                                                {costly && moment(costly.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: 50,
                                                      }}/>
                                        }

                                    </Stack>
                                </Stack>




                                <Stack  flexDirection="column" justifyContent="flex-start" onClick={() => {
                                    setActiveSlide('departure_time_dir');
                                    setSort('departure_time_dir');
                                    handleCloseMobile();
                                }} alignItems="flex-start" gap={0}
                                       className={classNames(classes.expensiveItemMobile, activeSlide === 'departure_time_dir' && classes.activeExpensiveMobile)}
                                       mt={0} sx={{width: '100% !important'}}>
                                    <Typography variant="h6" fontWeight={700} pb={1}>
                                        <span>
                                        دیرترین
                                            </span>
                                    </Typography>
                                    <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                                        {latest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>
                                                <CurrencyFormat value={persianPriceFormatter(latest.price)}
                                                                displayType={'text'} thousandSeparator={true}/>
                                            </Typography>
                                            : <Skeleton variant="text"
                                                        sx={{
                                                            fontSize: '2rem',
                                                            width: 50,
                                                            transform: 'scale(1, 0.8)'
                                                        }}/>
                                        }
                                        {latest && !loading ?
                                            <Typography variant="subtitle2" fontWeight={400}
                                                        className={classes.expensivePrice}>ساعت
                                                {latest && moment(latest.flights[0][0].departure_time).format('HH:mm')}</Typography>
                                            :
                                            <Skeleton variant="text"
                                                      sx={{
                                                          fontSize: '2rem',
                                                          width: 50
                                                      }}/>
                                        }

                                    </Stack>
                                </Stack>

                            </Popover>
                        </Stack>
                    }
                </CardContent>
            </Card>
        </>);
}
export default SortSection;