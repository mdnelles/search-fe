import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";
import List from "@mui/material/List";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { apiPost } from "../utilities/ApiRequest";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { setSearchTypes } from "../features/stype/stypeSlice";

const Demo = styled("div")(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
}));

interface catType {
   id: number;
   ttype: string;
}

export const Categories = (): any => {
   const dispatch = useAppDispatch();
   let categories: any = useAppSelector((state) => state.stype);
   let token: string = useAppSelector((state) => state.session.user.token);
   const [name, setName] = React.useState("");
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   };

   const delCat = (id: number): void => {
      if (window.confirm("Are you sure?") == true) {
         let tmp: [] = categories.arr.filter(
            (cats: { id: number; ttype: string }) => cats.id !== id
         );

         dispatch(setSearchTypes({ ...categories, arr: tmp }));
         dispatch(
            setSnackbar({
               msg: `Removing category...`,
               isOpen: true,
               severity: "info",
               duration: 3000,
            })
         );
         apiPost("/sv-search/del_cat", { token, id });
      }
   };

   const addCat = async () => {
      dispatch(
         setSnackbar({
            msg: `Uploading new Category`,
            isOpen: true,
            severity: "info",
            duration: 3000,
         })
      );
      let resp = await apiPost("/sv-search/add_cat", {
         token,
         category: name,
      });
      let tmp = categories.arr;
      tmp = [...tmp, { id: resp.data.data.id, ttype: name }];

      dispatch(setSearchTypes({ ...categories, arr: tmp }));
      setName("");
   };

   return (
      <DashboardTemplate>
         <b>Categories</b>
         <div style={{ padding: 5 }} />
         <TextField
            id='outlined-name'
            size='small'
            label='category'
            value={name}
            fullWidth
            onChange={handleChange}
         />
         <div style={{ padding: 2 }} />
         <Button variant='contained' fullWidth onClick={() => addCat()}>
            Add Category
         </Button>
         <div style={{ padding: 5 }} />
         <Demo>
            <List dense={true}>
               {!categories || !categories.arr
                  ? null
                  : categories.arr.map((c: catType) => (
                       <ListItem
                          key={"i-" + c.id}
                          secondaryAction={
                             <IconButton
                                edge='end'
                                aria-label='delete'
                                onClick={() => delCat(c.id)}
                             >
                                <DeleteIcon />
                             </IconButton>
                          }
                       >
                          <ListItemAvatar>
                             <Avatar>
                                <FolderIcon />
                             </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={c.ttype} />
                       </ListItem>
                    ))}
            </List>
         </Demo>
      </DashboardTemplate>
   );
};
