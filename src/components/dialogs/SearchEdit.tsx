import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MouseEvent, useState, useRef } from "react";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { rand, sqlPrep } from "../../utilities/gen";
import { apiPost } from "../../utilities/ApiRequest";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
   TitleType,
   TitlesState,
   setTitles,
} from "../../features/titles/titlesSlice";
import {
   SuggestState,
   SuggestType,
   setSuggest,
} from "../../features/suggest/suggestSlice";
import { SessionState } from "../../features/session/sessionSlice";
import React from "react";

const lgBg = {
   backgroundColor: "#ffffff",
   borderRadius: 3,
   padding: 10,
};

export interface SearchEditProps {
   open: boolean;
   setOpen: any;
   id: string;
}

export function SearchEdit(props: SearchEditProps) {
   const { open, setOpen, id: _id } = props;
   const dispatch = useAppDispatch();
   const session: SessionState = useAppSelector((state) => state.session);
   const suggest: SuggestState = useAppSelector((state) => state.suggest);
   const titles: TitlesState = useAppSelector((state) => state.titles);
   const token = session.user.token;

   const title: TitleType = titles.arr.filter(
      (t: TitleType) => t._id === _id
   )[0];

   const [loading, setLoading] = useState<boolean>(false);
   const titleRef = useRef<HTMLInputElement | null>(null); // Define type as HTMLInputElement
   const codeRef = useRef<HTMLTextAreaElement | null>(null); // Define type as HTMLTextAreaElement

   const handleEdit = async () => {
      try {
         await apiPost("/sv-search/upd_entry", {
            token,
            title: titleRef.current?.value || "",
            code: codeRef.current?.value || "",
            _id,
         });

         dispatch(
            setSnackbar({
               msg: `Database record edited...`,
               isOpen: true,
               severity: "success",
               duration: 2500,
            })
         );
         dispatch(
            setTitles({
               arr: titles.arr.map((t: TitleType) => {
                  if (t._id === _id) {
                     return {
                        ...t, // Keep the existing properties
                        title: titleRef.current?.value || "",
                        code: codeRef.current?.value || "",
                     };
                  } else {
                     return t; // Keep the other objects unchanged
                  }
               }),
               init: titles.init, // Keep the 'init' property unchanged
            })
         );

         dispatch(
            setSuggest(
               suggest.arr.map((s: SuggestType) => {
                  const { _id, title, code } = s;
                  s._id === _id ? { _id, title, code } : s;
               })
            )
         );

         setTimeout(() => {
            setLoading(false);
            handleClose();
         }, 3000);
      } catch (error) {
         console.log(error);
      }
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Dialog open={open} key={"key" + rand()} style={{ width: "90%" }}>
         <div style={{ padding: 10 }}>
            <h3>Update Entry</h3>
            {loading ? (
               <LinearProgress />
            ) : (
               <div>
                  <form id='main'>
                     <Grid container spacing={1}>
                        <Grid item xs={12}>
                           <div style={lgBg}>
                              <TextField
                                 id='title'
                                 name='title'
                                 label='Title'
                                 multiline
                                 defaultValue={title.title || ""}
                                 rows='1'
                                 fullWidth={true}
                                 inputRef={titleRef}
                              />
                           </div>
                        </Grid>

                        <Grid item xs={12}>
                           <div style={lgBg}>
                              <TextField
                                 id='code'
                                 name='code'
                                 label='Code'
                                 multiline
                                 rows='20'
                                 defaultValue={title.code || ""}
                                 fullWidth={true}
                                 inputRef={codeRef}
                              />
                           </div>
                        </Grid>

                        <Grid item xs={12}>
                           <div style={{ padding: 5 }}>
                              <Button
                                 onClick={() => handleEdit()}
                                 variant='contained'
                              >
                                 Edit Entry
                              </Button>{" "}
                              <Button
                                 onClick={() => handleClose()}
                                 variant='contained'
                              >
                                 Close
                              </Button>
                           </div>
                        </Grid>
                     </Grid>
                  </form>
               </div>
            )}
         </div>
      </Dialog>
   );
}
