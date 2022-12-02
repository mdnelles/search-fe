import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { SearchBox } from "./Template/components/Autocomplete/SearchBox";
import { SearchResults } from "./Template/components/Autocomplete/SearchResults";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface SearchProps {
   text: string;
}

export const Search = (props: SearchProps): any => {
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
