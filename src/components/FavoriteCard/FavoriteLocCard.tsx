import {
    Stack,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Box
} from "@mui/material";
import useFavoriteLocCadStyle from './favoriteLocCard.style';

export interface IFavorite {
    image?: string;
    title?: string;
    link?: string;
}

const FavoriteLocationCard = ({ title, image, link }: IFavorite) => {
    const classes = useFavoriteLocCadStyle();
    return (<Card className={classes.card}>
        <CardMedia
            sx={{
                height: 370,
                backgroundSize: "cover",
                '&:before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 65.27%, rgba(0, 0, 0, 0.5) 100%)'
                }
            }}
            image={image}
        >

        </CardMedia>
        <CardActions sx={{
            position: 'absolute',
            bottom: 24,

        }}>
            <Stack flexDirection="column" alignItems="flex-start" gap={2}>
                <Typography variant="h5" fontWeight={700} color="onPrimary.main">{title}</Typography>
                <Typography variant="subtitle2" fontWeight={600} color="onPrimary.main"
                    sx={{
                        opacity: 0.7
                    }}
                >
                    اطلاعات بیشتر
                </Typography>
            </Stack>
        </CardActions>
    </Card>);
}
export default FavoriteLocationCard;