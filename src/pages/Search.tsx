import Box from "@mui/material/Box";
import React from "react";
import { SearchBox } from "./Template/components/Autocomplete/SearchBox";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface SearchProps {
   text: string;
}

export const Search = (props: SearchProps): any => {
   return (
      <DashboardTemplate>
         Search
         <Box>
            <SearchBox />
         </Box>
      </DashboardTemplate>
   );
};
