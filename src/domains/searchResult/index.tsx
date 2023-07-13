import {
    Box,
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import SearchResultHeader from './components/header.searchResult';
import SearhResultContainer from './components/container.searchResult';
import useSearchResultStyle from './searchResult.style';
import {useGetFlights, useGetSearch2} from "src/_hooks/search/search.hook";
import {useRouter} from 'next/router';
import {regenerateDestination} from 'src/@core/utils/utils';
import DownloadSection from "@/domains/landing/components/downloadSection";
import FavoriteLocationText from "@/domains/landing/components/favoriteLocText";
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from "@/@core/constance/breakpoints";
import Head from "next/head";

const SearchResultDomain = ({data}: any) => {
    const classes = useSearchResultStyle();
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const router = useRouter();
    const queryFilter = useMemo(() => router.query, [router.query]);
    const cloneFilter = useMemo(() => (({slug, ...o}) => o)(queryFilter), [queryFilter]);
    const [flightSearchParams, setFlightSearchParams] = useState<any>(null);
    const [previusData, setPreviusData] = useState(null);
    const clone = (({sort, ...o}) => o)(cloneFilter);
    const {
        data: searchResult,
        isLoading,
        refetch: refetchSearch,
        dataUpdatedAt: searchUpdateAt
    } = useGetFlights(flightSearchParams);
    const {
        data: search2Result,
        isLoading: loadingResult2,
        refetch: refetchSearch2,
        dataUpdatedAt: search2UpdateAt
    } = useGetSearch2(
        {
            transaction: searchResult?.transaction,
            filters: {
                sort: cloneFilter.sort,
                filters: clone,
                page: 1,
                per_page: 50
            }
        },
        !!searchResult
    )
    const requestToGetSearch = () => {
        const slug = (router.query.slug as string[]) || [];
        const destination: string | undefined = slug?.[0]?.toString();
        const dates: string | undefined = slug?.[1]?.toString();
        const adult: string | undefined = slug?.[2]?.toString();
        const tripType: string | undefined = slug?.[3]?.toString();
        const cabin: string | undefined = slug?.[4]?.toString();
        const child: string | undefined = slug?.[5]?.toString();
        const infant: string | undefined = slug?.[6]?.toString();
        const searchModel = Object();
        searchModel.adult = adult;
        searchModel.cabin = cabin;
        searchModel.child = child;
        searchModel.infant = infant;
        const finalParams = regenerateDestination(tripType, destination, dates);
        setFlightSearchParams({...searchModel, origin_dest: finalParams});
    }
    useEffect(() => {
        requestToGetSearch();
        // eslint-disable-next-line
    }, [router]);

    useEffect(() => {
        if (!!searchResult) {
            if (search2UpdateAt === 0) {
                // refetchSearch2();
            }
        }
        // eslint-disable-next-line
    }, [searchResult]);
    useEffect(() => {
        if (!!flightSearchParams) {
            if (searchUpdateAt === 0) {
                refetchSearch();
            }
        }
        // eslint-disable-next-line
    }, [flightSearchParams]);

    useEffect(() => {
        if (search2Result && search2Result.hasOwnProperty('filters')) {
            setPreviusData(search2Result);
        }
    }, [search2Result]);
    const pageTitle = useMemo(() => {
        if (!!searchResult?.extra?.from_country) {
            const {is_internal, extra}: any = searchResult;
            let retValue = '';
            if (is_internal) {
                retValue = extra?.from?.title + '←' + extra?.to?.title;
            } else {
                retValue = extra?.from_country + '،' + extra?.from?.title + '←' + extra?.to_country + '،' + extra?.to?.title;
            }
            return retValue;
        } else {
            return '';
        }
    }, [searchResult]);
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="yabex"/>
                <meta name="robots" content="noindex"/>
            </Head>
            <Box className={classes.bg}>
                <SearchResultHeader {...searchResult} {...flightSearchParams} pageTitle={pageTitle} loading={isLoading || loadingResult2}/>
                <SearhResultContainer searchResult={previusData} loading={isLoading || loadingResult2}/>
                {!isMobileSize &&
                    <DownloadSection/>
                }
                <FavoriteLocationText/>
            </Box>
        </>
    )
}
export default SearchResultDomain;