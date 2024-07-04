import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Default from '../../public/images.png';
import { Avatar, Box, Rating, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles'
import { AppointmentResponseModel, ReviewData } from '../../src/types/types';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { modalActivationContext } from '../../src/contexts/ModalActivationContext';
import { useAppDispatch, useAppSelector } from '../../src/app/hooks';
import { ADMIN, DOCTOR, PATIENT, STATUS_OBJ } from '../../src/constants/constants';
import ReviewModal from './ReviewModal';
import { useEffect } from 'react';
import { setDoctor } from '../../src/features/doctor/doctorSlice';
import ReviewUpdateModal from './ReviewUpdateModal';

interface DoctorCardProps {
    doctorId: number | undefined;
    doctorSpeciality: string | undefined;
    doctorName: string | undefined;
    profilePath?: string | undefined;
    ratings?: number;
    reviews?: ReviewData[];
    appointments?:AppointmentResponseModel[];
    averageRating?: number;
    isOpen?: Boolean;
    setOpen?: any
}

interface DoctorInfoProps {
    isGrid?: Boolean;
    isInfo?: Boolean;
    isAdmin?: Boolean;
}


const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 'auto',
    boxShadow: '5px 10px 22px 0px'
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

export default function DoctorCard({ doctorId, doctorSpeciality, doctorName, profilePath, averageRating, isGrid, isInfo, isAdmin, reviews,appointments, ratings, isOpen, setOpen }: DoctorCardProps & DoctorInfoProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setModalActive } = useContext(modalActivationContext);
    const { roleType, isAuthenticated, userId, token, name } = useAppSelector((state) => state.authReducer);
    const [isReviewModalOpen, setReviewModalOpen] = useState<Boolean>(false);
    const [isReviewUpdateModalOpen, setReviewUpdateModalOpen] = useState<Boolean>(false);
    const [reviewText, setReviewText] = useState<string>('');
    const [reviewRating, setReviewRating] = useState<number>(0);
    const redirectToProfile = (doctorId: number | undefined) => {
        navigate(`/doctor/${doctorId}`, { replace: true });
    }

    const toggleModal = () => {
        setModalActive((isModalActive: any) => !isModalActive);
    }

    const onWriteReviewOpen = () => {
        setReviewModalOpen(true);
    }

    const onUpdateReviewOpen = ()=>{
        setReviewUpdateModalOpen(true);
    }

    const handleClose = () => {
        if(isReviewModalOpen){
            setReviewModalOpen(false);
        }else if(isReviewUpdateModalOpen){
            setReviewUpdateModalOpen(false);
        }
        setReviewRating(0);
        setReviewText('');
    }

    useEffect(() => {
        dispatch(setDoctor({
            doctorName: doctorName,
            doctorEmail: doctorName,
            doctorId: doctorId,
            doctorProfile: profilePath,
            doctorSpeciality: doctorSpeciality,
            reviews: reviews,
            ratings: ratings,
            appointments:appointments,
            averageRating: averageRating,
        }));
    }, []);

    const patientInReview = (reviews: ReviewData[]): Boolean => {
        return reviews.find((review)=>review.patientName === name) !== undefined;
    }

    const patientInAppointment = (appointments: AppointmentResponseModel[]):Boolean=>{
        return appointments.find((appointment)=>appointment.patientName === name && appointment.status === STATUS_OBJ.completed) !== undefined;
    }

    const canSubmitReview = (): Boolean => {
        return isAuthenticated && (roleType !== ADMIN || roleType !== DOCTOR) && patientInAppointment(appointments as AppointmentResponseModel[]);
    }

    const ReviewButton = ()=>{
        if (canSubmitReview()) {
            if(patientInReview(reviews as ReviewData[])){
                return <Button onClick={onUpdateReviewOpen} color='primary' variant='outlined' className="w-50 mx-auto">Edit Review</Button>
            }else{
                return <Button onClick={onWriteReviewOpen} color='primary' variant='contained' className="w-50 mx-auto">Write Review</Button>
            }
        }else{
            return <></>
        }
    }



    const submitReview = async () => {
        if(reviewText === '' || reviewRating === 0.0){
            alert('Please submit a valid review');
            return;
        }
    }

    const updateReview = async ()=>{
        
    }


    return isGrid ? (

        <Card sx={{ maxWidth: 215 }}>
            <CardActionArea onClick={() => redirectToProfile(doctorId)}>
                <CardMedia
                    component="img"
                    image={profilePath ? `/api/profile/uploads/${profilePath}` : Default}
                    alt={`${doctorName}`}
                    sx={{ aspectRatio: '1/1' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <small>{doctorName}</small>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <small>{doctorSpeciality}</small>
                    </Typography>
                    <StyledRating>
                        <Rating name="read-only" value={averageRating} readOnly />
                    </StyledRating>
                </CardContent>
            </CardActionArea>

        </Card>
    ) : isInfo ? (
        <Paper sx={{ m: 4, p: 5.5 }}>
            <ReviewModal
                isOpen={isReviewModalOpen}
                handleClose={handleClose}
                doctorName={doctorName}
                submitReview={submitReview}
                reviewText={reviewText}
                setReviewText={setReviewText}
                reviewRating={reviewRating}
                setReviewRating={setReviewRating}
            />

            <ReviewUpdateModal
                isOpen={isReviewUpdateModalOpen}
                handleClose={handleClose}
                doctorName={doctorName}
                updateReview={updateReview}
                reviewText={reviewText}
                setReviewText={setReviewText}
                reviewRating={reviewRating}
                setReviewRating={setReviewRating}
                />
                

            <Stack
                mb={5}
                gap={2}
                alignItems="center"
                justifyContent='center'
                direction="row"
                position='relative'
            >
                <StyledTitle variant="h5" sx={{ alignSelf: 'center' }}>
                    About {doctorName}
                </StyledTitle>
                {(isAuthenticated && roleType === PATIENT) ? <>
                    <Button onClick={toggleModal} sx={{ position: 'absolute', right: 0 }} variant="contained">
                        Book an Appointment
                    </Button>
                </> : <>
                    <Button onClick={() => navigate('/sign-in', { replace: true })} sx={{ position: 'absolute', right: 0 }} variant="contained">
                        Login to Book an Appointment
                    </Button>
                </>}

            </Stack>
            <StyledAvatar
                src={profilePath ? `/api/profile/uploads/${profilePath}` : ''}
                alt={doctorName}
            />
            <StyledRating>
                <Rating name="read-only" value={averageRating} readOnly />
            </StyledRating>
            <StyledSpecialty variant="h4" color="textSecondary">
                {doctorSpeciality}
            </StyledSpecialty>
            <Typography mb={4} variant="body2" color="textSecondary">
                Dr. {doctorName} is a board-certified {doctorSpeciality} with over 15 years of experience in the field of Dental. Known for his compassionate approach and commitment to patient care, Dr. {doctorName} has helped thousands of patients with a wide range of skin conditions.

                As a highly regarded specialist, Dr. {doctorName} stays up-to-date with the latest advancements in dermatology, offering innovative treatments and procedures. He is recognized for his expertise in treating acne, eczema, psoriasis, and other skin disorders, and has a particular interest in cosmetic dermatology, including laser treatments and skin rejuvenation.

                Dr. {doctorName} received his medical degree from a prestigious institution and completed his residency at a top-ranking hospital. He is an active member of the American Academy of Dermatology and frequently presents at medical conferences.

                In his spare time, Dr. {doctorName} enjoys volunteering at community health clinics and promoting skin health awareness through public seminars.
            </Typography>
            <Box gap={3} flexDirection={'column'} display={'flex'} textAlign='center'>
                <Link className=" btn btn-lg btn-primary w-50 mx-auto" to={isAdmin ? '/Dashboard' : '/Doctors'}>Back</Link>
                <ReviewButton/>
            </Box>

        </Paper>
    ) : ''

}