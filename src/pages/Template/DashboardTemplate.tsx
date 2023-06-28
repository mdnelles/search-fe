import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { DrawerLeft } from "../../components/DrawerLeft";
import { AppBarTop } from "./AppBarTop";

const drawerWidth = 240;
const mdTheme = createTheme();

interface DashboardTemplateProps {
   children: any;
}

export const DashboardTemplate = (props: DashboardTemplateProps) => {
   const { children } = props;
   const [open, setOpen] = React.useState(true);
   const toggleDrawer = () => {
      setOpen(!open);
   };

   return (
      <ThemeProvider theme={mdTheme}>
         <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarTop
               drawerWidth={drawerWidth}
               toggleDrawer={toggleDrawer}
               propsopen={open}
            />

            <DrawerLeft
               variant='permanent'
               open={open}
               drawerWidth={drawerWidth}
               toggleDrawer={toggleDrawer}
            />
            <Box
               component='main'
               sx={{
                  backgroundColor: (theme) =>
                     theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
               }}
            >
               <Toolbar />
               <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                  {children}
               </Container>
            </Box>
         </Box>
      </ThemeProvider>
   );
};
