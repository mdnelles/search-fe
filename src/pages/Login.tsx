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

const theme = createTheme();

export const Login = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   let session: any = useAppSelector((state) => state.session);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get("email"),
         password: data.get("password"),
      });
      let userObj: object = {
         token: new Date(),
         email: data.get("email"),
         displayName: "na",
         photoUrl: "na",
         uid: "na",
      };
      dispatch(setSession({ ...session, user: userObj }));
      navigate(`/dashboard`);
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
                     type='password'
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
