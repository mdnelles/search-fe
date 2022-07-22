import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface SearchProps {
   text: string;
}

export const Search = (props: SearchProps): any => {
   return <DashboardTemplate>Search</DashboardTemplate>;
};
