import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSession } from "../features/session/sessionSlice";
import { isValidEmail, isValidPassword } from "../utilities/validate";
import { apiPost } from "../utilities/ApiRequest";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

const theme = createTheme();

export const Login = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const [loading, setLoading] = React.useState(false);
   const [success, setSuccess] = React.useState(false);

   const buttonSx = {
      ...(success && {
         "bgcolor": green[500],
         "&:hover": {
            bgcolor: green[700],
         },
      }),
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSuccess(false);
      setLoading(true);
      const data = new FormData(event.currentTarget);

      const email = data.get("email");
      const password = data.get("password");

      if (isValidEmail(data.get("email")) && isValidPassword(password)) {
         dispatch(
            setSnackbar({
               msg: `Testing Credentials...`,
               isOpen: true,
               severity: "info",
               duration: 5500,
            })
         );
         const res = await apiPost("/sv-user/login", { email, password });

         if (res.data.err) {
            dispatch(
               setSnackbar({
                  msg: `login failed email: ${email} & password: ***** `,
                  isOpen: true,
                  severity: "error",
                  duration: 5500,
               })
            );
         } else {
            const user = {
               email,
               token: res.data.token,
            };
            dispatch(setSession({ ...session, user }));
            setTimeout(() => navigate(`/dashboard`), 500);
         }
         setSuccess(true);
         setLoading(false);
      } else {
         setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            dispatch(
               setSnackbar({
                  msg: `You must enter a valid email and password `,
                  isOpen: true,
                  severity: "error",
                  duration: 5500,
               })
            );
         }, 500);
      }
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign in
               </Typography>
               <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
               >
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     id='email'
                     label='Email Address'
                     name='email'
                     autoComplete='email'
                     autoFocus
                  />
                  <TextField
                     margin='normal'
                     required
                     fullWidth
                     type='password'
                     name='password'
                     label='Password'
                     id='password'
                     autoComplete='current-password'
                  />
                  <Box sx={{ m: 1, position: "relative" }}>
                     <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                        onClick={() => handleSubmit}
                     >
                        Sign In
                     </Button>
                     {loading && (
                        <CircularProgress
                           size={24}
                           sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-12px",
                           }}
                        />
                     )}
                  </Box>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
};
