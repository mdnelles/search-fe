import React, { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";

interface results {
   id: number;
   title: string;
   date: string;
   code: string;
}

const entryWrapper = {
   width: "100%",
   margin: 10,
   padding: 10,
};

const entryTitle = {
   width: "100%",
   margin: 10,
   padding: 10,
};

const entryBody = {
   width: "100%",
   margin: 10,
   padding: 10,
};

const Result = (entry: results) => {
   return (
      <>
         <div style={entryWrapper}>
            <div style={entryTitle}></div>
            <div style={entryBody}></div>
         </div>
      </>
   );
};

export const SearchResults = (): any => {
   const titles: any = useAppSelector((state) => state.titles);

   const [resultsSm, resultsSet] = useState<results[] | []>([]);

   return <>Search Results</>;
};
