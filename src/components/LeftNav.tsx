import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

interface LeftNavProps {
   goPage: any;
}

export const LeftNav = (props: LeftNavProps) => {
   const { goPage } = props;

   return (
      <>
         <List component='nav'>
            <ListItemButton onClick={() => goPage(`/dashboard`)}>
               <ListItemIcon>
                  <DashboardIcon />
               </ListItemIcon>
               <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/search`)}>
               <ListItemIcon>
                  <SearchIcon />
               </ListItemIcon>
               <ListItemText primary='Search' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/add`)}>
               <ListItemIcon>
                  <AddIcon />
               </ListItemIcon>
               <ListItemText primary='Add' />
            </ListItemButton>

            <ListItemButton onClick={() => goPage(`/todo`)}>
               <ListItemIcon>
                  <CheckCircleIcon />
               </ListItemIcon>
               <ListItemText primary='Todo List' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/utils`)}>
               <ListItemIcon>
                  <BuildCircleIcon />
               </ListItemIcon>
               <ListItemText primary='Utilities' />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component='div' inset>
               App Config
            </ListSubheader>
            <ListItemButton onClick={() => goPage(`/categories`)}>
               <ListItemIcon>
                  <CategoryIcon />
               </ListItemIcon>
               <ListItemText primary='Manage Category' />
            </ListItemButton>
         </List>
      </>
   );
};
