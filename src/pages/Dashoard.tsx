import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";

interface DashboardProps {
   text: string;
}

export const Dashboard = (props: DashboardProps): any => {
   return <DashboardTemplate>Dashboard</DashboardTemplate>;
};
