import {useEffect, useMemo} from "react";
import {
    Container,
    Grid,
    Stack,
    Typography,
    Box
} from "@mui/material";
import useSearchResultStyle from '../searchResult.style';
import TicketCard from './ticketCard';
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import SelectDays from './selectDays';
import SortSection from './sortSection';
import Filters from 'src/components/Filters';
import SideBarFilter from 'src/components/SidebarFilter';
import {useSelector} from 'react-redux'
import TicketDetail from 'src/components/TicketDetail';
import {useRouter} from 'next/router';
import {useRouter as useNavigate} from 'next/navigation';
import Ads from './ads';
import StickyBox from "react-sticky-box";
import TimeoutModal from './timeoutModal';
import MoodSadIcon from 'public/icons/mood-sad.svg'
import TicketCardLoading from "@/domains/searchResult/components/ticketCardLoading";
import {setSearchNoResult} from "@/@core/redux/reducers/app/appSlice";
import {useDispatch} from "react-redux";
import {AppDispatch, RootState} from "@/@core/redux/store";
import {SmoothScroll} from '@/@core/utils/utils';
import {useGetFetchQuery} from "@/_hooks/search/search.hook";
import Head from "next/head";


const SearchResultContainer = ({searchResult, loading}: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const slug = (router.query.slug as string[]) || [];
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const classes = useSearchResultStyle();
    const drawer = useSelector((state: any) => state.app.drawer);
    const tripType: string | undefined = slug?.[3]?.toString();
    const searchNoResult = useSelector((state: RootState) => state.app.searchNoResult);
    const dataSearch1 = useGetFetchQuery("search");
    const dataMemoSearch1: any = useMemo(() => dataSearch1[dataSearch1.length - 1][1], [dataSearch1]);
    const openDetailModal = (data: any) => {
        drawer.show(<TicketDetail
            flights={data}
            nextFlight={(nextId: string) => {
                scroll(nextId);
            }}
            closeModal={() => {
                drawer.hide()
            }}/>);
    }

    const scroll = (id: string) => {
        if (id !== '') {
            const section = document.getElementById(id);
            SmoothScroll(section, 1000, 0 - 80)
        }
    };
    useEffect(() => {
        if (!loading && searchResult && !searchResult.next && ((tripType === "1" && searchResult?.flights.length === 0) || (tripType === "2" && dataMemoSearch1 && dataMemoSearch1?.is_internal && searchResult?.went.length === 0) || (dataMemoSearch1 && !dataMemoSearch1?.is_internal && searchResult?.flights.length === 0))) {
            dispatch(setSearchNoResult(true));
        } else {
            dispatch(setSearchNoResult(false));
        }
    }, [loading, searchResult, dispatch, tripType]);
    return (<>

        <Container maxWidth="lg">
            <Grid container spacing={{xs: 0, md: 10}} py={{xs: 4, md: 18.25}}>
                {!isMobileSize &&
                    <Grid item md={3}>
                        <StickyBox offsetTop={120} offsetBottom={0}>
                            <Filters/>
                        </StickyBox>
                    </Grid>
                }
                <Grid item xs={12} md={7}>
                    {tripType === "1" && !searchNoResult &&
                        <SelectDays/>
                    }
                    {!searchNoResult &&
                        <SortSection loading={loading}/>
                    }
                    {loading
                        ?
                        Array(5)
                            .fill({})
                            .map((_, i) => (
                                <TicketCardLoading key={`loading${i}`}/>
                            ))
                        :
                        <>
                            {searchResult?.params?.is_internal ? <>
                                {tripType === "1" && searchResult?.flights.map((item: any, index: number) => <TicketCard
                                    data={item} key={`ticket-${index}`} onDetailClick={openDetailModal}/>
                                )}
                                {tripType === "2" && searchResult?.went.map((item: any, index: number) => <TicketCard
                                    data={item} key={`ticket-${index}`} onDetailClick={openDetailModal}/>
                                )}
                            </> : searchResult?.flights.map((item: any, index: number) => <TicketCard data={item}
                                                                                                      key={`ticket-${index}`}
                                                                                                      onDetailClick={openDetailModal}/>)}
                        </>
                    }

                    {searchNoResult ?
                        <Stack flexDirection="row" justifyContent="center">
                            <Box sx={{maxWidth: 416}}>
                                <Stack flexDirection="row" justifyContent="center" pb={6.5}>
                                    <MoodSadIcon/>
                                </Stack>
                                <Typography variant="h4" fontWeight={600} textAlign="center">متاسفانه نتیجه‌ای برای
                                    درخواست
                                    شما وجود ندارد</Typography>
                                <Typography variant="h6" fontWeight={600} pt={4} textAlign="center"
                                            className={classes.agencyName}>
                                    باتوجه به شرایط درخواست شما برای مقصد کیش نتیجه‌ای وجود ندارد لطفا با تغییر در شرایط
                                    جستجو مجدد امتحان کنید.
                                </Typography>
                            </Box>
                        </Stack>
                        :
                        <></>
                    }
                </Grid>
                {!isMobileSize &&
                    <Grid item md={2}>
                        <Ads positions={["plp_sidebar", "plp_result"]}/>
                    </Grid>
                }
            </Grid>
        </Container>
        <SideBarFilter/>
    </>)
}
export default SearchResultContainer;