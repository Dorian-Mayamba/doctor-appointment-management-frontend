import { useAppSelector } from "../../src/app/hooks";
import { AppointmentCompositeProps, AppointmentResponseModel } from "../../src/types/types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  IconButton
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { PATIENT, DOCTOR, STATUS_OBJ } from '../constants/constants';
interface AppointmentListProps {
  appointments: AppointmentResponseModel[] | AppointmentCompositeProps[] | undefined;
  isTable?: boolean;
  status?: string;
}
import { Edit, Cancel } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: theme.spacing(1.22),
}));

const AppointmentList = ({ appointments, isTable, status }: AppointmentListProps) => {

  const { roleType } = useAppSelector((state) => state.authReducer);

  const DoctorAppointments = () => (
    <Box sx={{ padding: 1, margin: 1 }}>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <Table>
        <TableHead>
          <TableRow style={{ background: 'rgba(150,150,150,.25)' }}>
            <StyledTableCell>No #</StyledTableCell>
            <StyledTableCell>Appointee</StyledTableCell>
            <StyledTableCell>Appointment Date</StyledTableCell>
            <StyledTableCell>Appointee Name</StyledTableCell>
            <StyledTableCell>Appointee Email</StyledTableCell>
            <StyledTableCell>Services</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Update Appointment</StyledTableCell>
            <StyledTableCell>Cancel Appointment</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments?.map((appointment, index) => (
            <TableRow key={index}>
              <StyledTableCell>{(appointment as AppointmentResponseModel).id}</StyledTableCell>
              <StyledTableCell>
                <Avatar
                  src={`/api/profile/uploads/${(appointment as AppointmentResponseModel).patientPicture}`}
                  alt={(appointment as AppointmentResponseModel).patientName}
                />
                {(appointment as AppointmentResponseModel).patientName}
              </StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).date}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).patientName}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).patientEmail}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).title}</StyledTableCell>
              <StyledTableCell
                sx={{
                  color:
                    (appointment as AppointmentResponseModel).status === STATUS_OBJ.accepted
                      ? "blue"
                      : (appointment as AppointmentResponseModel).status === STATUS_OBJ.cancelled ? "red"
                        : (appointment as AppointmentResponseModel).status === STATUS_OBJ.pending ? "orange"
                          : "green",
                }}
              >
                {(appointment as AppointmentResponseModel).status}
              </StyledTableCell>
              <StyledTableCell className="text-center">
                <IconButton aria-label="Edit">
                  <Edit color="primary" fontSize="large" />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell className="text-center">
                <IconButton aria-label="Cancel">
                  <Cancel color="error" fontSize="large" />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  const PatientAppointments = () => (
    <Box sx={{ padding: 1, margin: 1 }}>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>No #</StyledTableCell>
            <StyledTableCell>Appointee</StyledTableCell>
            <StyledTableCell>Appointment Date</StyledTableCell>
            <StyledTableCell>Appointee Name</StyledTableCell>
            <StyledTableCell>Appointee Email</StyledTableCell>
            <StyledTableCell>Services</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Cancel Appointment</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments?.map((appointment, index) => (
            <TableRow key={index}>
              <StyledTableCell>{(appointment as AppointmentResponseModel).id}</StyledTableCell>
              <StyledTableCell>
                <Avatar
                  src={`/api/profile/uploads/${(appointment as AppointmentResponseModel).doctorPicture}`}
                  alt={(appointment as AppointmentResponseModel).doctorName}
                />
                {(appointment as AppointmentResponseModel).doctorName}
              </StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).date}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).doctorName}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).doctorEmail}</StyledTableCell>
              <StyledTableCell>{(appointment as AppointmentResponseModel).title}</StyledTableCell>
              <StyledTableCell
                sx={{
                  color:
                    (appointment as AppointmentResponseModel).status === STATUS_OBJ.accepted
                      ? "blue"
                      : (appointment as AppointmentResponseModel).status === STATUS_OBJ.cancelled ? "red"
                        : (appointment as AppointmentResponseModel).status === STATUS_OBJ.pending ? "orange"
                          : "green",
                }}
              >
                {(appointment as AppointmentResponseModel).status}
              </StyledTableCell>
              <StyledTableCell>

              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  const isDoctor = () => roleType === DOCTOR;
  const isPatient = () => roleType === PATIENT;

  return (
    <>
      {isTable && isDoctor() ?
        <DoctorAppointments />
        : isTable && isPatient() ?
          <PatientAppointments />
          :
          <Box sx={{ padding: 3, margin: 2 }}>
            <Typography variant="h4"><small>Appointments</small></Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


              {appointments?.filter((appointment) => (appointment as AppointmentCompositeProps).appointmentComposite.status === status).map((appointment, index) => {
                console.log(appointment);
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            sx={{ height: 210 }}
                            image={`/api/profile/uploads/${(appointment as AppointmentCompositeProps).appointmentComposite.doctorProfile}`}
                            title={(appointment as AppointmentCompositeProps).appointmentComposite.service}
                          />
                          <CardContent>
                            <StyledTypography variant="h2">
                              <small>{(appointment as AppointmentCompositeProps).appointmentComposite.doctorName}</small>
                            </StyledTypography>
                            <StyledTypography variant="h3">
                              <small>{(appointment as AppointmentCompositeProps).appointmentComposite.status}</small>
                            </StyledTypography>
                            <StyledTypography variant="h3">
                              <small>{(appointment as AppointmentCompositeProps).appointmentComposite.date} | {(appointment as AppointmentCompositeProps).appointmentComposite.time}</small>
                            </StyledTypography>
                            <StyledTypography variant="h3">
                              <small>{(appointment as AppointmentCompositeProps).appointmentComposite.service}</small>
                            </StyledTypography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Item>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
      }
    </>
  );
};

export default AppointmentList;
