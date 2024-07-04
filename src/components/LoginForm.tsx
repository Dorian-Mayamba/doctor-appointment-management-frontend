import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { ResponseDataType } from "../../src/types/types";
import axios from "axios";
import { authenticate } from "../../src/features/authenticater/authSlice";
import { setProfile } from "../../src/features/profiles/profileSlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { useContext } from "react";
import { messageContext } from "../../src/contexts/FlashMessageContex";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Please enter an email")
    .email("Please enter a valid email"),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {name} = useAppSelector((state)=>state.authReducer);
  const {setMessage} = useContext(messageContext);

  const encodeCredential = (username: string, password: string) => {
    return btoa(`${username}:${password}`);
  }

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const credentials = encodeCredential(email, password);
    let responseData: ResponseDataType = await axios.post(props.url, {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    });
    dispatch(authenticate({
      token: responseData.data.accessToken,
      name: responseData.data.currentUserName,
      userId: responseData.data.id,
      isAuthenticated: true,
      ...responseData.data
    }))

    dispatch(setProfile({
      username: responseData.data.currentUserName,
      email: responseData.data.email,
      number: responseData.data.number,
      profilePath: responseData.data.userProfile,
      profile: responseData.data.userProfile
    }))
    setMessage(`Welcome ${name}`);
    navigate('/', { replace: true })
  }, (err) => console.log(err))

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 4,
              bgcolor: "background.default",
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Sign in to your account
            </Typography>
            <form onSubmit={onSubmit}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Box>
              <Box mt={2} textAlign="center">
                <MuiLink component={Link} to="/sign-up" color="primary">
                  Haven't got an account? Register here
                </MuiLink>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* This part represents the image or visual content */}
          <Box
            sx={{
              height: 300,
              backgroundImage:
                "url('../../public/Generic-doctor-v6.jpg')", 
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
