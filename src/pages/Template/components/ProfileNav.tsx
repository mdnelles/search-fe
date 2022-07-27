import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { clearSession } from "../../../features/session/sessionSlice";
import { clearTitles } from "../../../features/titles/titlesSlice";
import { clearTodo } from "../../../features/todo/todoSlice";
import { clearNote } from "../../../features/note/noteSlice";
import { clearSearchTypes } from "../../../features/stype/stypeSlice";

export const ProfileNav = (): any => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   let session: any = useAppSelector((state) => state.session);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = (
      event: React.MouseEvent<HTMLButtonElement> | any
   ): void => {
      dispatch(
         setSnackbar({
            msg: `Logging out`,
            isOpen: true,
            severity: "info",
            duration: 5500,
         })
      );
      setAnchorEl(event.currentTarget);
      dispatch(clearSession());
      dispatch(clearTodo());
      dispatch(clearTitles());
      dispatch(clearSearchTypes());
      dispatch(clearNote());
      navigate(`/`);
   };

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <>
         <IconButton
            id='basic-button'
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
         >
            <PersonIcon style={{ color: "white" }} />
         </IconButton>
         <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={(event) => handleLogout(event)}>Logout</MenuItem>
         </Menu>
      </>
   );
};
