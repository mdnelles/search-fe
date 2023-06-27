import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface Arr {
   id: number;
   title: string;
   details: string;
   createdAt: string;
   due: string;
}

export interface SearchTypesState {
   arr: Arr[];
   init: boolean;
}

const initialState: SearchTypesState = {
   arr: [],
   init: false,
};

export const stypesSlice = createSlice({
   name: "stypes",
   initialState,

   reducers: {
      setSearchTypes: (state, action: PayloadAction<any>) => {
         try {
            console.log(action.payload);
            state.arr = action.payload.arr;
            state.init = action.payload.init;
         } catch (error) {
            console.log(error);
         }
      },
      clearSearchTypes: (state) => initialState,
   },
});

export const { setSearchTypes, clearSearchTypes } = stypesSlice.actions;

export const selectSearchTypes = (state: RootState) => state.stype;

export default stypesSlice.reducer;
