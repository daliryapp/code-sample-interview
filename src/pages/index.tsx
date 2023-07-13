import Head from 'next/head';
import LandingDomain from 'src/domains/landing';
import {BASE_URL} from 'src/@core/configs/config';
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from "@/@core/constance/breakpoints";

export default function Home({popularFlights, popularFlightsFrom}: any) {
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    return (
        <>
            <Head>
                <title>Yabex</title>
                <meta name="description" content="yabex"/>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
            </Head>
            <main>
                <LandingDomain popularFlights={popularFlights} popularFlightsFrom={popularFlightsFrom}/>
            </main>
            {!isMobileSize &&
                <div className={`overlay_main_new`} ></div>
            }
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${BASE_URL}flights/cheapest`);
    const res2 = await fetch(`${BASE_URL}popular-flights?per_page=30`);
    const data = await res.json();
    const data2 = await res2.json();
    let nonPicFlights: any = [];
    let picFlights: any = [];
    data2?.items?.map((item: any) => {
        if (!item.image) {
            nonPicFlights.push(item);
        } else {
            picFlights.push(item);
        }
    });
    return {
        props: {
            popularFlightsFrom: data,
            popularFlights: {
                nonPicFlights: nonPicFlights,
                picFlights: picFlights
            },
        }
    }
}