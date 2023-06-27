import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../redux/hooks";
import Alert from "@mui/material/Alert";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { useEffect } from "react";

interface SnackMsgProps {
   snackbarState: any;
}

export const SnackbarMsg = (props: SnackMsgProps) => {
   const { snackbarState } = props;
   const dispatch = useAppDispatch();

   const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === "clickaway") {
         return;
      }

      dispatch(setSnackbar({ ...snackbarState, isOpen: false }));
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

   useEffect(() => {
      console.log("UE inside snack");
      console.log(snackbarState);
   }, []);

   return (
      <>
         <Snackbar
            open={snackbarState.isOpen}
            autoHideDuration={snackbarState.duration}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity={snackbarState.severity}
               sx={{ width: "100%" }}
            >
               {snackbarState.msg}
            </Alert>
         </Snackbar>
      </>
   );
};
