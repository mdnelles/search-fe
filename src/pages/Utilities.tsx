import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { DashboardTemplate } from "./Template/DashboardTemplate";
import {
   generateNestDTO,
   generateNestDoc,
   generateNestInterface,
   generateNestSchema,
} from "../utilities/functions";
import Button from "@mui/material/Button";

export default function Utilities(): JSX.Element {
   const [sql, setSql] = React.useState<string>(
      "CREATE TABLE `!!!!!!!!!!!!` (\n`id` int(11) NOT NULL,\n`lName` varchar(222) NOT NULL,\n) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
   );
   const [schema, setSchema] = React.useState<string>("");
   const [interfce, setInterfce] = React.useState<string>("");
   const [dto, setDTO] = React.useState<string>("");
   const [document, setDocument] = React.useState<string>("");

   const startSql = () => {
      setSql(sql);
      setSchema(generateNestSchema(sql));
      setInterfce(generateNestInterface(sql));
      setDTO(generateNestDTO(sql));
      setDocument(generateNestDoc(sql));
   };
   return (
      <DashboardTemplate>
         <div id='main' className='body'>
            <h3>Generate Nest Files</h3> <br />
            <div>
               <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
               >
                  <Grid item xs={12}>
                     <Button onClick={() => startSql()}>Generate</Button>
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='sql'
                        label='SQL'
                        multiline
                        rows='10'
                        defaultValue={sql}
                        fullWidth={true}
                        onChange={(event) => {
                           setSql(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='nosql'
                        label='NoSQL schema'
                        multiline
                        rows='10'
                        defaultValue={schema}
                        fullWidth={true}
                        onChange={(event) => {
                           setSchema(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='interface'
                        label='NoSQL interface'
                        multiline
                        rows='10'
                        defaultValue={interfce}
                        fullWidth={true}
                        onChange={(event) => {
                           setInterfce(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='nosql'
                        label='NoSQL DTO'
                        multiline
                        rows='10'
                        defaultValue={dto}
                        fullWidth={true}
                        onChange={(event) => {
                           setDTO(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField
                        id='document'
                        label='NoSQL document'
                        multiline
                        rows='10'
                        defaultValue={document}
                        fullWidth={true}
                        onChange={(event) => {
                           setDocument(event.target.value);
                        }}
                     />
                  </Grid>
                  <Grid item xs={6}></Grid>
               </Grid>
            </div>
         </div>
      </DashboardTemplate>
   );
}
