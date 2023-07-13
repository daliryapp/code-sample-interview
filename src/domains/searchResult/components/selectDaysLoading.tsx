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


SwiperCore.use([Virtual]);
const SelectDaysLoading = () => {
    const classes = useSearchResultStyle();
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


    return (<Card className={classes.slectDaysCard}>
        <CardContent>
                    <Swiper
                        {...sliderSettings}
                    >
                        {Array(6)
                            .fill({})
                            .map((_, i) => (<SwiperSlide key={`slide${i}`} virtualIndex={i}
                                                         className={classes.selectdDaysSkeletone}>
                                <Stack flexDirection="column" justifyContent="center" alignItems="center" gap={3}
                                       width={'100%'}>
                                    <Skeleton variant="text"
                                              sx={{fontSize: '2rem', width: '100%'}}/>
                                    <Skeleton variant="text"
                                              sx={{fontSize: '2rem', width: '100%', transform: 'scale(1, 0.8)'}}/>
                                </Stack>
                            </SwiperSlide>))}
                    </Swiper>
        </CardContent>
    </Card>);
}
export default SelectDaysLoading;