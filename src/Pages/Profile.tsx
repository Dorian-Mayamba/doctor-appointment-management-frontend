import { RootState } from "../../src/app/store";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { setProfile } from "../../src/features/profiles/profileSlice";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import axios from "axios";
import $ from 'jquery';
import { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DOCTOR } from "../../src/constants/constants";
import { styled } from '@mui/material/styles';
import AppointmentList from "../../src/components/AppointmentList";
import { AppointmentResponseModel } from "../../src/types/types";
import { PageContext } from "../../src/contexts/PageTypeContext";
import { messageContext } from "../../src/contexts/FlashMessageContex";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton,Collapse,Alert } from '@mui/material';
import { authenticate, unAuthenticate } from "../../src/features/authenticater/authSlice";
import ConfirmDialog from "../../src/components/ConfirmationDialog";
import { unSetProfile } from '../../src/features/profiles/profileSlice.js';
import { useNavigate } from "react-router";


interface IProfileProps {
    username: string;
    email: string;
    number: string;
    description?: string | null;
    profile?: any;
    profilePath?: string | null;
}

type page = string | "My Personal information" | "My appointments" | "Completed appointments" | "Pending Appointments" | "Appointment Calendar";

const profileSchema: yup.ObjectSchema<IProfileProps> = yup
    .object({
        username: yup.string().required("username is required"),
        email: yup.string().required("email is required").email("invalid email format"),
        number: yup.string().required("please enter your number"),
        profile: yup.mixed().nullable().test("profile", "Only image file are supported", (value) => {
            return !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type));
        }),
        description: yup.string().nullable(),
        profilePath: yup.string().nullable()
    })


const StyledItemText = (styled)(ListItemText)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '8px'
}));

export default function Profile() {
    const { roleType, userId, token, appointments } = useAppSelector((state: RootState) => state.authReducer);
    console.log(userId);
    const [success, setSuccess] = useState<any>(null);
    const [isFile, setFile] = useState<Boolean>(false);
    const { page, setPage } = useContext(PageContext);
    const [appoitmentData, setAppointmentData] = useState<AppointmentResponseModel[] | undefined>(appointments);
    const [open,setOpen] = useState<Boolean>(true);
    const [dialogOpen,setDialogOpen] = useState<boolean>(false);
    //ToDo implement a token verification request
    const dispatch = useAppDispatch();
    const { username, number, email, profile } = useAppSelector((state) => state.profileReducer);
    const navigate = useNavigate();
    const state = useAppSelector((state)=>state.authReducer);
    const { message, setMessage } = useContext(messageContext);
    const {
        register,
        setValue,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<IProfileProps>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            username: username,
            email: email,
            number: number,
        }
    });

    const {
        getInputProps,
        getRootProps,
        isDragAccept,
        isDragActive,
        isDragReject
    } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg', '.png'],
        },
        onDrop: (acceptedFiles, rejectFiles, e) => {
            setFile(acceptedFiles && acceptedFiles.length > 0);
            setValue("profile", acceptedFiles[0]);
        },
        maxFiles: 1
    })
    const onConfirm = ()=>{
        axios.delete(`/api/profile/delete/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            setMessage(response.data.message);
            dispatch(unAuthenticate({
                token: '',
                isAuthenticated: false,
                name: '',
                userId: 0,
                email:'',
                roleType: '',
                userProfile:''
            }))
            dispatch(unSetProfile({
                username:'',
                email: '',
                number:'',
                profile:'',
                profilePath:''
            }))
            onClose();
            navigate('/', {replace:true});
        })
    }

    useEffect(() => {
        setPage("My Personal information");
        if(roleType === DOCTOR){
            axios.get(`/api/appointments/doctors/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((data)=>{
                dispatch(authenticate({...state, appointments:[...data.data]}))
            })
        }else{
            axios.get(`/api/appointments/patients/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((data)=>{
                console.log(data);
                dispatch(authenticate({...state, appointments:[...data.data]}))
            })
            .catch((err)=>console.log(err))
        }

        var errorTimer = setTimeout(() => {
            $('.text-danger').fadeOut('slow', () => {
                console.log("clearing the errors");
                clearErrors("email");
                clearErrors("number");
                clearErrors("profile");
                clearErrors("username");
            })
        }, 4000);

        var successTimer = setTimeout(() => {
            $('.text-success').fadeOut('slow', () => {
                if (success) {
                    setSuccess(null);
                }
            })
        }, 4000)
        return () => {
            window.clearTimeout(errorTimer);
            window.clearTimeout(successTimer);
        }

    }, [success, errors.email, errors.number, errors.profile, errors.username])

    const updateProfile = (data: any) => {
        dispatch(setProfile({
            username: data.username,
            email: data.email,
            number: data.number,
            profile: data.profile
        }))
    }

    const onClose = ()=>{
        setDialogOpen(false);
    }

    const openDialog = ()=>{
        setDialogOpen(true);
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const url = $('#profile-form').attr('action');
            if (url) {
                let fd = new FormData();

                if (isFile){ 
                    fd.append("profile", values.profile)
                };

                let profileData = {
                    username: values.username,
                    email: values.email,
                    number: values.number
                }

                fd.append('data', new Blob([JSON.stringify(profileData)], {
                    type: 'application/json'
                }));

                let data = await axios.put(url, fd, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
                setSuccess(data.data);
                console.log(data.data);
                updateProfile(data.data);
                reset({
                    email: data.data.email,
                    username: data.data.username,
                    number: data.data.number
                });
                console.log(data.data);

            }
        } catch (err) {
            console.log("error: " + err);
        }
    })

    return (
        <Box component="section">
            <ConfirmDialog
            open={dialogOpen}
                onClose={onClose}
                onConfirm={onConfirm}
                message={"Are you sure you want to delete your account?"}
                />
            <Grid container columnSpacing={{ xs: 1, sm: 1, md: 0 }}>
                <Grid sx={{ bgcolor: '#6479E9' }} item md={2}>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                <StyledItemText primary="My Personal information" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                <StyledItemText primary="My appointments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                <StyledItemText primary="Completed apointments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                <StyledItemText primary="Pending Appointments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                <StyledItemText primary="Appointment Calendar" />
                            </ListItemButton>
                        </ListItem>
                        {roleType == DOCTOR && <>
                            <ListItem>
                                <ListItemButton onClick={(e) => setPage(e.currentTarget.textContent as string)}>
                                    <StyledItemText primary="My Reviews" />
                                </ListItemButton>
                            </ListItem>
                        </>}
                    </List>
                </Grid>
                <Grid sx={{ bgcolor: '#D5FEFE' }} item xs={9} md={7} lg={10}>
                    <Paper sx={{ m: 1, p: [1,2] }}>
                        <Stack style={{ position: 'relative' }} justifyContent="center" direction="row">
                            <h3 className="text-center"><small>{username}'s Profile</small></h3>
                            <form style={{ position: 'absolute', right: '0' }} action="#">
                                <Button onClick={openDialog} variant="contained" color="error" type="submit">Delete my Account</Button>
                            </form>
                        </Stack>
                        {message &&
                            <Collapse in={open as boolean}>
                                <Alert action={
                                    <IconButton
                                        aria-label='close'
                                        color='inherit'
                                        size='small'
                                        onClick={() => {
                                            setOpen(false);
                                            setMessage(null);
                                        }}
                                    >
                                        <CloseIcon fontSize='inherit' />
                                    </IconButton>
                                } sx={{ mb: 2 }} variant='filled' icon={<CheckIcon fontSize="inherit"
                                />} severity="success">
                                    {message}
                                </Alert>

                            </Collapse>
                        }
                        {success && <h3 className="text-center"><strong className="text-success">{success.message}</strong></h3>}

                        <div className="avatar mb-3">
                            <Avatar
                                alt="Profile Picture"
                                src={profile ? `/api/profile/uploads/${profile}` : ''}
                                sx={{ width: 116, height: 116, margin: 'auto', boxShadow: '10px 10px 25px 0px rgba(0,0,0,0.35)' }} />
                        </div>
                        {page === "My Personal information" && <>
                            <form className="w-75 mx-auto" id="profile-form" action={`/api/profile/update/${email}`} method="post" onSubmit={onSubmit}>
                                <div className="form-group mb-3">
                                    <TextField focused {...register("username")} label="username" className="form-control" onChange={(e) => setValue("username", e.target.value)} />
                                    {errors.username && <p><strong className="text-danger">{errors.username.message}</strong></p>}
                                </div>
                                <div className="form-group mb-3">
                                    <TextField focused type="email" {...register("email")} className="form-control" label="Email" onChange={(e) => setValue("email", e.target.value)} />
                                    {errors.email && <p><strong className="text-danger">{errors.email.message}</strong></p>}
                                </div>
                                <div className="form-group mb-3">
                                    <TextField focused {...register("number")} label="number" className="form-control" onChange={(e => setValue("number", e.target.value))} />
                                    {errors.number && <p><strong className="text-danger">{errors.number.message}</strong></p>}
                                </div>
                                <div {...getRootProps({ className: 'form-group mb-3' })} >
                                    <input {...register("profile")} {...getInputProps({ className: 'form-control', style: { display: 'block' } })} />
                                    {isDragAccept && <p>File accepted</p>}
                                    {isDragActive && <p>Drop the file here</p>}
                                    {isDragReject && <p>Unsopported file</p>}
                                </div>
                                {errors.profile && <p><strong className="text-danger">{errors.profile.message}</strong></p>}
                                <div className="form-group">
                                    <Button className="form-control" type="submit" variant="contained" color="primary">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </>}

                        {page === "My appointments" && <>
                            <AppointmentList isTable={true} appointments={appoitmentData} />
                        </>}

                    </Paper>
                </Grid>


            </Grid>


        </Box>


    )

}