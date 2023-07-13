import classNames from "classnames";
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    ButtonGroup
} from "@mui/material";
import CustomeRadio from 'src/components/CustomeRadio';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SeachSchema} from 'src/@core/validations/search.validation';
import useSearchStyle from './landing.style';
import {useState, useMemo, useEffect} from "react";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import useMediaQuery from "@mui/material/useMediaQuery";
import MyDatePicker from 'src/components/MyDatePicker';
import {dateToMoment, getYmdAdd, getMomentYmd} from 'src/@core/utils/dateManager';
import dynamic from 'next/dynamic';
import Passengers from 'src/components/Input/Passengers';
import {generateSearchUrl, SmoothScroll, generateSearchModel} from 'src/@core/utils/utils';
import {useRouter} from 'next/router'
import Location2 from 'public/icons/location2.svg'
import DateIcon from 'public/icons/date1.svg';
import ChevronDown from 'public/icons/chevron-down.svg';
import ListSearch from 'public/icons/list-search.svg';

const Location = dynamic(() => import("src/components/Input/Location"), {
    ssr: false,
});

const FlightTab = ({pageUse, onSearchPress, closeSideBar}: any) => {
    const router = useRouter()
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const classes = useSearchStyle();
    const [tab, setTab] = useState<number>(1);
    const [date1, setDate1] = useState<any>();
    const [date2, setDate2] = useState<any>();
    const [countStr, setCountStr] = useState("");
    const resolver = yupResolver(SeachSchema);
    const [type, setType] = useState<string>('went');
    const [openDials, setOpenDials] = useState({
        to1: false,
        date1: false,
        passenger1: false,
        to2: false,
        date2: false,
        date22: false,
        passenger2: false,
        to3: false,
        date3: false,
        passenger3: false,
    });
    const {
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
        watch,
        setValue,
    } = useForm<any>({
        defaultValues: {
            from: null,
            to: null,
            date: null,
            date2: null,
            passengers: {
                adult: 1,
                child: 0,
                infant: 0,
                cabin: 1
            },
        },
        resolver
    });
    const from = watch("from");
    const to = watch("to");
    const wentDate = watch("date");
    const backDate = watch("date2");
    const passengers = watch("passengers");
    const tripModel = useMemo(() => {
        let objTrip = Object();
        if (from) {
            objTrip.from = from;
        }
        if (to) {
            objTrip.to = to;
        }
        if (wentDate) {
            objTrip.date = wentDate;
        }
        if (backDate) {
            objTrip.date2 = backDate;
        }
        if (passengers) {
            objTrip.passengers = passengers;
        }
        return objTrip;
    }, [from, to, wentDate, backDate, passengers]);

    const onSubmit = async (data: any, change: boolean) => {
        try {
            if (onSearchPress) {
                onSearchPress(data);
            }
            if (pageUse == "HomePage") {
                const wrapper = document.querySelector('#app')
                if (wrapper) SmoothScroll(wrapper, 1000, 0)
            }
            const params: any = generateSearchModel(data, change, tab);
            const searchURL = generateSearchUrl(params);
            if (pageUse === 'PLP' && isMobileSize) {
                closeSideBar();
            }
            router.push({
                pathname: searchURL,
            }, undefined, {shallow: true})
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (pageUse === 'PLP') {
            const slug = router?.query?.slug;
            const dates: string | undefined = slug?.[1]?.toString();
            const adult: string | null = slug?.[2]?.toString() || null;
            const tripType: string | null = slug?.[3]?.toString() || null;
            const cabin: string | null = slug?.[4]?.toString() || null;
            const child: string | null = slug?.[5]?.toString() || null;
            const infant: string | null = slug?.[6]?.toString() || null;
            const date = dates?.split(',')[0] || null;
            const date2 = dates?.split(',')[1] || null;
            const passengers = {
                adult,
                child,
                infant,
                cabin
            };

            setValue('passengers', passengers);
            setValue('date', {year: date?.split('-')[0], month: date?.split('-')[1], day: date?.split('-')[2]});
            if (date2) {
                setValue('date2', {year: date2?.split('-')[0], month: date2?.split('-')[1], day: date2?.split('-')[2]});
            }

            if (localStorage.getItem('from')) {
                const from: string | null = localStorage.getItem('from');
                if (!!from) {
                    setValue('from', JSON.parse(from));
                }
            }
            if (localStorage.getItem('to')) {
                const to: string | null = localStorage.getItem('to');
                if (!!to) {
                    setValue('to', JSON.parse(to));
                }
            }

            if (tripType) {
                setTab(parseInt(tripType));
            }
        }

    }, [pageUse, router?.query]);

    return (<><Box sx={{
        backgroundColor: pageUse === "HomePage" ? "onPrimary.main" : "transparent",
        p: {xs: 4, md: 10},
        px: {xs: 4, md: 6},
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderTopRightRadius: {xs: 24, md: 0},
        boxShadow: pageUse === "HomePage" ? "0px 3px 50px rgba(4, 71, 109, 0.1)" : "none",
        zIndex: 2
    }}>
        {!isMobileSize ?
            <Stack flexDirection="row" gap={10} alignItems="center" mb={11}>
                <CustomeRadio isActive={tab === 1} onClick={() => {
                    setTab(1)
                }}>
                    <Typography variant="subtitle2" fontWeight="700" className={classes.radioText}>پرواز یک‌
                        طرفه</Typography>
                </CustomeRadio>
                <CustomeRadio isActive={tab === 2} onClick={() => {
                    setTab(2)
                }}>
                    <Typography variant="subtitle2" fontWeight="700" className={classes.radioText}>پرواز رفت و
                        برگشت</Typography>
                </CustomeRadio>
                <CustomeRadio isDisabled>
                    <Stack flexDirection="row" gap={1.2} alignItems="center">
                        <Typography variant="subtitle2" fontWeight="700" className={classes.disableText}>چند
                            مسیره</Typography>
                        <Box className={classes.badge}>
                            <Typography variant="overline" fontWeight={600}>بزودی</Typography>
                        </Box>
                    </Stack>
                </CustomeRadio>
            </Stack>
            :
            <Stack flexDirection="row" alignItems="center">
                <ButtonGroup variant="outlined" dir="ltr" aria-label="outlined button group"
                             className={classes.flightButton}>
                    <Button onClick={() => {
                        setTab(3)
                    }} disabled>
                        <Typography variant="subtitle2" fontWeight={700}>چند مسیره</Typography>
                    </Button>

                    <Button onClick={() => {
                        setTab(2)
                    }}>
                        <Typography variant="subtitle2" fontWeight={700}
                                    className={tab === 2 ? classes.activeTabColor : classes.deactiveTabColor}>رفت و
                            برگشت</Typography>
                    </Button>
                    <Button onClick={() => {
                        setTab(1)
                    }}>
                        <Typography variant="subtitle2" fontWeight={700}
                                    className={tab === 1 ? classes.activeTabColor : classes.deactiveTabColor}>یکطرفه</Typography>
                    </Button>
                </ButtonGroup>

            </Stack>
        }
        <Box
            className={classes.hr}
        ></Box>
        <Stack flexDirection={{xs: 'column', md: 'row'}} mt={{xs: 6, md: 10}} gap={4} className={classes.inputLabel}
               component='form'
               onSubmit={handleSubmit((data: any) => onSubmit(data, false))}
               noValidate>
            <Stack flexDirection={{xs: 'column', md: 'row'}} alignItems="center"
                   className={classNames(isMobileSize ? classes.mobileLocationBorder : null, isMobileSize && tab === 2 ? classes.borderBox : null)}>
                <Stack flexDirection="column" alignItems="start" gap={2}
                       sx={{
                           width: '100%'
                       }}>
                    {!isMobileSize &&
                        <Typography variant="subtitle2" fontWeight={700} sx={{pr: 3}}>مبدا</Typography>
                    }
                    <Controller
                        control={control}
                        name='from'
                        render={({field: {onChange, value}}: any) => (
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
                                   className={classNames(classes.inputSearchLocation, classes.noRadiusLeft, isMobileSize ? classes.noBorder : null)}>

                                <Location
                                    placeholder="از کجا قصد سفر دارید؟"
                                    icon={"icon-take_off"}
                                    pageUse={pageUse}
                                    isOpen={false}
                                    isChange={false}
                                    type="from"
                                    value={value}
                                    propOnFocus={() => {
                                        setOpenDials({...openDials, date1: false});
                                    }}
                                    onSelect={(loc: any) => {
                                        onChange(loc);
                                        localStorage.setItem('from', JSON.stringify(loc));
                                        setType('went');
                                        if (loc) {
                                            setOpenDials({...openDials, to1: true, date1: false});
                                        }
                                    }}
                                    error={errors?.from?.message}
                                />
                                <Location2/>
                            </Stack>
                        )}
                    />
                </Stack>
                {isMobileSize &&
                    <>
                        <Box className={classes.divider}></Box>
                        <Box className={classes.rightDivider}></Box>
                    </>
                }
                <Stack flexDirection="column" alignItems="start" gap={2}
                       sx={{
                           width: '100%'
                       }}>
                    {!isMobileSize &&
                        <Typography variant="subtitle2" fontWeight={700} sx={{pr: 3}}>مقصد</Typography>
                    }
                    <Controller
                        control={control}
                        name='to'
                        render={({field: {onChange, value}}: any) => (
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
                                   className={classNames(classes.inputSearchLocation, classes.noRadiusRight, isMobileSize ? classes.noBorder : null)}>
                                <Location
                                    placeholder="به کجا قصد سفر دارید؟"
                                    icon={"icon-take_on"}
                                    pageUse={pageUse}
                                    isOpen={openDials.to1}
                                    isChange={false}
                                    type="to"
                                    value={value}
                                    propOnFocus={(e: any) => {
                                        setOpenDials({...openDials, date1: false});
                                    }}
                                    onSelect={(loc: any) => {
                                        onChange(loc);
                                        localStorage.setItem('to', JSON.stringify(loc));
                                        setType('went');
                                        if (loc) {
                                            setOpenDials({...openDials, to1: false, date1: true});
                                        }
                                    }}

                                    error={errors?.to?.message}
                                />
                                {!isMobileSize &&
                                    <Location2/>
                                }
                            </Stack>
                        )}
                    />
                </Stack>
            </Stack>
            <Stack flexDirection={{xs: 'column', md: 'row'}} alignItems="center"
                   className={classNames(isMobileSize ? classes.dateBoxNoBorder : tab === 2 ? classes.dateBox : classes.dateBox2, isMobileSize && tab === 2 ? classes.borderBox : null)}>
                <Stack flexDirection="column" alignItems="start" gap={0} className={classes.fullWidthInput} id="date1">
                    {!isMobileSize &&
                        <Typography variant="subtitle2" fontWeight={700}
                                    sx={{pr: 3}}>{tab == 1 ? "تاریخ رفت" : "تاریخ رفت"}</Typography>
                    }
                    <Controller
                        control={control}
                        name='date'
                        render={({field: {onChange, value}}: any) => (
                            <>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    size='small'
                                    placeholder='لطفا تاریخ سفر خود را انتخاب کنید'
                                    name='date'
                                    error={errors.hasOwnProperty("date")}
                                    helperText={errors?.date?.message?.toString()}
                                    className={tab === 2 && isMobileSize ? classes.withTwoLineTravel : ""}
                                    onChange={onChange}
                                    value={value === null ? "" : dateToMoment(value).format('jYYYY/jMM/jDD')}
                                    onFocus={() => {
                                        setOpenDials({...openDials, date1: true});
                                    }}
                                    onClick={() => {
                                        if (tab === 2) {
                                            setValue("date", null);
                                            setValue("date2", null);
                                        }
                                    }}
                                    // onBlur={() => { setOpenDials({ ...openDials, date1: false }); }}
                                    sx={{
                                        mt: 2,
                                        mb: 0,
                                        backgroundColor: "onPrimary.main"
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (<>
                                                {tab === 1 && <DateIcon/>}
                                            </>
                                        )
                                    }}
                                />
                            </>

                        )}
                    />

                </Stack>
                {(tab === 2 && !isMobileSize) &&
                    <Box className={classes.dateDivider}></Box>
                }
                {tab === 2 &&
                    <Stack flexDirection="column" alignItems="start" gap={0} className={classes.fullWidthInput}
                           id="date2">
                        {!isMobileSize &&
                            <Typography variant="subtitle2" fontWeight={700} sx={{pr: 3}}>تاریخ برگشت</Typography>
                        }
                        <Controller
                            control={control}
                            name='date2'
                            render={({field: {onChange, value}}: any) => (
                                <>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        size='small'
                                        placeholder='لطفا تاریخ سفر خود را انتخاب کنید'
                                        name='date2'
                                        error={errors.hasOwnProperty("date2")}
                                        helperText={errors?.date2?.message?.toString()}
                                        className={tab === 2 && isMobileSize ? classes.withTwoLineTravel : ""}
                                        onChange={onChange}
                                        value={value === null ? "" : dateToMoment(value).format('jYYYY/jMM/jDD')}
                                        onFocus={() => {
                                            setOpenDials({...openDials, date2: true});
                                        }}
                                        sx={{
                                            mt: {xs: '-1px', md: 2},
                                            mb: 0,
                                            backgroundColor: "onPrimary.main",
                                        }}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <DateIcon/>
                                            )
                                        }}
                                    />
                                </>
                            )}
                        />
                    </Stack>
                }
                <MyDatePicker
                    flight={{
                        from: from,
                        to: to
                    }}
                    isRange={tab === 2}
                    from={dateToMoment(date1)}
                    to={tab === 2 && (date2 ? dateToMoment(date2) : dateToMoment(getYmdAdd(date1, 2)))}
                    isOpen={openDials.date1 || openDials.date2}
                    onClose={() => {
                        setOpenDials({...openDials, date1: false, date2: false});
                        setType('went');
                    }}
                    min={null}
                    max={null}
                    type={type}
                    setType={setType}
                    pageUse={pageUse}
                    onSelect={(selectday: any) => {
                        if (tab == 1) {
                            setDate1(getMomentYmd(selectday));
                            setDate2(getYmdAdd(getMomentYmd(selectday), 2));
                            setValue("date", getMomentYmd(selectday))
                            setValue("date2", getYmdAdd(getMomentYmd(selectday), 2));
                            setOpenDials({...openDials, date1: false, date2: false, passenger1: true});
                        } else {
                            setDate1(getMomentYmd(selectday.from));
                            setDate2(getMomentYmd(selectday.to));
                            setValue("date", getMomentYmd(selectday.from))
                            setValue("date2", getMomentYmd(selectday.to));
                            if (!!wentDate && !!backDate) {
                                setOpenDials({...openDials, date1: false, date2: false, passenger1: true})
                            } else {
                                setOpenDials({...openDials, date1: true, date2: true, passenger1: false})
                            }
                        }
                    }}/>
            </Stack>

            <Stack flexDirection="column" alignItems="start" gap={0} className={classes.fullWidthInput}>
                {!isMobileSize &&
                    <Typography variant="subtitle2" fontWeight={700} sx={{pr: 3}}>تعداد نفرات</Typography>
                }
                <Controller
                    control={control}
                    name='passengers'
                    render={({field: {onChange, value}}: any) => (<>
                            <Passengers
                                onChange={(passenger) => {
                                    onChange(passenger)
                                }}
                                initPassengers={value}
                                pageUse={pageUse}
                                trip={tripModel}
                                isOpen={openDials.passenger1}
                                setCountStr={setCountStr}
                                onClose={() => {
                                    setOpenDials({...openDials, date1: false, date2: false, passenger1: false});
                                    setTimeout(() => {
                                        setOpenDials({...openDials, date1: false, date2: false, passenger1: false});
                                    }, 500)
                                }}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                size='small'
                                placeholder='چند نفر هستید؟'
                                name='date'
                                onFocus={() => {
                                    setOpenDials({...openDials, date2: false, date1: false, passenger1: true});
                                }}
                                value={countStr}
                                sx={{
                                    mt: 2,
                                    mb: 0,
                                    backgroundColor: "onPrimary.main"
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <ChevronDown/>
                                    )
                                }}
                            />
                        </>

                    )}
                />

            </Stack>
            {isMobileSize && pageUse === 'PLP' ?
                <Box className={classes.searchButtonPlp}>
                    <Button variant="contained" color="primary"
                            className={classNames(classes.searchButton)}
                            type="submit">
                        <Typography variant="button" color="onPrimary.main" fontWeight={900}>اعمال
                            تغییرات</Typography>
                    </Button>
                </Box>
                :
                <Button variant="contained" color="primary"
                        className={classNames(classes.searchButton)}
                        type="submit">
                    <Stack flexDirection="row" gap={2.5} alignItems="center">
                        <ListSearch/>
                        <Typography variant="button" color="onPrimary.main" fontWeight={900}> جستجوی پرواز</Typography>
                    </Stack>
                </Button>
            }
        </Stack>
        {isMobileSize &&
            <div className={`overlay_main_new`} ></div>
        }
    </Box>
    </>);
}
export default FlightTab;