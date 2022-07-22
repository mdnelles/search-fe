import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface TodoProps {
   text: string;
}

export const Todo = (props: TodoProps): any => {
   return <DashboardTemplate>Todo</DashboardTemplate>;
};
