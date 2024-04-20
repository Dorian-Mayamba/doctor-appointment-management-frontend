import { RootState } from "../../src/app/store";
import { useAppSelector } from "../../src/app/hooks";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import axios from "axios";
import $ from 'jquery';
import { useEffect, useState } from "react";
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
import {styled} from '@mui/material/styles';

interface IProfileProps {
    username: string;
    email: string;
    number: string;
    profile?: any;
    profilePath?: string | null;
}

const profileSchema: yup.ObjectSchema<IProfileProps> = yup
    .object({
        username: yup.string().required("username is required"),
        email: yup.string().required("email is required").email("invalid email format"),
        number: yup.string().required("please enter your number"),
        profile: yup.mixed().nullable().test("profile", "Only image file are supported", (value) => {
            return !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type));
        }),
        profilePath: yup.string().nullable()
    })


    const StyledItemText = (styled)(ListItemText)(({theme})=>({
        color:theme.palette.common.white,
        fontSize:'8px'
    }));

export default function Profile() {
    const { name, roleType, email, userId, token } = useAppSelector((state: RootState) => state);
    console.log(userId);
    const [profile, setProfile] = useState<IProfileProps | null>(null);
    const [success, setSuccess] = useState<any>(null);
    const [isFile, setFile] = useState<Boolean>(false);
    //ToDo implement a token verification request


    const {
        register,
        setValue,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<IProfileProps>({
        resolver: yupResolver(profileSchema),
        defaultValues: async () => {
            let data = await axios.get(`/api/profile/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            setProfile(data.data);
            console.log(data.data);
            return data.data;
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

    useEffect(() => {
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

    const onSubmit = handleSubmit(async (values) => {
        try {
            const url = $('#profile-form').attr('action');
            if (url) {
                let fd = new FormData();

                if (isFile) fd.append("profile", values.profile);

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
                setProfile((prev) => {
                    const isProfilePath: boolean = data.data.profile != undefined
                    if (prev) prev.profilePath = isProfilePath ? data.data.profile : '';
                    return prev;
                })
                console.log(data.data);

            }
        } catch (err) {
            console.log("error: " + err);
        }
    })

    return (
        <Box component="section">
            <Grid container columnSpacing={{ xs: 1, sm: 1, md:0 }}>
                <Grid sx={{ bgcolor: '#6479E9' }} item md={2}>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <StyledItemText primary="My personal information"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <StyledItemText primary="My appointment" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <StyledItemText primary="Pending Appointments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <StyledItemText primary="Appointment Calendar" />
                            </ListItemButton>
                        </ListItem>
                        {roleType == DOCTOR && <>
                            <ListItem>
                            <ListItemButton>
                                <StyledItemText primary="My Reviews" />
                            </ListItemButton>
                        </ListItem>
                        </>}
                    </List>
                </Grid>
                <Grid sx={{ bgcolor: '#D5FEFE' }} item xs={9} md={7} lg={10}>
                    <Paper sx={{ m: 2, p: 3 }}>
                        <Stack style={{ position: 'relative' }} justifyContent="center" direction="row">
                            <h3 className="text-center"><small>{name}'s Profile</small></h3>
                            <form style={{ position: 'absolute', right: '0' }} action="#">
                                <Button variant="contained" color="error" type="submit">Delete my Account</Button>
                            </form>
                        </Stack>

                        {success && <h3 className="text-center"><strong className="text-success">{success.message}</strong></h3>}
                        <div className="avatar mb-3">
                            <Avatar
                                alt="Profile Picture"
                                src={profile?.profilePath ? `/api/profile/uploads/${profile?.profilePath}` : ''}
                                sx={{ width: 116, height: 116, margin: 'auto', boxShadow:'1px 12px 21px 1px' }} />
                        </div>
                        <form className="w-75 mx-auto" id="profile-form" action={`/api/profile/update/${profile?.email}`} method="post" onSubmit={onSubmit}>
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
                    </Paper>
                </Grid>


            </Grid>


        </Box>


    )

}