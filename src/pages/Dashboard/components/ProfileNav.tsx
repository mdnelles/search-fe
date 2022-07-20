import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

interface ProfileNavProps {
   mopen: any;
   handleClick: any;
   handleMenuClose: any;
}

export const ProfileNav = (): any => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleMenuClose = () => {
      setAnchorEl(null);
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
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
         </Menu>
      </>
   );
};
