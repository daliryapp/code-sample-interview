import {
    Box,
    Stack,
    Typography,
    IconButton,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Tooltip
} from "@mui/material";
import React, {useMemo, useState, useEffect} from "react";
import useTicketDetailStyle from './ticketDetail.style';
import Image from "next/image";
import classNames from "classnames";
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import RouteIcon from 'public/icons/route-grey.svg';
import CloseIcon from 'public/icons/x.svg'
import ChevronDown from 'public/icons/chevron-down-grey.svg';
import ConnectionIcon from 'public/icons/connection.svg'
import ArrowLeftIcon from 'public/icons/arrow-left-grey.svg'
import ClockIcon from 'public/icons/clock.svg'
import ConnectionMobileIcon from 'public/icons/ConnectionIcon.svg'
import {useGetFetchQuery} from "@/_hooks/search/search.hook";
import {useRouter} from "next/router";
import moment from "moment-jalaali";
import {countToStr, HHMMToTimeShort, persianPriceFormatter, setAvailableFilters} from "@/@core/utils/utils";
import CurrencyFormat from "react-currency-format";
import {styled} from "@mui/material/styles";
import {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import StarIcon from "public/star.svg";
import ChevronUpPrimary from 'public/icons/chevron-up-primary.svg';
import ChevronDownPrimary from 'public/icons/chevron-down-primary.svg';
import {useSelector} from "react-redux";
import {RootState} from "@/@core/redux/store";

interface ITicketDetail {
    closeModal: () => void;
    flights: any;
    nextFlight: (nextId: string) => void;
}

const BootstrapTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} arrow classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {},
}));
const TicketDetail = ({closeModal, flights, nextFlight}: ITicketDetail) => {
    const router = useRouter();
    const completeSearch = useSelector((state: RootState) => state.app.completeSearch);
    const slug = (router.query.slug as string[]) || [];
    const adult: string | undefined = slug?.[2]?.toString();
    const tripType: string | undefined = slug?.[3]?.toString();
    const cabin: string | undefined = slug?.[4]?.toString();
    const child: string | undefined = slug?.[5]?.toString();
    const infant: string | undefined = slug?.[6]?.toString();
    const passengers = {adult, cabin, child, infant};
    const classes = useTicketDetailStyle();
    const [nextId, setNextId] = useState<string>('');
    const [prevId, setPrevId] = useState<string>('');
    const [activeFlight, setActiveFlight] = useState<any>(flights);
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const dataSearch1 = useGetFetchQuery("search");
    const dataSearch = useGetFetchQuery("search2");
    const dataMemoSearch1: any = useMemo(() => dataSearch1[dataSearch1.length - 1][1], [dataSearch1]);
    const dataSearch2: any = useMemo(() => dataSearch[dataSearch.length - 1][1], [dataSearch]);
    const availableFilters = useMemo(() => setAvailableFilters(dataSearch2?.filters), [dataSearch2]);
    const cheapest = dataSearch2?.return?.length && dataSearch2?.return?.filter((item: any) => item.price <= availableFilters.minPrice)[0];
    useEffect(() => {
        if (!!dataSearch2?.flights) {
            const findedIndex = dataSearch2?.flights.findIndex((item: any) => item.id === activeFlight?.id);
            if (findedIndex + 1 > dataSearch2?.flights.length) {
                setNextId('');
            } else {
                if (findedIndex + 1 < dataSearch2?.flights.length) {
                    setNextId(dataSearch2?.flights[findedIndex + 1].id);
                }else{
                    setNextId('');
                }
            }
            if (findedIndex - 1 < 0) {
                setPrevId('');
            } else {
                if (findedIndex - 1 >= 0) {
                    setPrevId(dataSearch2?.flights[findedIndex - 1].id);
                }
            }
        }
    }, [dataSearch2, activeFlight]);
    const nextIdChange = (id: string) => {
        if (!!dataSearch2?.flights && id !== '') {
            const findedIndex = dataSearch2?.flights.findIndex((item: any) => item.id === id);
            setActiveFlight(dataSearch2?.flights[findedIndex]);
        }
    }

    function valuetext(value: number) {
        return `۱ توقف (IFN)`;
    }

    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedAccordion(isExpanded ? panel : false);
        };
    return (<Stack flexDirection={{xs: "column", md: "row"}}>
        {dataMemoSearch1?.is_internal ? <>
                {tripType === "1" ?
                    <Box key={'internal-flight'}>
                        <Box className={classes.ticketDetailContainer}>
                            <IconButton className={classes.closeIcon} sx={{
                                position: "absolute"
                            }} onClick={closeModal}>
                                {isMobileSize ?
                                    <ArrowLeftIcon/>
                                    :
                                    <CloseIcon/>
                                }
                            </IconButton>
                            <Stack flexDirection="row" gap={3}>
                                {!isMobileSize &&
                                    <Box className={classes.routeIcon}><RouteIcon/></Box>
                                }
                                <Stack flexDirection="column" gap={2}>
                                    <Typography variant="h2" fontWeight={700}>
                                        {dataMemoSearch1?.extra?.from?.title}
                                        ←
                                        {dataMemoSearch1?.extra?.to?.title}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} sx={{opacity: 0.7}}>
                                        {countToStr(passengers)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box className={classes.divider}></Box>
                        <Box className={classes.flightInfoBox}>
                            <Typography variant="h4" fontWeight={700} pb={4}>
                                اطلاعات پرواز:
                            </Typography>
                            {activeFlight.flights && activeFlight.flights instanceof Array && activeFlight.flights.map((item: any, i: number) => {
                                return item?.map((dataItem: any, index: number) =>
                                    <Accordion key={`acc${index}`} expanded={expandedAccordion === `flight-go${i + index}`}
                                               onChange={handleChangeAccordion(`flight-go${i + index}`)}
                                               className={classes.accordion}>
                                        <AccordionSummary
                                            expandIcon={<ChevronDown/>}
                                            aria-controls="flight-gobh-content"
                                            id="flight-gobh-header"
                                        > <Box className={classes.flightCard}>
                                            <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                                   justifyContent={{xs: "center", md: "space-between"}}>
                                                <Stack flexDirection={{xs: "row", md: "column"}}
                                                       justifyContent={{xs: "flex-start", md: "center"}} alignItems="center"
                                                       width="150px"
                                                       mt={{xs: -5.5, md: 0}}>
                                                    <Box sx={{
                                                        width: {xs: 24, md: 56}, height: {xs: 24, md: 56},
                                                        position: "relative",
                                                        '& img': {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: "contain"
                                                        }
                                                    }}>
                                                        <Image src={activeFlight?.airline_logo?.['48']} fill
                                                               alt={activeFlight?.airline_per}/>
                                                    </Box>

                                                </Stack>
                                                <Stack flexDirection="column" gap={5} width="100%"
                                                       justifyContent="flex-end">
                                                    <Stack flexDirection="row" gap={2} width="100%">
                                                        <Stack flexDirection="column" alignItems="center"
                                                               justifyContent="center">
                                                            <Typography variant="h5" component="span" fontWeight={700}
                                                                        className={classes.time}>{moment(dataItem?.departure_time).format('HH:mm')}</Typography>
                                                            <Typography variant="h6" component="span" fontWeight={400}
                                                                        className={classes.time}>{dataItem?.from}</Typography>
                                                        </Stack>
                                                        <Box className={classNames(
                                                            classes.slider,
                                                            classes.noStop
                                                            // classes.sliderBack
                                                        )}>
                                                            <Slider
                                                                size="small"
                                                                track={false}
                                                                aria-label="Always visible"
                                                                defaultValue={50}
                                                                valueLabelFormat={valuetext}
                                                                step={10}
                                                                marks={[
                                                                    {
                                                                        value: 50,
                                                                        label: HHMMToTimeShort(dataItem?.duration),
                                                                    },

                                                                ]}
                                                                value={50}
                                                                valueLabelDisplay="on"
                                                                disabled
                                                            />
                                                        </Box>
                                                        <Stack flexDirection="column" alignItems="center"
                                                               justifyContent="center">
                                                            <Typography variant="h5" component="span" fontWeight={700}
                                                                        className={classes.time}>{moment(dataItem?.arrival_time).format('HH:mm')}</Typography>
                                                            <Typography variant="h6" component="span" fontWeight={400}
                                                                        className={classes.time}>{dataItem?.to}</Typography>
                                                        </Stack>
                                                    </Stack>

                                                </Stack>
                                            </Stack>
                                        </Box>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack flexDirection="row" gap={1} alignItems="center" mr={{xs: 5, md: 27.5}}
                                                   mb={4}>
                                                <Box sx={{
                                                    width: {xs: 24, md: 32}, height: {xs: 24, md: 32},
                                                    position: "relative",
                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: "contain"
                                                    }
                                                }}>
                                                    <Image src={activeFlight?.airline_logo?.['48']} fill
                                                           alt={activeFlight?.airline_per}/>
                                                </Box>
                                                <Stack flexDirection="column">
                                                    <Typography variant="overline" fontWeight={700}
                                                                className={classes.ticketDetailTime}>
                                                        {activeFlight?.airline_per}
                                                    </Typography>
                                                    <Typography variant="overline" fontWeight={400}
                                                                className={classes.ticketDetailTime}>
                                                        شماره پرواز {activeFlight?.code}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack flexDirection="row" alignItems="center">
                                                {!isMobileSize ?
                                                    <Typography variant="overline" fontWeight={400}
                                                                className={classes.ticketDetailTime}>
                                                        {HHMMToTimeShort(dataItem?.duration)}
                                                    </Typography>
                                                    :
                                                    <Stack flexDirection="row" alignItems="center" gap={1.5} sx={{
                                                        position: "absolute",
                                                        marginRight: 5.5,
                                                        marginTop: -3.75
                                                    }}>
                                                        <Box>
                                                            <ClockIcon/>
                                                        </Box>
                                                        <Typography variant="overline" fontWeight={700}
                                                                    className={classes.mobileClockText}>
                                                            {HHMMToTimeShort(dataItem?.duration)}
                                                        </Typography>
                                                    </Stack>
                                                }
                                                <Box mr={{xs: 0, md: 5}} ml={{xs: 3.25, md: 2}}>
                                                    {isMobileSize ?
                                                        <ConnectionMobileIcon/>
                                                        :
                                                        <ConnectionIcon/>
                                                    }
                                                </Box>
                                                <Stack flexDirection="column" gap={{xs: 12, md: 8.75}}>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={400}
                                                                    className={classes.ticketDetailTime}
                                                                    pb={1}>
                                                            {moment(dataItem.departure_time).format('dddd، jDD jMMMM ماه')}
                                                            {" "} • {" "}
                                                            ساعت {moment(dataItem.departure_time).format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="h6" fontWeight={700}
                                                                    className={classes.ticketDetailTime}>
                                                            {dataItem.departure_city_per} · {dataItem.departure_airport_per}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={400}
                                                                    className={classes.ticketDetailTime}
                                                                    pb={1}>
                                                            {moment(dataItem.arrival_time).format('dddd، jDD jMMMM ماه')}
                                                            {" "} • {" "}
                                                            ساعت {moment(dataItem.arrival_time).format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="h6" fontWeight={700}
                                                                    className={classes.ticketDetailTime}>
                                                            {dataItem.arrival_city_per} · {dataItem.arrival_airport_per}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Stack>

                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}

                            <Typography variant="h4" fontWeight={700} pb={4.25} pt={{xs: 8, md: 20}}>
                                آژانس‌های ارائه دهنده:
                            </Typography>
                            {activeFlight.agencies && activeFlight.agencies instanceof Array && activeFlight.agencies.map((item: any, i: number) => (
                                <Box key={`agancies-${i}`} className={classes.agencyBox}>
                                    <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                           justifyContent={{xs: "center", md: "space-between"}}>
                                        <Stack flexDirection="row" justifyContent={{xs: "flex-start", md: "center"}}
                                               alignItems="center"
                                               gap={3}>
                                            <Box sx={{
                                                width: {xs: 24, md: 40}, height: {xs: 24, md: 40},
                                                position: "relative",

                                                '& img': {
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: "contain"
                                                }
                                            }}>
                                                <Image src={item?.logo} fill alt={item?.name}/>
                                            </Box>
                                            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                                                <Typography variant="h6" fontWeight={700}
                                                            className={classes.agencyName}
                                                            pt={1}>
                                                    {item?.name}
                                                </Typography>
                                                {!!item.is_suggestion &&
                                                    <BootstrapTooltip
                                                        placement="top"
                                                        title={<Typography variant="button" fontWeight={600}>
                                                            پیشنهاد یابکس
                                                        </Typography>}
                                                        arrow
                                                        className={classes.tooltip}
                                                    >
                                                        <Box>
                                                            <StarIcon/>
                                                        </Box>
                                                    </BootstrapTooltip>
                                                }

                                            </Stack>


                                            {isMobileSize &&
                                                <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                    <Typography variant="overline" fontWeight={600}>ارزان‌ترین</Typography>
                                                </Box>
                                            }
                                        </Stack>
                                        <Stack flexDirection={{xs: "row-reverse", md: "row"}} alignItems="center" gap={4}
                                               justifyContent={{xs: "space-between", md: "flex-start"}}>
                                            {!isMobileSize &&
                                                <>
                                                    {i === 0 &&
                                                        <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                            <Typography variant="overline"
                                                                        fontWeight={600}>ارزان‌ترین</Typography>
                                                        </Box>}
                                                    {!!item?.is_airline &&
                                                        <Box className={classNames(classes.tagBox, classes.tagBoxBlue)}>
                                                            <Typography variant="overline" fontWeight={600}>خرید مستقیم از
                                                                ایرلاین</Typography>
                                                        </Box>}
                                                    {!!item?.is_winner_ticket &&
                                                        <Box className={classNames(classes.tagBox)}>
                                                            <Typography variant="overline" fontWeight={600}>بلیط همیشه
                                                                برنده</Typography>
                                                        </Box>}
                                                </>
                                            }
                                            <Typography variant="h6" fontWeight={700}
                                                        className={classNames(i === 0 ? classes.priceGreen : classes.price)}>
                                                <CurrencyFormat value={persianPriceFormatter(activeFlight?.price)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}/> تومان
                                            </Typography>
                                            <Button component="a" href={item?.link} target={"_blank"} variant="outlined"
                                                    className={classNames(classes.containedButton)}>
                                                <Typography variant="subtitle2"
                                                            fontWeight={900}> {!!item.has_direct_reserve ? 'خرید مستقیم' : 'رزرو بلیط'}</Typography>
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}

                        </Box>
                    </Box>
                    :
                    <>
                        <Box key={'internal-external-flight1'}>
                            <Box className={classes.ticketDetailContainer}>

                                <Stack flexDirection="row" gap={3}>
                                    {!isMobileSize &&
                                        <Box className={classes.routeIcon}><RouteIcon/></Box>
                                    }
                                    <Stack flexDirection="column" gap={2}>
                                        <Typography variant="h2" fontWeight={700}>
                                            {dataMemoSearch1?.extra?.from?.title}
                                            ←
                                            {dataMemoSearch1?.extra?.to?.title}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{opacity: 0.7}}>
                                            {countToStr(passengers)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box className={classes.divider}></Box>
                            <Box className={classes.flightInfoBox}>
                                <Typography variant="h4" fontWeight={700} pb={4}>
                                    اطلاعات پرواز:
                                </Typography>
                                {activeFlight.flights && activeFlight.flights instanceof Array && activeFlight.flights.map((item: any, i: number) => {
                                    return item?.map((dataItem: any, index: number) =>
                                        <Accordion key={`acc${index}`}
                                                   expanded={expandedAccordion === `flight-go${i + index}`}
                                                   onChange={handleChangeAccordion(`flight-go${i + index}`)}
                                                   className={classes.accordion}>
                                            <AccordionSummary
                                                expandIcon={<ChevronDown/>}
                                                aria-controls="flight-gobh-content"
                                                id="flight-gobh-header"
                                            > <Box className={classes.flightCard}>
                                                <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                                       justifyContent={{xs: "center", md: "space-between"}}>
                                                    <Stack flexDirection={{xs: "row", md: "column"}}
                                                           justifyContent={{xs: "flex-start", md: "center"}}
                                                           alignItems="center"
                                                           width="150px"
                                                           mt={{xs: -5.5, md: 0}}>
                                                        <Box sx={{
                                                            width: {xs: 24, md: 56}, height: {xs: 24, md: 56},
                                                            position: "relative",
                                                            '& img': {
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: "contain"
                                                            }
                                                        }}>
                                                            <Image src={activeFlight?.airline_logo?.['48']} fill
                                                                   alt={activeFlight?.airline_per}/>
                                                        </Box>

                                                    </Stack>
                                                    <Stack flexDirection="column" gap={5} width="100%"
                                                           justifyContent="flex-end">
                                                        <Stack flexDirection="row" gap={2} width="100%">
                                                            <Stack flexDirection="column" alignItems="center"
                                                                   justifyContent="center">
                                                                <Typography variant="h5" component="span" fontWeight={700}
                                                                            className={classes.time}>{moment(dataItem?.departure_time).format('HH:mm')}</Typography>
                                                                <Typography variant="h6" component="span" fontWeight={400}
                                                                            className={classes.time}>{dataItem?.from}</Typography>
                                                            </Stack>
                                                            <Box className={classNames(
                                                                classes.slider,
                                                                classes.noStop
                                                                // classes.sliderBack
                                                            )}>
                                                                <Slider
                                                                    size="small"
                                                                    track={false}
                                                                    aria-label="Always visible"
                                                                    defaultValue={50}
                                                                    valueLabelFormat={valuetext}
                                                                    step={10}
                                                                    marks={[
                                                                        {
                                                                            value: 50,
                                                                            label: HHMMToTimeShort(dataItem?.duration),
                                                                        },

                                                                    ]}
                                                                    value={50}
                                                                    valueLabelDisplay="on"
                                                                    disabled
                                                                />
                                                            </Box>
                                                            <Stack flexDirection="column" alignItems="center"
                                                                   justifyContent="center">
                                                                <Typography variant="h5" component="span" fontWeight={700}
                                                                            className={classes.time}>{moment(dataItem?.arrival_time).format('HH:mm')}</Typography>
                                                                <Typography variant="h6" component="span" fontWeight={400}
                                                                            className={classes.time}>{dataItem?.to}</Typography>
                                                            </Stack>
                                                        </Stack>

                                                    </Stack>
                                                </Stack>
                                            </Box>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack flexDirection="row" gap={1} alignItems="center"
                                                       mr={{xs: 5, md: 27.5}}
                                                       mb={4}>
                                                    <Box sx={{
                                                        width: {xs: 24, md: 32}, height: {xs: 24, md: 32},
                                                        position: "relative",
                                                        '& img': {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: "contain"
                                                        }
                                                    }}>
                                                        <Image src={activeFlight?.airline_logo?.['48']} fill
                                                               alt={activeFlight?.airline_per}/>
                                                    </Box>
                                                    <Stack flexDirection="column">
                                                        <Typography variant="overline" fontWeight={700}
                                                                    className={classes.ticketDetailTime}>
                                                            {activeFlight?.airline_per}
                                                        </Typography>
                                                        <Typography variant="overline" fontWeight={400}
                                                                    className={classes.ticketDetailTime}>
                                                            شماره پرواز {activeFlight?.code}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack flexDirection="row" alignItems="center">
                                                    {!isMobileSize ?
                                                        <Typography variant="overline" fontWeight={400}
                                                                    className={classes.ticketDetailTime}>
                                                            {HHMMToTimeShort(dataItem?.duration)}
                                                        </Typography>
                                                        :
                                                        <Stack flexDirection="row" alignItems="center" gap={1.5} sx={{
                                                            position: "absolute",
                                                            marginRight: 5.5,
                                                            marginTop: -3.75
                                                        }}>
                                                            <Box>
                                                                <ClockIcon/>
                                                            </Box>
                                                            <Typography variant="overline" fontWeight={700}
                                                                        className={classes.mobileClockText}>
                                                                {HHMMToTimeShort(dataItem?.duration)}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                    <Box mr={{xs: 0, md: 5}} ml={{xs: 3.25, md: 2}}>
                                                        {isMobileSize ?
                                                            <ConnectionMobileIcon/>
                                                            :
                                                            <ConnectionIcon/>
                                                        }
                                                    </Box>
                                                    <Stack flexDirection="column" gap={{xs: 12, md: 8.75}}>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={400}
                                                                        className={classes.ticketDetailTime}
                                                                        pb={1}>
                                                                {moment(dataItem.departure_time).format('dddd، jDD jMMMM ماه')}
                                                                {" "} • {" "}
                                                                ساعت {moment(dataItem.departure_time).format('HH:mm')}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={700}
                                                                        className={classes.ticketDetailTime}>
                                                                {dataItem.departure_city_per} · {dataItem.departure_airport_per}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={400}
                                                                        className={classes.ticketDetailTime}
                                                                        pb={1}>
                                                                {moment(dataItem.arrival_time).format('dddd، jDD jMMMM ماه')}
                                                                {" "} • {" "}
                                                                ساعت {moment(dataItem.arrival_time).format('HH:mm')}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={700}
                                                                        className={classes.ticketDetailTime}>
                                                                {dataItem.arrival_city_per} · {dataItem.arrival_airport_per}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}

                                <Typography variant="h4" fontWeight={700} pb={4.25} pt={{xs: 8, md: 20}}>
                                    آژانس‌های ارائه دهنده:
                                </Typography>
                                {activeFlight.agencies && activeFlight.agencies instanceof Array && activeFlight.agencies.map((item: any, i: number) => (
                                    <Box key={`agancies-${i}`} className={classes.agencyBox}>
                                        <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                               justifyContent={{xs: "center", md: "space-between"}}>
                                            <Stack flexDirection="row" justifyContent={{xs: "flex-start", md: "center"}}
                                                   alignItems="center"
                                                   gap={3}>
                                                <Box sx={{
                                                    width: {xs: 24, md: 40}, height: {xs: 24, md: 40},
                                                    position: "relative",

                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: "contain"
                                                    }
                                                }}>
                                                    <Image src={item?.logo} fill alt={item?.name}/>
                                                </Box>
                                                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                                                    <Typography variant="h6" fontWeight={700}
                                                                className={classes.agencyName}
                                                                pt={1}>
                                                        {item?.name}
                                                    </Typography>
                                                    {!!item.is_suggestion &&
                                                        <BootstrapTooltip
                                                            placement="top"
                                                            title={<Typography variant="button" fontWeight={600}>
                                                                پیشنهاد یابکس
                                                            </Typography>}
                                                            arrow
                                                            className={classes.tooltip}
                                                        >
                                                            <Box>
                                                                <StarIcon/>
                                                            </Box>
                                                        </BootstrapTooltip>
                                                    }

                                                </Stack>


                                                {isMobileSize &&
                                                    <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                        <Typography variant="overline"
                                                                    fontWeight={600}>ارزان‌ترین</Typography>
                                                    </Box>
                                                }
                                            </Stack>
                                            <Stack flexDirection={{xs: "row-reverse", md: "row"}} alignItems="center"
                                                   gap={4}
                                                   justifyContent={{xs: "space-between", md: "flex-start"}}>
                                                {!isMobileSize &&
                                                    <>
                                                        {i === 0 &&
                                                            <Box
                                                                className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                                <Typography variant="overline"
                                                                            fontWeight={600}>ارزان‌ترین</Typography>
                                                            </Box>}
                                                        {!!item?.is_airline &&
                                                            <Box className={classNames(classes.tagBox, classes.tagBoxBlue)}>
                                                                <Typography variant="overline" fontWeight={600}>خرید مستقیم
                                                                    از
                                                                    ایرلاین</Typography>
                                                            </Box>}
                                                        {!!item?.is_winner_ticket &&
                                                            <Box className={classNames(classes.tagBox)}>
                                                                <Typography variant="overline" fontWeight={600}>بلیط همیشه
                                                                    برنده</Typography>
                                                            </Box>}
                                                    </>
                                                }
                                                <Typography variant="h6" fontWeight={700}
                                                            className={classNames(i === 0 ? classes.priceGreen : classes.price)}>
                                                    <CurrencyFormat value={persianPriceFormatter(activeFlight?.price)}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/> تومان
                                                </Typography>
                                                <Button component="a" href={item?.link} target={"_blank"} variant="outlined"
                                                        className={classNames(classes.containedButton)}>
                                                    <Typography variant="subtitle2"
                                                                fontWeight={900}> {!!item.has_direct_reserve ? 'خرید مستقیم' : 'رزرو بلیط'}</Typography>
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))}

                            </Box>
                        </Box>
                        <Box key={'internal-external-flight2'}>
                            <Box className={classes.ticketDetailContainer}>
                                <IconButton className={classes.closeIcon} sx={{
                                    position: "absolute"
                                }} onClick={closeModal}>
                                    {isMobileSize ?
                                        <ArrowLeftIcon/>
                                        :
                                        <CloseIcon/>
                                    }
                                </IconButton>
                                <Stack flexDirection="row" gap={3}>
                                    {!isMobileSize &&
                                        <Box className={classes.routeIcon}><RouteIcon/></Box>
                                    }
                                    <Stack flexDirection="column" gap={2}>
                                        <Typography variant="h2" fontWeight={700}>
                                            {dataMemoSearch1?.extra?.to?.title}
                                            ←
                                            {dataMemoSearch1?.extra?.from?.title}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{opacity: 0.7}}>
                                            {countToStr(passengers)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box className={classes.divider}></Box>
                            <Box className={classes.flightInfoBox}>
                                <Typography variant="h4" fontWeight={700} pb={4}>
                                    اطلاعات پرواز:
                                </Typography>
                                {cheapest.flights && cheapest.flights instanceof Array && cheapest.flights.map((item: any, i: number) => {
                                    return item?.map((dataItem: any, index: number) =>
                                        <Accordion key={`acc${index}`}
                                                   expanded={expandedAccordion === `flight-back${i + index}`}
                                                   onChange={handleChangeAccordion(`flight-back${i + index}`)}
                                                   className={classes.accordion}>
                                            <AccordionSummary
                                                expandIcon={<ChevronDown/>}
                                                aria-controls="flight-gobh-content"
                                                id="flight-gobh-header"
                                            > <Box className={classes.flightCard}>
                                                <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                                       justifyContent={{xs: "center", md: "space-between"}}>
                                                    <Stack flexDirection={{xs: "row", md: "column"}}
                                                           justifyContent={{xs: "flex-start", md: "center"}}
                                                           alignItems="center"
                                                           width="150px"
                                                           mt={{xs: -5.5, md: 0}}>
                                                        <Box sx={{
                                                            width: {xs: 24, md: 56}, height: {xs: 24, md: 56},
                                                            position: "relative",
                                                            '& img': {
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: "contain"
                                                            }
                                                        }}>
                                                            <Image src={cheapest?.airline_logo?.['48']} fill
                                                                   alt={cheapest?.airline_per}/>
                                                        </Box>
                                                    </Stack>
                                                    <Stack flexDirection="column" gap={5} width="100%"
                                                           justifyContent="flex-end">
                                                        <Stack flexDirection="row" gap={2} width="100%">
                                                            <Stack flexDirection="column" alignItems="center"
                                                                   justifyContent="center">
                                                                <Typography variant="h5" component="span" fontWeight={700}
                                                                            className={classes.time}>{moment(dataItem?.departure_time).format('HH:mm')}</Typography>
                                                                <Typography variant="h6" component="span" fontWeight={400}
                                                                            className={classes.time}>{dataItem?.from}</Typography>
                                                            </Stack>
                                                            <Box className={classNames(
                                                                classes.slider,
                                                                classes.noStop
                                                                // classes.sliderBack
                                                            )}>
                                                                <Slider
                                                                    size="small"
                                                                    track={false}
                                                                    aria-label="Always visible"
                                                                    defaultValue={50}
                                                                    valueLabelFormat={valuetext}
                                                                    step={10}
                                                                    marks={[
                                                                        {
                                                                            value: 50,
                                                                            label: HHMMToTimeShort(dataItem?.duration),
                                                                        },

                                                                    ]}
                                                                    value={50}
                                                                    valueLabelDisplay="on"
                                                                    disabled
                                                                />
                                                            </Box>
                                                            <Stack flexDirection="column" alignItems="center"
                                                                   justifyContent="center">
                                                                <Typography variant="h5" component="span" fontWeight={700}
                                                                            className={classes.time}>{moment(dataItem?.arrival_time).format('HH:mm')}</Typography>
                                                                <Typography variant="h6" component="span" fontWeight={400}
                                                                            className={classes.time}>{dataItem?.to}</Typography>
                                                            </Stack>
                                                        </Stack>

                                                    </Stack>
                                                </Stack>
                                            </Box>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack flexDirection="row" gap={1} alignItems="center"
                                                       mr={{xs: 5, md: 27.5}}
                                                       mb={4}>
                                                    <Box sx={{
                                                        width: {xs: 24, md: 32}, height: {xs: 24, md: 32},
                                                        position: "relative",
                                                        '& img': {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: "contain"
                                                        }
                                                    }}>
                                                        <Image src={cheapest?.airline_logo?.['48']} fill
                                                               alt={cheapest?.airline_per}/>
                                                    </Box>
                                                    <Stack flexDirection="column">
                                                        <Typography variant="overline" fontWeight={700}
                                                                    className={classes.ticketDetailTime}>
                                                            {cheapest?.airline_per}
                                                        </Typography>
                                                        <Typography variant="overline" fontWeight={400}
                                                                    className={classes.ticketDetailTime}>
                                                            شماره پرواز {cheapest?.code}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack flexDirection="row" alignItems="center">
                                                    {!isMobileSize ?
                                                        <Typography variant="overline" fontWeight={400}
                                                                    className={classes.ticketDetailTime}>
                                                            {HHMMToTimeShort(dataItem?.duration)}
                                                        </Typography>
                                                        :
                                                        <Stack flexDirection="row" alignItems="center" gap={1.5} sx={{
                                                            position: "absolute",
                                                            marginRight: 5.5,
                                                            marginTop: -3.75
                                                        }}>
                                                            <Box>
                                                                <ClockIcon/>
                                                            </Box>
                                                            <Typography variant="overline" fontWeight={700}
                                                                        className={classes.mobileClockText}>
                                                                {HHMMToTimeShort(dataItem?.duration)}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                    <Box mr={{xs: 0, md: 5}} ml={{xs: 3.25, md: 2}}>
                                                        {isMobileSize ?
                                                            <ConnectionMobileIcon/>
                                                            :
                                                            <ConnectionIcon/>
                                                        }
                                                    </Box>
                                                    <Stack flexDirection="column" gap={{xs: 12, md: 8.75}}>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={400}
                                                                        className={classes.ticketDetailTime}
                                                                        pb={1}>
                                                                {moment(dataItem.departure_time).format('dddd، jDD jMMMM ماه')}
                                                                {" "} • {" "}
                                                                ساعت {moment(dataItem.departure_time).format('HH:mm')}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={700}
                                                                        className={classes.ticketDetailTime}>
                                                                {dataItem.departure_city_per} · {dataItem.departure_airport_per}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={400}
                                                                        className={classes.ticketDetailTime}
                                                                        pb={1}>
                                                                {moment(dataItem.arrival_time).format('dddd، jDD jMMMM ماه')}
                                                                {" "} • {" "}
                                                                ساعت {moment(dataItem.arrival_time).format('HH:mm')}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={700}
                                                                        className={classes.ticketDetailTime}>
                                                                {dataItem.arrival_city_per} · {dataItem.arrival_airport_per}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                                {/* stop box */}
                                                {/*<Stack flexDirection="row" gap={8.25} className={classes.stopBox}>*/}
                                                {/*    <Typography variant="overline" fontWeight={600}>۲۰ دقیقه </Typography>*/}
                                                {/*    <Typography variant="overline" fontWeight={600}>توقف در فرودگاه بین‌المللی شهید*/}
                                                {/*        بهشتی</Typography>*/}
                                                {/*</Stack>*/}
                                                {/* stop box */}
                                                {/*<Stack flexDirection="row" gap={1} alignItems="center" mr={{xs: 5, md: 27.5}} mb={4}>*/}
                                                {/*    <Box sx={{*/}
                                                {/*        width: {xs: 24, md: 32}, height: {xs: 24, md: 32},*/}
                                                {/*        position: "relative",*/}
                                                {/*        '& img': {*/}
                                                {/*            width: '100%',*/}
                                                {/*            height: '100%',*/}
                                                {/*            objectFit: "contain"*/}
                                                {/*        }*/}
                                                {/*    }}>*/}
                                                {/*        <Image src={activeFlight?.airline_logo?.['48']} fill alt={activeFlight?.airline_per}/>*/}
                                                {/*    </Box>*/}
                                                {/*    <Stack flexDirection="column">*/}
                                                {/*        <Typography variant="overline" fontWeight={700}*/}
                                                {/*                    className={classes.ticketDetailTime}>*/}
                                                {/*            {activeFlight?.airline_per}*/}
                                                {/*        </Typography>*/}
                                                {/*        <Typography variant="overline" fontWeight={400}*/}
                                                {/*                    className={classes.ticketDetailTime}>*/}
                                                {/*            شماره پرواز ۷۱۲۵*/}
                                                {/*        </Typography>*/}
                                                {/*    </Stack>*/}
                                                {/*</Stack>*/}
                                                {/*<Stack flexDirection="row" alignItems="center">*/}
                                                {/*    {!isMobileSize ?*/}
                                                {/*        <Typography variant="overline" fontWeight={400}*/}
                                                {/*                    className={classes.ticketDetailTime}>*/}
                                                {/*            {HHMMToTimeShort(dataItem?.duration)}*/}
                                                {/*        </Typography>*/}
                                                {/*        :*/}
                                                {/*        <Stack flexDirection="row" alignItems="center" gap={1.5} sx={{*/}
                                                {/*            position: "absolute",*/}
                                                {/*            marginRight: 5.5,*/}
                                                {/*            marginTop: -3.75*/}
                                                {/*        }}>*/}
                                                {/*            <Box>*/}
                                                {/*                <ClockIcon/>*/}
                                                {/*            </Box>*/}
                                                {/*            <Typography variant="overline" fontWeight={700}*/}
                                                {/*                        className={classes.mobileClockText}>*/}
                                                {/*                {HHMMToTimeShort(dataItem?.duration)}*/}
                                                {/*            </Typography>*/}
                                                {/*        </Stack>*/}
                                                {/*    }*/}
                                                {/*    <Box mr={{xs: 0, md: 5}} ml={{xs: 3.25, md: 2}}>*/}
                                                {/*        {isMobileSize ?*/}
                                                {/*            <ConnectionMobileIcon/>*/}
                                                {/*            :*/}
                                                {/*            <ConnectionIcon/>*/}
                                                {/*        }*/}
                                                {/*    </Box>*/}
                                                {/*    <Stack flexDirection="column" gap={{xs: 12, md: 8.75}}>*/}
                                                {/*        <Box>*/}
                                                {/*            <Typography variant="subtitle2" fontWeight={400}*/}
                                                {/*                        className={classes.ticketDetailTime}*/}
                                                {/*                        pb={1}>*/}
                                                {/*                یکشنبه، ۱۸ خردادماه • ساعت ۱۷:۵۰*/}
                                                {/*            </Typography>*/}
                                                {/*            <Typography variant="h6" fontWeight={700} className={classes.ticketDetailTime}>IKA*/}
                                                {/*                ·*/}
                                                {/*                فرودگاه بین‌المللی امام خمینی</Typography>*/}
                                                {/*        </Box>*/}
                                                {/*        <Box>*/}
                                                {/*            <Typography variant="subtitle2" fontWeight={400}*/}
                                                {/*                        className={classes.ticketDetailTime}*/}
                                                {/*                        pb={1}>*/}
                                                {/*                یکشنبه، ۱۸ خردادماه • ساعت ۱۸:۳۰*/}
                                                {/*            </Typography>*/}
                                                {/*            <Typography variant="h6" fontWeight={700} className={classes.ticketDetailTime}>فرودگاه*/}
                                                {/*                YUL · Montréal–pierre Elliott Trudeau International </Typography>*/}
                                                {/*        </Box>*/}
                                                {/*    </Stack>*/}
                                                {/*</Stack>*/}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}

                                <Typography variant="h4" fontWeight={700} pb={4.25} pt={{xs: 8, md: 20}}>
                                    آژانس‌های ارائه دهنده:
                                </Typography>
                                {cheapest.agencies && cheapest.agencies instanceof Array && cheapest.agencies.map((item: any, i: number) => (
                                    <Box key={`agancies-${i}`} className={classes.agencyBox}>
                                        <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                               justifyContent={{xs: "center", md: "space-between"}}>
                                            <Stack flexDirection="row" justifyContent={{xs: "flex-start", md: "center"}}
                                                   alignItems="center"
                                                   gap={3}>
                                                <Box sx={{
                                                    width: {xs: 24, md: 40}, height: {xs: 24, md: 40},
                                                    position: "relative",

                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: "contain"
                                                    }
                                                }}>
                                                    <Image src={item?.logo} fill alt={item?.name}/>
                                                </Box>
                                                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                                                    <Typography variant="h6" fontWeight={700}
                                                                className={classes.agencyName}
                                                                pt={1}>
                                                        {item?.name}
                                                    </Typography>
                                                    {!!item.is_suggestion &&
                                                        <BootstrapTooltip
                                                            placement="top"
                                                            title={<Typography variant="button" fontWeight={600}>
                                                                پیشنهاد یابکس
                                                            </Typography>}
                                                            arrow
                                                            className={classes.tooltip}
                                                        >
                                                            <Box>
                                                                <StarIcon/>
                                                            </Box>
                                                        </BootstrapTooltip>
                                                    }

                                                </Stack>


                                                {isMobileSize &&
                                                    <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                        <Typography variant="overline"
                                                                    fontWeight={600}>ارزان‌ترین</Typography>
                                                    </Box>
                                                }
                                            </Stack>
                                            <Stack flexDirection={{xs: "row-reverse", md: "row"}} alignItems="center"
                                                   gap={4}
                                                   justifyContent={{xs: "space-between", md: "flex-start"}}>
                                                {!isMobileSize &&
                                                    <>
                                                        {i === 0 &&
                                                            <Box
                                                                className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                                <Typography variant="overline"
                                                                            fontWeight={600}>ارزان‌ترین</Typography>
                                                            </Box>}
                                                        {!!item?.is_airline &&
                                                            <Box className={classNames(classes.tagBox, classes.tagBoxBlue)}>
                                                                <Typography variant="overline" fontWeight={600}>خرید مستقیم
                                                                    از
                                                                    ایرلاین</Typography>
                                                            </Box>}
                                                        {!!item?.is_winner_ticket &&
                                                            <Box className={classNames(classes.tagBox)}>
                                                                <Typography variant="overline" fontWeight={600}>بلیط همیشه
                                                                    برنده</Typography>
                                                            </Box>}
                                                    </>
                                                }
                                                <Typography variant="h6" fontWeight={700}
                                                            className={classNames(i === 0 ? classes.priceGreen : classes.price)}>
                                                    <CurrencyFormat value={persianPriceFormatter(activeFlight?.price)}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/> تومان
                                                </Typography>
                                                <Button component="a" href={item?.link} target={"_blank"} variant="outlined"
                                                        className={classNames(classes.containedButton)}>
                                                    <Typography variant="subtitle2"
                                                                fontWeight={900}> {!!item.has_direct_reserve ? 'خرید مستقیم' : 'رزرو بلیط'}</Typography>
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))}

                            </Box>
                        </Box>
                    </>
                }
            </>
            :
            <>
                <Box key={'external-flight'}>
                    <Box className={classes.ticketDetailContainer}>
                        <IconButton className={classes.closeIcon} sx={{
                            position: "absolute"
                        }} onClick={closeModal}>
                            {isMobileSize ?
                                <ArrowLeftIcon/>
                                :
                                <CloseIcon/>
                            }
                        </IconButton>
                        <Stack flexDirection="row" gap={3}>
                            {!isMobileSize &&
                                <Box className={classes.routeIcon}><RouteIcon/></Box>
                            }
                            <Stack flexDirection="column" gap={2}>
                                <Typography variant="h2" fontWeight={700}>
                                    {dataMemoSearch1?.extra?.from?.title}
                                    ←
                                    {dataMemoSearch1?.extra?.to?.title}
                                </Typography>
                                <Typography variant="h6" fontWeight={600} sx={{opacity: 0.7}}>
                                    {countToStr(passengers)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box className={classes.divider}></Box>
                    <Box key={'return_title'} className={classes.flightInfoBox}>
                        <Typography variant="h4" fontWeight={700} pb={4}>
                            اطلاعات پرواز:
                        </Typography>
                        {activeFlight.flights && activeFlight.flights instanceof Array && activeFlight.flights.map((item: any, i: number) => {
                            return item?.map((dataItem: any, index: number) =>
                                <Accordion key={`acc${index + i}`}
                                           expanded={expandedAccordion === `flight-go${i + index}`}
                                           onChange={handleChangeAccordion(`flight-go${i + index}`)}
                                           className={classes.accordion}>
                                    <AccordionSummary
                                        key={`flight-gobh-header${index + i}`}
                                        expandIcon={<ChevronDown/>}
                                        aria-controls="flight-gobh-content"
                                        id="flight-gobh-header"
                                    > <Box className={classes.flightCard}>
                                        <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                               justifyContent={{xs: "center", md: "space-between"}}>
                                            <Stack flexDirection={{xs: "row", md: "column"}}
                                                   justifyContent={{xs: "flex-start", md: "center"}} alignItems="center"
                                                   width="150px"
                                                   mt={{xs: -5.5, md: 0}}>
                                                <Box sx={{
                                                    width: {xs: 24, md: 56}, height: {xs: 24, md: 56},
                                                    position: "relative",
                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: "contain"
                                                    }
                                                }}>
                                                    <Image src={activeFlight?.airline_logo?.['48']} fill
                                                           alt={activeFlight?.airline_per}/>
                                                </Box>

                                            </Stack>
                                            <Stack flexDirection="column" gap={5} width="100%"
                                                   justifyContent="flex-end">
                                                <Stack flexDirection="row" gap={2} width="100%">
                                                    <Stack flexDirection="column" alignItems="center"
                                                           justifyContent="center">
                                                        <Typography variant="h5" component="span" fontWeight={700}
                                                                    className={classes.time}>{moment(dataItem?.departure_time).format('HH:mm')}</Typography>
                                                        <Typography variant="h6" component="span" fontWeight={400}
                                                                    className={classes.time}>{dataItem?.from}</Typography>
                                                    </Stack>
                                                    <Box className={classNames(
                                                        classes.slider,
                                                        classes.noStop
                                                        // classes.sliderBack
                                                    )}>
                                                        <Slider
                                                            size="small"
                                                            track={false}
                                                            aria-label="Always visible"
                                                            defaultValue={50}
                                                            valueLabelFormat={valuetext}
                                                            step={10}
                                                            marks={[
                                                                {
                                                                    value: 50,
                                                                    label: HHMMToTimeShort(dataItem?.duration),
                                                                },

                                                            ]}
                                                            value={50}
                                                            valueLabelDisplay="on"
                                                            disabled
                                                        />
                                                    </Box>
                                                    <Stack flexDirection="column" alignItems="center"
                                                           justifyContent="center">
                                                        <Typography variant="h5" component="span" fontWeight={700}
                                                                    className={classes.time}>{moment(dataItem?.arrival_time).format('HH:mm')}</Typography>
                                                        <Typography variant="h6" component="span" fontWeight={400}
                                                                    className={classes.time}>{dataItem?.to}</Typography>
                                                    </Stack>
                                                </Stack>

                                            </Stack>
                                        </Stack>
                                    </Box>

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack flexDirection="row" gap={1} alignItems="center" mr={{xs: 5, md: 27.5}}
                                               mb={4}>
                                            <Box sx={{
                                                width: {xs: 24, md: 32}, height: {xs: 24, md: 32},
                                                position: "relative",
                                                '& img': {
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: "contain"
                                                }
                                            }}>
                                                <Image src={activeFlight?.airline_logo?.['48']} fill
                                                       alt={activeFlight?.airline_per}/>
                                            </Box>
                                            <Stack flexDirection="column">
                                                <Typography variant="overline" fontWeight={700}
                                                            className={classes.ticketDetailTime}>
                                                    {activeFlight?.airline_per}
                                                </Typography>
                                                <Typography variant="overline" fontWeight={400}
                                                            className={classes.ticketDetailTime}>
                                                    شماره پرواز {activeFlight?.code}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack flexDirection="row" alignItems="center">
                                            {!isMobileSize ?
                                                <Typography variant="overline" fontWeight={400}
                                                            className={classes.ticketDetailTime}>
                                                    {HHMMToTimeShort(dataItem?.duration)}
                                                </Typography>
                                                :
                                                <Stack flexDirection="row" alignItems="center" gap={1.5} sx={{
                                                    position: "absolute",
                                                    marginRight: 5.5,
                                                    marginTop: -3.75
                                                }}>
                                                    <Box>
                                                        <ClockIcon/>
                                                    </Box>
                                                    <Typography variant="overline" fontWeight={700}
                                                                className={classes.mobileClockText}>
                                                        {HHMMToTimeShort(dataItem?.duration)}
                                                    </Typography>
                                                </Stack>
                                            }
                                            <Box mr={{xs: 0, md: 5}} ml={{xs: 3.25, md: 2}}>
                                                {isMobileSize ?
                                                    <ConnectionMobileIcon/>
                                                    :
                                                    <ConnectionIcon/>
                                                }
                                            </Box>
                                            <Stack flexDirection="column" gap={{xs: 12, md: 8.75}}>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={400}
                                                                className={classes.ticketDetailTime}
                                                                pb={1}>
                                                        {moment(dataItem.departure_time).format('dddd، jDD jMMMM ماه')}
                                                        {" "} • {" "}
                                                        ساعت {moment(dataItem.departure_time).format('HH:mm')}
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={700}
                                                                className={classes.ticketDetailTime}>
                                                        {dataItem.departure_city_per} · {dataItem.departure_airport_per}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={400}
                                                                className={classes.ticketDetailTime}
                                                                pb={1}>
                                                        {moment(dataItem.arrival_time).format('dddd، jDD jMMMM ماه')}
                                                        {" "} • {" "}
                                                        ساعت {moment(dataItem.arrival_time).format('HH:mm')}
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={700}
                                                                className={classes.ticketDetailTime}>
                                                        {dataItem.arrival_city_per} · {dataItem.arrival_airport_per}</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}

                        <Typography variant="h4" fontWeight={700} pb={4.25} pt={{xs: 8, md: 20}}>
                            آژانس‌های ارائه دهنده:
                        </Typography>
                        {activeFlight.agencies && activeFlight.agencies instanceof Array && activeFlight.agencies.map((item: any, i: number) => (
                            <Box key={`agancies-${i}`} className={classes.agencyBox}>
                                <Stack flexDirection={{xs: "column", md: "row"}} gap={8}
                                       justifyContent={{xs: "center", md: "space-between"}}>
                                    <Stack flexDirection="row" justifyContent={{xs: "flex-start", md: "center"}}
                                           alignItems="center"
                                           gap={3}>
                                        <Box sx={{
                                            width: {xs: 24, md: 40}, height: {xs: 24, md: 40},
                                            position: "relative",

                                            '& img': {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: "contain"
                                            }
                                        }}>
                                            <Image src={item?.logo} fill alt={item?.name}/>
                                        </Box>
                                        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                                            <Typography variant="h5" fontWeight={700}
                                                        className={classes.agencyName}
                                                        pt={1}>
                                                {item?.name}
                                            </Typography>
                                            {!!item.is_suggestion &&
                                                <BootstrapTooltip
                                                    placement="top"
                                                    title={<Typography variant="button" fontWeight={600}>
                                                        پیشنهاد یابکس
                                                    </Typography>}
                                                    arrow
                                                    className={classes.tooltip}
                                                >
                                                    <Box>
                                                        <StarIcon/>
                                                    </Box>
                                                </BootstrapTooltip>
                                            }

                                        </Stack>


                                        {isMobileSize &&
                                            <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                <Typography variant="overline" fontWeight={600}>ارزان‌ترین</Typography>
                                            </Box>
                                        }
                                    </Stack>
                                    <Stack flexDirection={{xs: "row-reverse", md: "row"}} alignItems="center" gap={4}
                                           justifyContent={{xs: "space-between", md: "flex-start"}}>
                                        {!isMobileSize &&
                                            <>
                                                {i === 0 &&
                                                    <Box className={classNames(classes.tagBox, classes.tagBoxGreen)}>
                                                        <Typography variant="overline"
                                                                    fontWeight={600}>ارزان‌ترین</Typography>
                                                    </Box>}
                                                {!!item?.is_airline &&
                                                    <Box className={classNames(classes.tagBox, classes.tagBoxBlue)}>
                                                        <Typography variant="overline" fontWeight={600}>خرید مستقیم از
                                                            ایرلاین</Typography>
                                                    </Box>}
                                                {!!item?.is_winner_ticket &&
                                                    <Box className={classNames(classes.tagBox)}>
                                                        <Typography variant="overline" fontWeight={600}>بلیط همیشه
                                                            برنده</Typography>
                                                    </Box>}
                                            </>
                                        }
                                        <Typography variant="h6" fontWeight={700}
                                                    className={classNames(i === 0 ? classes.priceGreen : classes.price)}>
                                            <CurrencyFormat value={persianPriceFormatter(activeFlight?.price)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}/> تومان
                                        </Typography>
                                        <Button component="a" href={item?.link} target={"_blank"} variant="outlined"
                                                className={classNames(classes.containedButton)}>
                                            <Typography variant="subtitle2"
                                                        fontWeight={900}> {!!item.has_direct_reserve ? 'خرید مستقیم' : 'رزرو بلیط'}</Typography>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        ))}

                    </Box>
                </Box>
            </>}
        {!isMobileSize && tripType === "1" &&
            <Stack flexDirection={"column"} gap={4} className={classes.changeButtons}>
                <IconButton disabled={prevId === '' || !completeSearch}
                            className={classNames(classes.changeFlighBtnt, prevId === '' && classes.disableBtn)}
                            onClick={() => {
                                nextFlight(prevId);
                                nextIdChange(prevId);
                            }}>
                    <ChevronUpPrimary/>
                </IconButton>
                <IconButton disabled={nextId === '' || !completeSearch}
                            className={classNames(classes.changeFlighBtnt, nextId === '' && classes.disableBtn)}
                            onClick={() => {
                                nextFlight(nextId);
                                nextIdChange(nextId);
                            }}>
                    <ChevronDownPrimary/>
                </IconButton>
            </Stack>
        }
    </Stack>);
}
export default TicketDetail;