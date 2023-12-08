import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export interface TitleType {
   _id?: string;
   id?: number;
   title?: string;
   subject?: string;
   date: string;
   code: string;
}

export interface TitlesState {
   arr: TitleType[];
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
            state.init = action.payload.init;
            state.arr = action.payload.arr;
         } catch (error) {
            console.log(error);
         }
      },
      clearTitles: () => initialState,
   },
});

export const { setTitles, clearTitles } = titlesSlice.actions;

export const selectTitles = (state: RootState) => state.titles;

export default titlesSlice.reducer;
