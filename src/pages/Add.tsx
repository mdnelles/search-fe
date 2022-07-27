import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { apiPost, API_URL } from "../utilities/ApiRequest";
import { sqlPrep } from "../utilities/gen";
import { DashboardTemplate } from "./Template/DashboardTemplate";

const lgBg = {
   backgroundColor: "#ffffff",
   borderRadius: 3,
   padding: 10,
};
export const Add = (): any => {
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const token = session.user.token;
   const ttypeArr: any = useAppSelector((state) => state.stype.arr);

   const [fileSelected, setFileSelected] = React.useState<File>(); // also tried <string | Blob>
   const [ttype, setTtype] = useState("");
   const [title, setTitle] = useState("");
   const [intro, setIntro] = useState("");
   const [code, setCode] = useState("");
   const [gridClass, setGridClass] = useState("displayBlock");
   const [uploadRunning, setUploadRunning] = useState(0);
   const [uploadTotal, setUploadTotal] = useState(0);
   const [percentComplete, setPercentComplete] = useState(0);
   const [viewProgress, setViewProgress] = useState("displayNone");
   const [keywords, setKeywords] = useState<string[] | []>([]);

   const selectChange = (event: any) => {
      console.log(event.target.value);
      setTtype(event.target.value);
   };

   const doChecked = (
      event: React.ChangeEvent<HTMLInputElement>,
      thisKeyword: { toString: () => any }
   ) => {
      let kw: string[] = [];

      if (event.target.checked === true) {
         let temp = [];
         temp.push(thisKeyword.toString());
         Array.prototype.push.apply(kw, temp);
         setKeywords(kw);
      } else {
         //setKeywords(. keywords.filter(keyword => !keyword.includes(thisKeyword)));
         keywords.forEach((e) => {
            if (e !== thisKeyword) kw.push(e);
         });
         setKeywords(kw);
      }
   };

   const addEntryStart = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();

      dispatch(
         setSnackbar({
            msg: `Adding entry to database...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );

      setTtype(sqlPrep(ttype));
      setTitle(sqlPrep(title));
      setIntro(sqlPrep(intro));
      setCode(sqlPrep(code));

      try {
         var kw = JSON.stringify(keywords)
            .replace("[", "")
            .replace("]", "")
            .replace(/"/g, "");
         const res = await apiPost("/search/add_entry", {
            token,
            ttype,
            title,
            intro,
            code,
            kw,
         });

         dispatch(
            setSnackbar({
               msg: `Record added to Database.  Please continue`,
               isOpen: true,
               severity: "success",
               duration: 5500,
            })
         );
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <DashboardTemplate>
         <div id='main' className='body'>
            <h3>Add to CodeBase</h3> <br />
            <div className={gridClass}>
               <Grid container spacing={1}>
                  <Grid item xs={12}>
                     <div style={lgBg}>
                        <FormControl style={{ minWidth: 320 }}>
                           <InputLabel id='ttype-label'>
                              Primary Type
                           </InputLabel>
                           <Select
                              labelId='Type'
                              id='ttype'
                              autoWidth={true}
                              value={ttype}
                              onChange={(event) => {
                                 selectChange(event);
                              }}
                           >
                              <MenuItem value={0}>Select Type</MenuItem>
                              {ttypeArr.map((atype: any) => (
                                 <MenuItem value={atype.ttype} key={atype.id}>
                                    {atype.ttype}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </div>
                  </Grid>

                  <Grid item xs={12}>
                     <div style={lgBg}>
                        <TextField
                           id='title'
                           label='Title'
                           multiline
                           defaultValue={title}
                           rows='1'
                           fullWidth={true}
                           onChange={(event) => {
                              setTitle(event.target.value);
                           }}
                        />
                     </div>
                  </Grid>

                  <Grid item xs={12}>
                     <div style={lgBg}>
                        <TextField
                           id='intro'
                           label='Intro'
                           multiline
                           defaultValue={intro}
                           rows='3'
                           fullWidth={true}
                           onChange={(event) => {
                              setIntro(event.target.value);
                           }}
                        />
                     </div>
                  </Grid>

                  <Grid item xs={12}>
                     <div style={lgBg}>
                        {ttypeArr.map((atype: any) => (
                           <FormControlLabel
                              key={"c-" + atype.id}
                              control={
                                 <Checkbox
                                    onChange={(event) =>
                                       doChecked(event, atype.ttype)
                                    }
                                    id={atype.ttype}
                                    color='primary'
                                 />
                              }
                              label={atype.ttype}
                           />
                        ))}
                     </div>
                  </Grid>

                  <Grid item xs={12}>
                     <div style={lgBg}>
                        <TextField
                           id='code'
                           label='Code'
                           multiline
                           rows='20'
                           defaultValue={code}
                           fullWidth={true}
                           onChange={(event) => {
                              setCode(event.target.value);
                           }}
                        />
                     </div>
                  </Grid>

                  <Grid item xs={12}>
                     <div style={{ padding: 5 }}>
                        <ButtonGroup
                           variant='contained'
                           color='secondary'
                           aria-label='contained primary button group'
                        >
                           <Button onClick={(event) => addEntryStart(event)}>
                              Save to CodeBase
                           </Button>
                        </ButtonGroup>
                     </div>
                  </Grid>
               </Grid>
            </div>
         </div>
      </DashboardTemplate>
   );
};
