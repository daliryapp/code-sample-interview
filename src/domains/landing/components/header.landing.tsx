import Image from "next/image";
import {
    Box,
    Typography,
    Container
} from "@mui/material";
import Headercurve from 'src/assets/svg/headercurve.svg'
import useMediaQuery from "@mui/material/useMediaQuery";
import { mobileSizeTrigger } from 'src/@core/constance/breakpoints';
import useSearchStyle from './landing.style';

const LandingHeader = (props: any) => {
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    const classes = useSearchStyle();
    return (<>
        <Box sx={{
            width: '100%',
            height: { xs: 'auto', md: 630 },
            '& img': {
                position: "relative !important",
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            }
        }}>
            {!isMobileSize &&
                <Image
                    src="/images/globe.jpg"
                    alt="Yabex header"
                    fill
                    blurDataURL="/images/globe-resized.jpg"
                    placeholder="blur"
                    loading="eager"
                    priority={true}
                />
            }
            <Container maxWidth="lg" sx={{ mt: { xs: 36, md: "-277px" }, position: 'relative' }}>
                <Typography variant="h1" component="h1" fontWeight={700} color={isMobileSize ? "neutral.main" : "onPrimary.main"}>موتور جستجوی  {isMobileSize ? <br /> : ""} ارزان ترین بلیط هواپیما</Typography>
                <Typography variant="h4" component="h2" fontWeight={600} color={isMobileSize ? "neutral.main" : "onPrimary.main"} sx={{
                    opacity: 0.7,
                    mt: { xs: 4, md: 4 }
                }}>مقایسه قیمت در بیش از ۳۰ آژانس هواپیمایی کشور</Typography>
            </Container>
        </Box>
        {!isMobileSize &&
            <Box className={classes.curve} >

                <Headercurve />
            </Box>
        }
    </>);
}
export default LandingHeader;