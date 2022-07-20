import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
   <React.Fragment>
      <ListItemButton>
         <ListItemIcon>
            <DashboardIcon />
         </ListItemIcon>
         <ListItemText primary='Dashboard' />
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <SearchIcon />
         </ListItemIcon>
         <ListItemText primary='Search' />
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <AddIcon />
         </ListItemIcon>
         <ListItemText primary='Add' />
      </ListItemButton>
   </React.Fragment>
);

export const secondaryListItems = (
   <React.Fragment>
      <ListSubheader component='div' inset>
         App Info
      </ListSubheader>
      <ListItemButton>
         <ListItemIcon>
            <AssignmentIcon />
         </ListItemIcon>
         <ListItemText primary='Current month' />
      </ListItemButton>
   </React.Fragment>
);
