import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export interface NoteState {
   txt: string | boolean;
}

const initialState: NoteState = {
   txt: false,
};

export const notesSlice = createSlice({
   name: "note",
   initialState,

   reducers: {
      setNote: (state, action: PayloadAction<any>) => {
         try {
            state.txt = action.payload.txt;
         } catch (error) {
            console.log(error);
         }
      },
      clearNote: (state) => {
         try {
            state = initialState;
            console.log(state);
         } catch (error) {
            console.log(error);
         }
      },
   },
});

export const { setNote, clearNote } = notesSlice.actions;

export const selectNote = (state: RootState) => state.note;

export default notesSlice.reducer;
