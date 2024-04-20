import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Default from '../../public/images.jpeg';
import { Avatar, Box, Rating, Paper } from '@mui/material';
import { makeStyles, styled } from '@mui/material/styles'
import { RatingData, ReviewData } from '../../src/types/types';


interface DoctorCardProps {
    doctorId: number | undefined;
    doctorSpeciality: string | undefined;
    doctorName: string | undefined;
    profilePath?: string | undefined;
    ratings?: RatingData[];
    reviews?: ReviewData[];
    averageRating?: number;
}

interface DoctorInfoProps {
    isGrid?: Boolean;
    isInfo?: Boolean;
}


const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
    boxShadow:'5px 10px 22px 0px'
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(2),
}));

const StyledSpecialty = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));

const StyledRating = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
}));

export default function DoctorCard({ doctorId, doctorSpeciality, doctorName, profilePath, averageRating, isGrid, isInfo }: DoctorCardProps & DoctorInfoProps) {
    const navigate = useNavigate();

    const redirectToProfile = (doctorId: number | undefined) => {
        navigate(`/doctor/${doctorId}`, { replace: true });
    }




    return isGrid ? (

        <Card sx={{ maxWidth: 235 }}>
            <CardActionArea onClick={() => redirectToProfile(doctorId)}>
                <CardMedia
                    component="img"
                    height="130"
                    sx={{ width: '100%' }}
                    image={profilePath ? `/api/profile/uploads/${profilePath}` : Default}
                    alt={`${doctorName}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <small>{doctorName}</small>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <small>{doctorSpeciality}</small>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant='contained' size="medium" color="primary">
                    Book an Appointment
                </Button>
            </CardActions>
        </Card>
    ) : isInfo ? (
        <Paper sx={{ m:4, p:5.5 }}>
            <StyledTitle variant="h5">
                About {doctorName}
            </StyledTitle>
            <StyledAvatar
                src={profilePath ? `/api/profile/uploads/${profilePath}` : ''}
                alt={doctorName} />
            <StyledRating>
                <Rating name="read-only" value={averageRating} readOnly />
            </StyledRating>
            <StyledSpecialty variant="h4" color="textSecondary">
                {doctorSpeciality}
            </StyledSpecialty>
            <Typography variant="body" color="textSecondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </Typography>
        </Paper>
    ) : ''

}