import { Modal, Box, Typography, Grid, Button, Rating, Avatar } from '@mui/material';
import { DoctorData } from '../../src/types/types';

interface BookAppointmentModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handleBookAppointment: () => void;
    doctor: DoctorData;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookAppointmentModal = ({ isOpen, handleClose, handleBookAppointment, doctor }: BookAppointmentModalProps) => {
    const { doctorName, doctorProfile, doctorSpeciality, averageRating } = doctor;
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="Book appointment"
            aria-describedby="review-update-modal-description"
        >
            <Box sx={{ ...style }}>
                <Grid container spacing={2}>
                    <Grid item sm={2} md={2} lg={2}>
                        <Box flexDirection={'column'} sx={{ display:'flex' }}>
                            <Avatar src={doctorProfile} sx={{ width: 100, height: 100 }} />
                            <Rating value={averageRating}/>
                        </Box>
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold'}}>
                            {doctorName}
                        </Typography>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold'}}>
                            {doctorSpeciality}  
                        </Typography>
                    </Grid>
                </Grid>
                <Button onClick={handleClose} variant='outlined' color='primary'>Cancel</Button>
                <Button onClick={handleBookAppointment} variant='contained' color='primary'>Book Appointment</Button>
            </Box>
        </Modal>
    );
}

export default BookAppointmentModal;