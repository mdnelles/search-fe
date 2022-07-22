import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
            <ListItemButton onClick={() => goPage(`/note`)}>
               <ListItemIcon>
                  <TextSnippetIcon />
               </ListItemIcon>
               <ListItemText primary='NotePad' />
            </ListItemButton>
            <ListItemButton onClick={() => goPage(`/todo`)}>
               <ListItemIcon>
                  <CheckCircleIcon />
               </ListItemIcon>
               <ListItemText primary='Todo List' />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component='div' inset>
               App Info
            </ListSubheader>
            <ListItemButton>
               <ListItemIcon>
                  <AssignmentIcon />
               </ListItemIcon>
               <ListItemText primary='Current month' />
            </ListItemButton>
         </List>
      </>
   );
};
