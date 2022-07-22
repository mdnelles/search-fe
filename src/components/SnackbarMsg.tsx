import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function SnackbarMsg() {
   const dispatch = useAppDispatch();
   let session: any = useAppSelector((state) => state.session);
   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === "clickaway") {
         return;
      }

      setOpen(false);
   };

   const action = (
      <React.Fragment>
         <Button color='secondary' size='small' onClick={handleClose}>
            UNDO
         </Button>
         <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleClose}
         >
            <CloseIcon fontSize='small' />
         </IconButton>
      </React.Fragment>
   );

   return (
      <div>
         <Button onClick={handleClick}>Open simple snackbar</Button>
         <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message='Note archived'
            action={action}
         />
      </div>
   );
}
