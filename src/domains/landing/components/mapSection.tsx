import {
    Box,
    Button,
    Tabs,
    Typography,
    Container,
    Stack
} from "@mui/material";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import {mobileSizeTrigger} from 'src/@core/constance/breakpoints';
import {lineHeight} from "@mui/system";

const MapSection = () => {
    const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
    return (<Container maxWidth="lg">
        <Stack flexDirection="row" justifyContent="center" mt={15}>
            <Box sx={{
                maxWidth: 996,
                height: 336,
                width: '100%',
                background: 'linear-gradient(to right, rgba(4,76,118,1) 0%, rgba(7,124,192,1) 100%)',
                borderRadius: 6,
                px: {xs: 6, md: 9.25},
                position: "relative",
                overflow: "hidden",
                zIndex: 1,
                '&::before': {
                    content: '""',
                    backgroundImage: `url(/images/Stars.png)`,
                    position: 'absolute',
                    backgroundSize: "contain",
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                },
                '&::after': {
                    content: '""',
                    backgroundImage: `url(/images/Vector.png)`,
                    position: 'absolute',
                    backgroundSize: "contain",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }
            }}>
                <Stack flexDirection={{xs: "column-reverse", md: "row"}} justifyContent="space-between"
                       alignItems="flex-end" sx={{
                    position: 'relative',
                    zIndex: 4,
                    height: '100%',
                    width: '100%'
                }}>
                    <Box sx={{
                        width: {xs: '100%', md: 330},
                        height: {xs: 155, md: 242},
                        '& img': {
                            position: 'relative !important',
                            width: '100% !important',
                            height: '100% !important',
                            objectFit: {xs: "contain", md: "contain"},
                            objectPosition: "center top"
                        }
                    }}>
                        <Image src="/images/earth2.png" fill alt="erth"/>
                    </Box>
                    <Stack flexDirection="column" gap={4} justifyContent="center" alignItems="flex-start" sx={{
                        maxWidth: {xs: '100%', md: 444},
                        height: '100%'
                    }}>
                        <Typography variant="h1" fontWeight={700} color="onPrimary.main"
                                    textAlign={{xs: "center", md: "start"}} width="100%">جستجو سفر بر روی
                            نقشه</Typography>
                        <Typography variant="h6" fontWeight={600} textAlign={{xs: "center", md: "start"}} sx={{
                            color: "onPrimary.main",
                            opacity: 0.5,
                            mb: 2,
                            fontSize: {xs: 12, md: 14},
                            lineHeight: {xs: '29px', md: '32px'}
                        }}>می‌توانید با مشاهده نقشه و بررسی شرایط شهر‌ها و کشورهای پذیرنده مسافر به راحتی برای سفر خود
                            برنامه ریزی دقیق و حساب شده‌ای داشته باشید</Typography>
                        {!isMobileSize &&
                            <Button fullWidth={false} variant="contained" color="primary" sx={{
                                width: 179
                            }}>
                                <Typography variant="button" fontWeight={700} color="onPrimary.main">جستجوی از طریق
                                    نقشه</Typography>
                            </Button>

                        }
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>);
}
export default MapSection;