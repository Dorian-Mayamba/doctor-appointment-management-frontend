import { Grid, Box, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { STATUS_OBJ } from '../../src/constants/constants';
import { GlobalAppointmentResponseModel, PatientData, DoctorData, ReviewData, AppointmentResponseModel, AppointmentCompositeProps } from '../../src/types/types';

interface AppointmentStatsProps {
    appointments: AppointmentCompositeProps[];
    patients: PatientData[];
    doctors: DoctorData[];
    // reviews: ReviewData[];
}

function AppointmentStats({ appointments, patients, doctors }: AppointmentStatsProps) {
    console.log(appointments);
    console.log(patients);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A1D23' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));

    const StyledTypography = styled(Typography)(({ theme }) => ({
        fontSize: theme.spacing(2.3),
      }));

    

    const appointmentDataSet = doctors.map((doctor) => ({
        cancelled: doctor.appointments.filter((appointment) => appointment.status === STATUS_OBJ.cancelled).length,
        completed: doctor.appointments.filter((appointment) => appointment.status === STATUS_OBJ.completed).length,
        doctor: doctor.doctorName
    }));
    


    return (
        <Box sx={{ p:3 }} flexGrow={1}>
            <Grid sx={{ mb:4 }} container spacing={2} gap={4} rowGap={2}>
                <Grid xs={2} md={2.5}>
                    <Item>
                        <StyledTypography variant='h2'>Total Appointments</StyledTypography>
                        <StyledTypography variant='h4'>{appointments.length} </StyledTypography> {/* Number of total appointments */}
                    </Item>
                </Grid>
                <Grid xs={2} md={2.5}>
                    <Item>
                        <StyledTypography variant='h2'>Total Doctors</StyledTypography>
                        <StyledTypography variant='h4'>{doctors.length} </StyledTypography> {/* Number of total appointments */}
                    </Item>
                </Grid>
                <Grid xs={2} md={2.5}>
                    <Item>
                        <StyledTypography variant='h2'>Total Patients</StyledTypography>
                        <StyledTypography variant='h4'>{patients.length} </StyledTypography> {/* Number of total appointments */}
                    </Item>
                </Grid>
                <Grid xs={2} md={2.5}>
                    <Item>
                        <StyledTypography variant='h2'>Total Reviews</StyledTypography>
                        <StyledTypography variant='h4'>Numbers </StyledTypography> {/* Number of total appointments */}
                    </Item>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} spacing={2}>
                <Grid xs={2} md={5}>
                    <Item>
                        <BarChart
                            width={400}
                            height={300}
                            series={[
                                {data:appointments.map((appointment)=>appointment.appointmentComposite.patients), label:'Appointments', id:'AppointmentId'},
                                // Review data goes here
                            ]}
                            xAxis={[{data:doctors.map((doctor)=>doctor.doctorName), scaleType:'band'}]}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AppointmentStats;