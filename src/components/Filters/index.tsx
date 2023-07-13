import {FC, useMemo, useState, useEffect} from "react";
import {
    Box,
    Button,
    Stack,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Slider,
    Checkbox,
    Collapse
} from "@mui/material";
import useFilterStyle from './filters.style';
import Image from "next/image";
import {useGetFetchQuery} from '@/_hooks/search/search.hook';
import CurrencyFormat from 'react-currency-format';
import {useRouter} from "next/router";
import useDebounce from "src/_hooks/app/useDebounce";
import {
    persianPriceFormatter,
    setAvailableFilters,
    mapPart,
    generateFilterUrl
} from '@/@core/utils/utils';
import ArrowDownIcon from 'public/icons/fi-sr-angle-small-down.svg';
import {useSelector} from "react-redux";
import {RootState} from "@/@core/redux/store";
import {BootstrapTooltip} from '@/components/bootstrapTooltip';

function valuetext(value: number) {
    return <><CurrencyFormat value={persianPriceFormatter(value)} displayType={'text'} thousandSeparator={true}/></>;
}

const readMoreLength = 5;
const Filters: FC = () => {
    const classes = useFilterStyle();
    const router = useRouter();
    const completeSearch = useSelector((state: RootState) => state.app.completeSearch);
    const searchNoResult = useSelector((state: RootState) => state.app.searchNoResult);
    const [previusData, setPreviusData] = useState<any>(null);
    const [filters, setFilters] = useState<any>(router.query);
    const debouncedFilter = useDebounce(filters, 1000);
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>();
    const [moreItems, setMoreItems] = useState<string | false>(false);
    const [categoryExpanded, setCategoryExpanded] = useState<string | false>(false);
    const data = useGetFetchQuery("search2");
    const dataSearch1 = useGetFetchQuery("search");
    const dataSearch: any = useMemo(() => data[data.length - 1][1], [data]);
    useEffect(()=>{
        if(searchNoResult || !completeSearch){
            setExpandedAccordion('');
        }else{
            setExpandedAccordion('panel2');
        }
    },[searchNoResult , completeSearch])
    useEffect(() => {
        if (dataSearch && dataSearch.hasOwnProperty('filters')) {
            setPreviusData(dataSearch);
        }
    }, [dataSearch]);
    const dataMemoSearch1: any = useMemo(() => dataSearch1[dataSearch1.length - 1][1], [dataSearch1]);
    const availableFilters = useMemo(() => setAvailableFilters(previusData?.filters), [previusData])
    const [minDepartureRange, setMinDepartureRange] = useState(
        availableFilters?.minDepartureRange
    );
    const [minArrivalRange, setMinArrivalRange] = useState(
        availableFilters?.minArrivalRange
    );
    const [sliderValue, setSliderValue] = useState<number[]>([previusData?.filters.price.min, previusData?.filters.price.max]);
    const queryFilter = useMemo(() => router.query, [router.query]);

    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedAccordion(isExpanded ? panel : false);
        };
    const handleChangeCategory =
        (panel: string) => {
            if (categoryExpanded === panel) {
                setCategoryExpanded(false);
            } else {
                setCategoryExpanded(panel);
            }
        };

    const handleChangeSlider = (event: Event, newValue: any) => {
        setSliderValue(newValue as number[]);
        if (
            newValue[0] !== undefined &&
            newValue[1] !== undefined
        ) {
            setFilters((old: any) => {
                return {...old, minPrice: newValue[0], maxPrice: newValue[1]};
            });
        }
    };
    const searchcount = useMemo(() => {
        let retValu = 0;
        let withCapacityFlight = [];
        if (previusData?.params?.is_internal && previusData?.params?.one_way) {
            withCapacityFlight = previusData?.flights;
            retValu = withCapacityFlight?.length;
        } else if (previusData?.params?.is_internal && !previusData?.params?.one_way) {
            withCapacityFlight = previusData?.went;
            retValu = withCapacityFlight?.length;
        } else if (!previusData?.params?.is_internal) {
            withCapacityFlight = previusData?.flights;
            retValu = withCapacityFlight?.length;
        }
        return {searchResultCount: retValu, resultData: withCapacityFlight};
    }, [previusData]);
    useEffect(() => {
        if (availableFilters?.minDepartureRange instanceof Array) {
            availableFilters?.minDepartureRange.forEach(function (item2: any) {
                item2["length"] = searchcount?.resultData?.filter(
                    (item: any) =>
                        item.departure_time >= item2.code / 1000 &&
                        item.departure_time <= item2.code2 / 1000
                ).length;
            });
            setMinDepartureRange(availableFilters?.minDepartureRange);
        }
    }, [availableFilters?.minDepartureRange, searchcount]);

    useEffect(() => {
        if (availableFilters?.minArrivalRange instanceof Array) {
            availableFilters?.minArrivalRange.forEach(function (item2: any) {
                item2["length"] = searchcount?.resultData?.filter(
                    (item: any) =>
                        item.arrival_time >= item2.code / 1000 &&
                        item.arrival_time <= item2.code2 / 1000
                ).length;
            });
            setMinArrivalRange(availableFilters?.minArrivalRange);
        }
    }, [availableFilters?.minArrivalRange, searchcount]);
    useEffect(() => {
        if (queryFilter?.minPrice && queryFilter?.maxPrice) {
            setSliderValue([parseInt(queryFilter?.minPrice as string), parseInt(queryFilter?.maxPrice as string)]);
        } else {
            if (previusData?.filters) {
                setSliderValue([previusData?.filters.price.min, previusData?.filters.price.max]);
            }
        }

    }, [previusData, queryFilter]);
    const handleChangeMoreItems =
        (panel: string) => {
            if (moreItems === panel) {
                setMoreItems(false);
            } else {
                setMoreItems(panel);
            }
        };
    const filterGenerator = (value: boolean, nameForm: string, item: any, title: string) => {
        if (value) {
            setFilters((old: any) => {
                if (old[nameForm]) {
                    return {
                        ...old,
                        [nameForm]: [
                            ...old[nameForm],
                            title == "each" ? item : item.code,
                        ],
                    };
                } else {
                    return {
                        ...old,
                        [nameForm]: [title == "each" ? item : item.code],
                    };
                }
            });
        } else {
            if (filters[nameForm].length == 0) {
                let oldfilters = {...filters};
                delete oldfilters[nameForm];
                setFilters(oldfilters);
            } else {
                let nameFormValue = filters[nameForm];
                if (!Array.isArray(nameFormValue)) {
                    nameFormValue = [nameFormValue];
                }
                setFilters((old: any) => {
                    return {
                        ...old,
                        [nameForm]: nameFormValue.filter((a: any) => {
                            if (a === (title == "each" ? item : item.code))
                                return false;
                            return true;
                        }),
                    };
                });
            }
        }
    }
    useEffect(() => {
        const genUrl = generateFilterUrl(Object.assign(router.query, debouncedFilter));
        router.push(
            {
                pathname: genUrl.url,
                query: genUrl.query,
            },
            undefined,
            {scroll: false, shallow: true}
        );

        // eslint-disable-next-line
    }, [debouncedFilter]);
    const resetFilters = () => {
        const genUrl = generateFilterUrl(Object.assign(router.query, debouncedFilter));
        setFilters((old: any) => {
            return {slug: old.slug}
        });
        router.push(
            {
                pathname: genUrl.url,
                query: {},
            },
            undefined,
            {scroll: false, shallow: true}
        );
    };
    return <Box className={classes.filterBox} id="filter-box" sx={{
        opacity: searchNoResult ? 0.3 : 1
    }}>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-end" mb={6.25} mt={-9}>
            <Stack flexDirection="column" alignItems="flex-start" sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}>
                <Typography variant="h4" component="span" fontWeight={700}>فیلترها</Typography>
                <Typography variant="h6" component="span" fontWeight={600} className={classes.subtitleColor}>تعداد
                    نتایج: {searchcount?.searchResultCount} مورد</Typography>
            </Stack>
            <Button
                disabled={searchNoResult || !completeSearch}
                sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                onClick={resetFilters}
                variant="text"
                className={classes.clearFilter}>
                <Typography
                    variant="subtitle2"
                    component="span"
                    lineHeight={'32px'}
                    fontWeight={600}>حذف همه
                    فیلتر‌ها
                </Typography>
            </Button>
        </Stack>
        {previusData?.filters.price.min && previusData?.filters.price.min > 0 &&
            <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'price'}
                       sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                       onChange={handleChangeAccordion('price')}>
                <AccordionSummary
                    expandIcon={<ArrowDownIcon/>}
                    aria-controls="pricebh-content"
                    id="pricebh-header"
                >
                    <Typography variant="h5" fontWeight={700}>
                        قیمت
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BootstrapTooltip
                        placement="top"
                        title={<Typography variant="subtitle2" fontWeight={600}>
                            {searchcount?.searchResultCount} پرواز
                            </Typography>}
                        arrow
                        className={classes.tooltip}
                    >
                        <Box mt={9.25} className={classes.sliderBox} sx={{opacity: !completeSearch ? 0.3 : 1}}>
                            <Slider
                                disabled={!completeSearch}
                                step={1000}
                                min={previusData?.filters.price.min}
                                max={previusData?.filters.price.max}
                                getAriaLabel={() => 'Temperature range'}
                                value={sliderValue}
                                onChange={handleChangeSlider}
                                valueLabelDisplay="auto"
                                valueLabelFormat={valuetext}
                                disableSwap
                            />
                        </Box>
                    </BootstrapTooltip>
                    <Stack flexDirection="row" justifyContent="space-between" mt={0} className={classes.sliderText}
                           pb={6}>
                        <Typography variant="subtitle2" fontWeight={600} component="span">از
                            <CurrencyFormat value={persianPriceFormatter(previusData?.filters.price.min)}
                                            displayType={'text'} thousandSeparator={true}/>
                            تومان</Typography>
                        <Typography variant="subtitle2" fontWeight={600} component="span">تا
                            <CurrencyFormat value={persianPriceFormatter(previusData?.filters.price.max)}
                                            displayType={'text'} thousandSeparator={true}/>
                            تومان</Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        }
        {availableFilters?.special_offers instanceof Array &&
            availableFilters?.special_offers.length > 1 && (
                <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'panel1'}
                           sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                           onChange={handleChangeAccordion('panel1')}>
                    <AccordionSummary
                        expandIcon={<ArrowDownIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            نوع بلیط
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {availableFilters?.special_offers?.map((item: any, index: number) =>
                            <Stack key={`typeDep-${index}`} flexDirection="row" gap={2} alignItems="center">
                                <Checkbox
                                    checked={!!(queryFilter?.['special_offers'] && queryFilter?.['special_offers'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'special_offers', item, 'each');
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.each}</Typography>
                            </Stack>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
        {availableFilters?.stops instanceof Array &&
            availableFilters?.stops.length > 1 && (
                <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'stop'}
                           sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                           onChange={handleChangeAccordion('stop')}>
                    <AccordionSummary
                        expandIcon={<ArrowDownIcon/>}
                        aria-controls="stopbh-content"
                        id="stopbh-header"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            توقف
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {availableFilters?.stops?.map((item: any, index: number) =>
                            <Stack key={`stopDep-${index}`} flexDirection="row" gap={2} alignItems="center"
                                   sx={{opacity: !completeSearch ? 0.3 : 1}}>
                                <Checkbox
                                    disabled={!completeSearch}
                                    checked={!!(queryFilter?.['stops'] && queryFilter?.['stops'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'stops', item, 'title');
                                    }}/>
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.title}</Typography>
                            </Stack>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}

        {minDepartureRange && minDepartureRange.length > 0 &&
            <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'panel2'}
                       sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                       onChange={handleChangeAccordion('panel2')}>
                <AccordionSummary
                    expandIcon={<ArrowDownIcon/>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography variant="h5" fontWeight={700}>
                        زمان پرواز
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6" fontWeight={700}>زمان خروج
                        از {dataMemoSearch1?.extra?.from?.title}</Typography>
                    {minDepartureRange?.map((item: any, index: number) =>
                        <Stack key={`timeDep-${index}`} flexDirection="row" alignItems="center"
                               sx={{opacity: item?.length == 0 || !completeSearch ? 0.3 : 1}}
                               justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Checkbox
                                    disabled={item?.length === 0 || !completeSearch}
                                    checked={!!(queryFilter?.['minDeparture'] && queryFilter?.['minDeparture'].includes(item.code.toString()))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'minDeparture', item, 'date');
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.date}</Typography>
                            </Stack>
                            <Typography variant="subtitle2" fontWeight={600}
                                        className={classes.checkBoxLabel}>{item?.length} پرواز</Typography>
                        </Stack>
                    )}
                    <Typography variant="h6" fontWeight={700} pt={4} pb={0.5}>زمان ورود
                        به {dataMemoSearch1?.extra?.to?.title}</Typography>
                    {minArrivalRange?.map((item: any, index: number) =>
                        <Stack key={`timeArtival-${index}`} flexDirection="row" alignItems="center"
                               sx={{opacity: item?.length === 0 || !completeSearch ? 0.3 : 1}}
                               justifyContent="space-between">
                            <Stack flexDirection="row" gap={2} alignItems="center">
                                <Checkbox
                                    disabled={item?.length === 0 || !completeSearch}
                                    checked={!!(queryFilter?.['minArrival'] && queryFilter?.['minArrival'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'minArrival', item, 'date');
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.date}</Typography>
                            </Stack>
                            <Typography variant="subtitle2" fontWeight={600}
                                        className={classes.checkBoxLabel}>{item?.length} پرواز</Typography>
                        </Stack>
                    )}
                </AccordionDetails>
            </Accordion>
        }

        {availableFilters?.airlines instanceof Array &&
            availableFilters?.airlines.length > 1 && (
                <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'airlines'}
                           sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                           onChange={handleChangeAccordion('airlines')}>
                    <AccordionSummary
                        expandIcon={<ArrowDownIcon/>}
                        aria-controls="airlinesbh-content"
                        id="airlinesbh-header"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            ایرلاین‌ها
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {mapPart(availableFilters?.airlines, 0, readMoreLength, (item: any, index: number) =>
                            <Stack key={`airDep-${index}`} flexDirection="row" alignItems="center"
                                   sx={{opacity: !completeSearch ? 0.3 : 1}}
                                   justifyContent="space-between">
                                <Stack flexDirection="row" gap={1.25} alignItems="center">
                                    <Checkbox
                                        disabled={!completeSearch}
                                        checked={!!(queryFilter?.['airlines'] && queryFilter?.['airlines'].includes(item.code))}
                                        className={classes.checkBox}
                                        onChange={(evt, value) => {
                                            filterGenerator(value, 'airlines', item, 'airline_per');
                                        }}/>
                                    <Image
                                        width="24"
                                        height="24"
                                        src={item?.logo}
                                        alt=""
                                    />
                                    <Typography variant="h6" fontWeight={600}
                                                className={classes.checkBoxLabel}>{item?.airline_per}</Typography>
                                </Stack>
                                <Typography variant="subtitle2" fontWeight={600} className={classes.checkBoxLabel}>
                                    <CurrencyFormat value={persianPriceFormatter(item["min_price"])}
                                                    displayType={'text'} thousandSeparator={true}/>
                                    {" "}
                                    تومان
                                </Typography>
                            </Stack>
                        )}
                        {availableFilters?.airlines?.length > readMoreLength ?
                            <Collapse className={classes.collpase} in={moreItems === 'airlines'} timeout="auto"
                                      unmountOnExit sx={{position: "relative"}}>
                                {mapPart(availableFilters?.airlines, readMoreLength, availableFilters?.airlines?.length, (item: any, index: number) =>
                                    <Stack key={`airDep-${index}`} flexDirection="row" alignItems="center"
                                           sx={{opacity: !completeSearch ? 0.3 : 1}}
                                           justifyContent="space-between">

                                        <Stack flexDirection="row" gap={1.25} alignItems="center">
                                            <Checkbox
                                                disabled={!completeSearch}
                                                checked={!!(queryFilter?.['airlines'] && queryFilter?.['airlines'].includes(item.code))}
                                                className={classes.checkBox}
                                                onChange={(evt, value) => {
                                                    filterGenerator(value, 'airlines', item, 'airline_per');
                                                }}
                                            />
                                            <Image
                                                width="24"
                                                height="24"
                                                src={item?.logo}
                                                alt=""
                                            />
                                            <Typography variant="h6" fontWeight={600}
                                                        className={classes.checkBoxLabel}>{item?.airline_per}</Typography>
                                        </Stack>
                                        <Typography variant="subtitle2" fontWeight={600}
                                                    className={classes.checkBoxLabel}>
                                            <CurrencyFormat value={persianPriceFormatter(item["min_price"])}
                                                            displayType={'text'} thousandSeparator={true}/>
                                            {" "}
                                            تومان
                                        </Typography>
                                    </Stack>
                                )}
                            </Collapse>
                            :
                            <></>}
                        {availableFilters?.airlines?.length > readMoreLength ?
                            <Box my={6}>
                                <Button
                                    onClick={() => {
                                        handleChangeMoreItems('airlines')
                                    }}
                                    variant="text"
                                    className={classes.clearFilter}>
                                    <Typography variant="subtitle2" component="span" fontWeight={600}>
                                        {moreItems === 'airlines' ?
                                            `مشاهده موارد کمتر`
                                            :
                                            ` مشاهده ${availableFilters?.airlines?.length - readMoreLength} مورد بیشتر`
                                        }
                                    </Typography>
                                </Button>
                            </Box>
                            :
                            <></>
                        }
                    </AccordionDetails>
                </Accordion>
            )
        }
        {
            availableFilters?.agencies instanceof Array &&
            availableFilters?.agencies.length > 1 &&
            <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'flightAgency'}
                       sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                       onChange={handleChangeAccordion('flightAgency')}>
                <AccordionSummary
                    expandIcon={<ArrowDownIcon/>}
                    aria-controls="flightAgencybh-content"
                    id="flightAgencybh-header"
                >
                    <Typography variant="h5" fontWeight={700}>
                        آزانس ها
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {mapPart(availableFilters?.agencies, 0, readMoreLength, (item: any, index: number) =>
                        <Stack key={`agenDep-${index}`} flexDirection="row" alignItems="center"
                               sx={{opacity: !completeSearch ? 0.3 : 1}}
                               justifyContent="space-between">


                            <Stack flexDirection="row" gap={1.25} alignItems="center">
                                <Checkbox
                                    disabled={!completeSearch}
                                    checked={!!(queryFilter?.['agencies'] && queryFilter?.['agencies'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'agencies', item, 'name');
                                    }}
                                />
                                <Image
                                    width="24"
                                    height="24"
                                    src={item?.logo}
                                    alt=""
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.name}</Typography>
                            </Stack>
                            <Typography variant="subtitle2" fontWeight={600} className={classes.checkBoxLabel}>
                                <CurrencyFormat value={persianPriceFormatter(item["min_price"])} displayType={'text'}
                                                thousandSeparator={true}/>
                                {" "}
                                تومان
                            </Typography>
                        </Stack>
                    )}
                    {availableFilters?.agencies?.length > readMoreLength ?
                        <Collapse className={classes.collpase} in={moreItems === 'agenDep'} timeout="auto" unmountOnExit
                                  sx={{position: "relative"}}>
                            {mapPart(availableFilters?.agencies, readMoreLength, availableFilters?.agencies?.length, (item: any, index: number) =>
                                <Stack key={`agenDep-${index}`} flexDirection="row" alignItems="center"
                                       sx={{opacity: !completeSearch ? 0.3 : 1}}
                                       justifyContent="space-between">

                                    <Stack flexDirection="row" gap={1.25} alignItems="center">
                                        <Checkbox
                                            disabled={!completeSearch}
                                            checked={!!(queryFilter?.['agencies'] && queryFilter?.['agencies'].includes(item.code))}
                                            className={classes.checkBox}
                                            onChange={(evt, value) => {
                                                filterGenerator(value, 'agencies', item, 'name');
                                            }}
                                        />
                                        <Image
                                            width="24"
                                            height="24"
                                            src={item?.logo}
                                            alt=""
                                        />
                                        <Typography variant="h6" fontWeight={600}
                                                    className={classes.checkBoxLabel}>{item?.name}</Typography>
                                    </Stack>
                                    <Typography variant="subtitle2" fontWeight={600} className={classes.checkBoxLabel}>
                                        <CurrencyFormat value={persianPriceFormatter(item["min_price"])}
                                                        displayType={'text'} thousandSeparator={true}/>
                                        {" "}
                                        تومان
                                    </Typography>
                                </Stack>
                            )}
                        </Collapse>
                        : <></>
                    }
                    {availableFilters?.agencies?.length > readMoreLength ?
                        <Box my={6}>
                            <Button
                                onClick={() => {
                                    handleChangeMoreItems('agenDep')
                                }}
                                variant="text"
                                className={classes.clearFilter}>
                                <Typography variant="subtitle2" component="span" fontWeight={600}>
                                    {moreItems === 'agenDep' ?
                                        `مشاهده موارد کمتر`
                                        :
                                        ` مشاهده ${availableFilters?.agencies?.length - readMoreLength} مورد بیشتر`
                                    }

                                </Typography>
                            </Button>
                        </Box>
                        :
                        <></>
                    }
                </AccordionDetails>
            </Accordion>
        }
        {
            availableFilters?.airports instanceof Array &&
            availableFilters?.airports.length > 1 && (
                <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'airports'}
                           sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                           onChange={handleChangeAccordion('airports')}>
                    <AccordionSummary
                        expandIcon={<ArrowDownIcon/>}
                        aria-controls="airportsbh-content"
                        id="airportsbh-header"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            فرودگاه‌ها
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {availableFilters?.airports?.map((item: any, index: number) =>
                            <Stack key={`airportsDep-${index}`} flexDirection="row" gap={2} alignItems="center"
                                   sx={{opacity: !completeSearch ? 0.3 : 1}}>
                                <Checkbox
                                    disabled={!completeSearch}
                                    checked={!!(queryFilter?.['airports'] && queryFilter?.['airports'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'airports', item, 'persian_name');
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item?.persian_name}</Typography>
                            </Stack>
                        )}
                    </AccordionDetails>
                </Accordion>
            )
        }
        {
            availableFilters?.airCrafts instanceof Array &&
            availableFilters?.airCrafts.length > 1 && (
                <Accordion disabled={searchNoResult || !completeSearch} expanded={expandedAccordion === 'airCrafts'}
                           sx={{opacity:searchNoResult || !completeSearch ? 0.3 : 1}}
                           onChange={handleChangeAccordion('airCrafts')}>
                    <AccordionSummary
                        expandIcon={<ArrowDownIcon/>}
                        aria-controls="airCraftsbh-content"
                        id="airCraftsbh-header"
                    >
                        <Typography variant="h5" fontWeight={700}>
                            هواپیما‌ها
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {availableFilters?.airCrafts?.map((item: any, index: number) =>
                            <Stack key={`airCraftsDep-${index}`} flexDirection="row" gap={2} alignItems="center"
                                   sx={{opacity: !completeSearch ? 0.3 : 1}}>
                                <Checkbox
                                    disabled={!completeSearch}
                                    checked={!!(queryFilter?.['airCrafts'] && queryFilter?.['airCrafts'].includes(item.code))}
                                    className={classes.checkBox}
                                    onChange={(evt, value) => {
                                        filterGenerator(value, 'airCrafts', item, 'each');
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}
                                            className={classes.checkBoxLabel}>{item}</Typography>
                            </Stack>
                        )}
                    </AccordionDetails>
                </Accordion>
            )
        }
    </Box>
}
export default Filters;