import {useState} from "react";
import {
    Box,
    Tab,
    Tabs,
    Typography,
    Container,
    Stack
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import useSearchStyle from './landing.style';
import PlanIcon from 'public/icons/plane.svg';
import HotelIcon from 'public/icons/building-skyscraper.svg';
import TourIcon from 'public/icons/tent.svg';

import FlightTab from './flight.tab';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {

    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (<Box>
                {children}
            </Box>)}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const LandingSearch = (props: any) => {
    const classes = useSearchStyle();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (<Container maxWidth="lg" sx={{position: 'relative', zIndex: 5}} >
        <Box id={"tab-list"} sx={{
            maxWidth: 462,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            overflow: 'hidden',
            marginTop: {xs: 8, md: '-210px'},
        }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                className={classes.tabs}
            >
                <Tab label={
                    <Stack flexDirection="row" gap={1.2} alignItems="center">
                        <PlanIcon/>
                        <Typography variant="h6" fontWeight="700">پرواز</Typography>
                    </Stack>
                } {...a11yProps(0)} />
                <Tab label={
                    <Stack flexDirection="row" gap={1.2} alignItems="center">
                        <HotelIcon/>
                        <Typography variant="h6" fontWeight="700">هتل</Typography>
                        <Box className={classes.badge}>
                            <Typography variant="overline" fontWeight={600}>بزودی</Typography>
                        </Box>
                    </Stack>
                } {...a11yProps(1)} disabled/>
                <Tab label={
                    <Stack flexDirection="row" gap={1.2} alignItems="center">
                        <TourIcon/>
                        <Typography variant="h6" fontWeight="700">تور</Typography>
                        <Box className={classes.badge}>
                            <Typography variant="overline" fontWeight={600}>بزودی</Typography>
                        </Box>
                    </Stack>
                } {...a11yProps(2)} disabled/>
            </Tabs>
        </Box>
        <Box sx={{position: "relative"}}>
            <TabPanel value={value} index={0} dir={'rtl'}>
                <FlightTab pageUse='HomePage'/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={'rtl'}>

            </TabPanel>
            <TabPanel value={value} index={2} dir={'rtl'}>

            </TabPanel>
        </Box>
    </Container>);
}
export default LandingSearch;