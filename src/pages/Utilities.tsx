import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";
import { sqlToNoSql } from "../utilities/functions";

export default function Utilities(): JSX.Element {
   const [sql, setSql] = React.useState<string>("");
   const [nosql, setNoSql] = React.useState<string>("");

   const startSql = (sql: string) => {
      setSql(sql);
      setNoSql(sqlToNoSql(sql));
      console.log(sqlToNoSql(sql));
   };
   return (
      <DashboardTemplate>
         <div id='main' className='body'>
            <h3>SQL NoSQL Conversion</h3> <br />
            <div>
               {/* install Grid with two rows and two colums*/}
               <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
               >
                  <Grid item xs={6}>
                     <TextField
                        id='sql'
                        label='SQL'
                        multiline
                        rows='20'
                        defaultValue={sql}
                        fullWidth={true}
                        onChange={(event) => {
                           startSql(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='nosql'
                        label='NoSQL'
                        multiline
                        rows='20'
                        defaultValue={nosql}
                        fullWidth={true}
                        onChange={(event) => {
                           setNoSql(event.target.value);
                        }}
                     />
                  </Grid>
               </Grid>
            </div>
         </div>
      </DashboardTemplate>
   );
}
