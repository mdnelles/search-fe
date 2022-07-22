import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Arr {
   id: number;
   title: string;
   date: string;
}

export interface TitlesState {
   arr: Arr[];
   init: boolean;
}

const initialState: TitlesState = {
   arr: [],
   init: false,
};

export const titlesSlice = createSlice({
   name: "titles",
   initialState,

   reducers: {
      setTitles: (state, action: PayloadAction<any>) => {
         try {
            console.log(action.payload);
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearTitles: (state) => initialState,
   },
});

export const { setTitles, clearTitles } = titlesSlice.actions;

export const selectTitles = (state: RootState) => state.titles;

export default titlesSlice.reducer;
