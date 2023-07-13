import {
    Stack,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Box
} from "@mui/material";
import CurrencyFormat from 'react-currency-format';
import DateIcon from 'public/icons/date1.svg';
import PlaneWhite from 'public/icons/planeWhite.svg';
import useFavoriteCadStyle from './favoriteCard.style';
import {persianPriceFormatter} from "@/@core/utils/utils";

export interface IFavorite {
    image?: string;
    title?: string;
    price?: number;
    date?: string;
}

const FavoriteCard = ({ image, title, price, date }: IFavorite) => {
    const classes = useFavoriteCadStyle();
    return (<Card className={classes.card}>
        <CardMedia
            sx={{
                height: 163,
                backgroundSize: "cover",
                position: "relative"
            }}
            image={image}
        >
            <Box className={classes.flightIcon}>
                <PlaneWhite />
            </Box>
        </CardMedia>
        <CardContent sx={{
            py: 2.5,
            px: 2.5,
            pb: 4
        }}>
            <Stack flexDirection="row" alignItems="flex-end" justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h4" component="div" fontWeight={700}>
                    {title}
                </Typography>
                <Stack flexDirection="row" alignItems="flex-end" gap={1}>
                    <Typography lineHeight={'30px !important'} gutterBottom variant="h6" component="div" fontWeight="700">
                        از
                    </Typography>
                    <Typography lineHeight={'30px !important'} fontSize={{xs:'16.5px',md:20}} gutterBottom variant="h3" component="div" fontWeight="700" >
                        <CurrencyFormat value={persianPriceFormatter(price)} displayType={'text'} thousandSeparator={true} />
                    </Typography>
                    <Typography lineHeight={'30px !important'} gutterBottom variant="h6" component="div" fontWeight="700">
                        تومان
                    </Typography>
                </Stack>
            </Stack>
        </CardContent>
        <CardActions>
            <Stack flexDirection="row" alignItems="center" gap={1.5}>
                <DateIcon />
                <Typography variant="subtitle2" fontWeight={600} className={classes.dateText}>{date}</Typography>
            </Stack>
        </CardActions>
    </Card>)
}
export default FavoriteCard;