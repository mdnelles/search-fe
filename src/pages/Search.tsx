import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { SearchBox } from "../components/Autocomplete/SearchBox";
import { SearchResults } from "../components/SearchResults";
import { DashboardTemplate } from "./Template/DashboardTemplate";

export const Search = (): any => {
   const suggest: any = useAppSelector((state) => state.suggest);

   useEffect(() => {
      console.log("US suggest ....");
   }, [suggest]);

   return (
      <DashboardTemplate>
         Search
         <Box>
            <SearchBox />
         </Box>
         <Box>
            <SearchResults suggest={suggest} />
         </Box>
      </DashboardTemplate>
   );
};
