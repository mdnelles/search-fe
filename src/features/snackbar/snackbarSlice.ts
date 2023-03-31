import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface SnackbarState {
   msg: string | undefined;
   severity?: string | undefined;
   duration?: number | undefined;
   isOpen?: boolean | undefined;
}

export const initialState: SnackbarState | any = {
   msg: "no message",
   severity: "info",
   duration: 6000,
   isOpen: false,
};

export const snackbarSlice = createSlice({
   name: "snackbar",
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      setSnackbar: (state, action: PayloadAction<any>) => {
         const { msg, severity, duration, isOpen } = action.payload;
         try {
            //state = action.payload;
            state.msg = msg;
            state.isOpen = isOpen;
            state.severity = severity;
            state.duration = duration;
         } catch (error) {
            console.log(error);
         }
      },
      clearSnackbar: (state) => initialState,
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.snackbar.value)`
export const selectSnackbar = (state: RootState) => state.snackbar.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const snackbarInit =
   (user: any): AppThunk =>
   (dispatch) => {
      dispatch(setSnackbar(user));
   };

export default snackbarSlice.reducer;
