import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { apiPost } from "../utilities/ApiRequest";
import { rand, sqlPrep } from "../utilities/gen";
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

   const [ttype, setTtype] = useState<string>("");
   const [title, setTitle] = useState<string>("");
   const [code, setCode] = useState<string>("");
   const [keywords, setKeywords] = useState<string[] | []>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const addEntryStart = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();
      setLoading(true);

      dispatch(
         setSnackbar({
            msg: `Adding entry to database...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );

      setTitle(sqlPrep(title));
      setCode(sqlPrep(code));

      try {
         const kw = JSON.stringify(keywords)
            .replace("[", "")
            .replace("]", "")
            .replace(/"/g, "");
         const res = await apiPost("/sv-search/add_entry", {
            token,
            ttype,
            title,
            code,
            kw,
         });
         console.log(res);
         // now clear the form
         setTtype("");
         setTitle("");
         setCode("");
         setKeywords([]);
         setLoading(false);

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
            <h3>Add to CodeBase</h3>
            {!loading ? (
               <div>
                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div style={lgBg}>
                           {/* <FormControl style={{ minWidth: 320 }}>
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
                                    <MenuItem
                                       value={atype.ttype}
                                       key={atype.id}
                                    >
                                       {atype.ttype}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl> */}
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

                     {/* <Grid item xs={12}>
                        <div style={lgBg}>
                           {ttypeArr.map((atype: any) => (
                              <FormControlLabel
                                 key={"c-" + rand()}
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
                     </Grid> */}

                     <Grid item xs={12}>
                        <div style={lgBg}>
                           <TextField
                              id='code'
                              label='Code'
                              multiline
                              rows='10'
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
            ) : (
               <div style={{ textAlign: "center" }}>
                  <h3>Adding to CodeBase...</h3>
                  <LinearProgress />
               </div>
            )}
         </div>
      </DashboardTemplate>
   );
};
