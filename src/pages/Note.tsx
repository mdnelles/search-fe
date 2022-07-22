import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface NoteProps {
   text: string;
}

export const Note = (props: NoteProps): any => {
   return <DashboardTemplate>Search</DashboardTemplate>;
};
