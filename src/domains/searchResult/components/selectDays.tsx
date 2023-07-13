import React, {useEffect, useMemo, useState} from 'react';
import {
    Stack,
    Card,
    CardContent,
    Typography,
    Skeleton
} from "@mui/material";
import SwiperCore, {Virtual} from 'swiper';
import useSearchResultStyle from '../searchResult.style';
import {Swiper, SwiperSlide} from "swiper/react";
import CurrencyFormat from 'react-currency-format';
import {CustomPrevArrow, CustomNextArrow} from 'src/components/CustomSwiperArrows2';
import "swiper/swiper-bundle.min.css";
import classNames from "classnames";
import {useGetCharts} from "@/_hooks/search/search.hook";
import {useRouter} from "next/router";
import {dateToMoment} from '@/@core/utils/dateManager';
import moment from "moment-jalaali";
import {changeDateUrl, generateFilterUrl, persianPriceFormatter} from "@/@core/utils/utils";
import SelectDaysLoading from './selectDaysLoading';


SwiperCore.use([Virtual]);

const SelectDays = () => {
    const router = useRouter();
    const memoResult = useMemo(() => {
        const slug: string[] = (router.query.slug as string[]) || [];
        const dates: string | undefined = slug?.[1]?.toString();
        const destination: string | undefined = slug?.[0]?.toString();
        return {
            from: destination.split('-')[0],
            to: destination.split('-')[1],
            date1: {
                day: dates.split('-')[2],
                month: dates.split('-')[1],
                year: dates.split('-')[0]
            }
        }
    }, [router]);
    const [queryDate, setQueryDate] = useState(`${memoResult?.date1.year}-${memoResult?.date1.month}-${memoResult?.date1.day}`);

    const {data: chartData, isLoading} = useGetCharts({
        from: memoResult.from,
        to: memoResult.to,
        date_from: dateToMoment(memoResult.date1).clone().subtract(10, 'day').unix(),
        date_to: 0,
        mode: 1
    });


    const [swiperRef, setSwiperRef] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(2);
    const classes = useSearchResultStyle();
    // eslint-disable-next-line
    const slideTo = (index: number) => {
        swiperRef.slideTo(index, 0);
        setActiveSlide(index)
    };
    const sliderSettings = {
        className: "mySwiper3",
        slidesPerView: 5,
        spaceBetween: 0,
        breakpoints: {
            1800: {slidesPerView: 5},
            1600: {slidesPerView: 5},
            1400: {slidesPerView: 5},
            1200: {slidesPerView: 5},
            300: {slidesPerView: 3},
        },
    };
    useEffect(() => {
        if (chartData?.items.length > 0 && swiperRef) {
            const filteredTodayIndex = chartData?.items.findIndex((item: any) => item.date_fa === `${memoResult?.date1.year}-${memoResult?.date1.month}-${memoResult?.date1.day}`);
            if (filteredTodayIndex === -1) {
                slideTo(3)
            } else {
                slideTo(filteredTodayIndex)
            }
        }
    }, [chartData?.items, swiperRef, slideTo, memoResult]);
    useEffect(() => {
        const genUrl = changeDateUrl(Object.assign(router.query), queryDate);
        router.push(
            {
                pathname: genUrl.url,
                query: genUrl.query,
            },
            undefined,
            {scroll: false, shallow: true}
        );

        // eslint-disable-next-line
    }, [queryDate])
    if(isLoading){
        return <SelectDaysLoading />
    }else{
        return (<Card className={classes.slectDaysCard}>
            <CardContent>
                <Swiper
                    onSwiper={setSwiperRef}
                    centeredSlides
                    virtual
                    {...sliderSettings}
                >
                    {
                        isLoading ?
                            Array(34)
                                .fill({})
                                .map((_, i) => (<SwiperSlide key={`slide${i}`} virtualIndex={i} className={classes.selectdDaysSkeletone}>
                                    <Stack flexDirection="column" justifyContent="center" alignItems="center" gap={3} width={'100%'}>
                                        <Skeleton variant="text"
                                                  sx={{fontSize: '2rem', width: '100%'}}/>
                                        <Skeleton variant="text"
                                                  sx={{fontSize: '2rem', width: '100%', transform: 'scale(1, 0.8)'}}/>
                                    </Stack>
                                </SwiperSlide>))
                            :
                            chartData?.items && chartData?.items?.map((slideContent: any, index: number) => (
                                <SwiperSlide key={`slide${index}`} virtualIndex={index}>
                                    <Stack flexDirection="column" justifyContent="center" onClick={() => {
                                        slideTo(index);
                                        setQueryDate(slideContent?.date_fa);
                                    }} alignItems="center" gap={3}
                                           className={classNames(classes.dayItem, activeSlide === index && classes.activeDay)}>
                                        <Typography variant="subtitle2" fontWeight={700} className={classes.daySelectTitle}
                                                    whiteSpace="nowrap">{slideContent.day} {moment(slideContent.date, 'YYYY/MM/DD').format('jM/jDD')}</Typography>
                                        <Typography variant="h3" fontWeight={600}>
                                            {slideContent.price === -1 ? '...' :
                                                <CurrencyFormat value={persianPriceFormatter(slideContent?.price)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}/>
                                            }
                                        </Typography>
                                    </Stack>
                                </SwiperSlide>
                            ))
                    }
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            position: "absolute", width: '103%',
                            top: {xs: 25, md: 30},
                            right: '-7px',
                            display: {xs: "none", md: "flex"}
                        }}
                        alignItems="center"
                        justifyContent="space-between"
                        px={0}
                    >
                        <CustomPrevArrow/>
                        <CustomNextArrow/>
                    </Stack>
                </Swiper>
            </CardContent>
        </Card>);
    }

}
export default SelectDays;