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

const theme = createTheme();

export const Login = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   let session: any = useAppSelector((state) => state.session);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const email = data.get("email");
      const password = data.get("password");

      if (isValidEmail(data.get("email")) && isValidPassword(password)) {
         const res = await apiPost("/user/login", { email, password });
         console.log(res.data);
         if (res.data.err) {
            dispatch(
               setSnackbar({
                  msg: `login failed email: ${email} & password: ${password} `,
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
            navigate(`/dashboard`);
         }
      } else {
         dispatch(
            setSnackbar({
               msg: `login failed email: ${email} & password: ${password} `,
               isOpen: true,
               severity: "error",
               duration: 5500,
            })
         );
         console.log("login failed \nemail: " + email + "password" + password);
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
                     name='password'
                     label='Password'
                     id='password'
                     autoComplete='current-password'
                  />
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     sx={{ mt: 3, mb: 2 }}
                     onClick={() => handleSubmit}
                  >
                     Sign In
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
};
