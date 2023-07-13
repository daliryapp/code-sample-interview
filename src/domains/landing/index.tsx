import LandingHeader from './components/header.landing';
import LandingSearch from './components/search.landing';
import BrandSection from './components/brandSection';
import AdvertiseSection from "./components/advertiseSection";
import FavoritePathSection from './components/favoritePathSection';
import MapSection from './components/mapSection';
import FavoriteLocation from './components/favoriteLocation';
import BeforeTravel from './components/beforeTravel';
import FAQ from './components/faq';
import DownloadSection from './components/downloadSection';
import FavoriteLocationText from './components/favoriteLocText';
import useMediaQuery from "@mui/material/useMediaQuery";
import { mobileSizeTrigger } from 'src/@core/constance/breakpoints';

const LandingDomain = ({ popularFlights, popularFlightsFrom }: any) => {
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    return (<>
        <LandingHeader />
        <LandingSearch />
        {!isMobileSize &&
            <BrandSection />
        }
        {!isMobileSize &&
            <AdvertiseSection />
        }
        <FavoritePathSection popularFlightsFrom={popularFlightsFrom} />
        <MapSection />
        <FavoriteLocation popularFlights={popularFlights} />
        {!isMobileSize &&
            <BeforeTravel />
        }
        {!isMobileSize &&
            <FAQ />
        }
        {!isMobileSize &&
            <DownloadSection />
        }
        <FavoriteLocationText />
    </>);
}
export default LandingDomain;