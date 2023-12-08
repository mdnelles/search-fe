import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export interface SuggestType {
   _id: string;
   id?: number;
   title?: string;
   subject?: string;
   date: string;
   code: string;
}

export interface SuggestState {
   arr: SuggestType[];
}

const initialState: SuggestState = {
   arr: [],
};

export const suggestSlice = createSlice({
   name: "suggest",
   initialState,

   reducers: {
      setSuggest: (state, action: PayloadAction<any>) => {
         try {
            state.arr = action.payload.arr;
         } catch (error) {
            console.log(error);
         }
      },
      clearSuggest: () => initialState,
   },
});

export const { setSuggest, clearSuggest } = suggestSlice.actions;

export const selectSuggest = (state: RootState) => state.suggest;

export default suggestSlice.reducer;
