import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { setSnackbar } from "../../features/snackbar/snackbarSlice";
import { rand, sqlPrep } from "../../utilities/gen";
import { apiPost } from "../../utilities/ApiRequest";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { setTitles } from "../../features/titles/titlesSlice";
import { setSuggest } from "../../features/suggest/suggestSlice";

const lgBg = {
   backgroundColor: "#ffffff",
   borderRadius: 3,
   padding: 10,
};

export interface SearchEditProps {
   open: boolean;
   selectedValue: string;
   onClose: (value: string) => void;
   id: string;
}

export function SearchEdit(props: SearchEditProps) {
   const { open, selectedValue, onClose, id: _id } = props;
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const suggest: any = useAppSelector((state) => state.suggest);
   const titles: any = useAppSelector((state) => state.titles);
   const token = session.user.token;

   const local = suggest.arr.filter((s: any) => s._id === _id);

   const [title, setTitle] = useState<string>(local[0].subject || "");
   const [code, setCode] = useState<string>(local[0].code || "");

   const handleClose = () => {
      setTitle("");
      setCode("");
      onClose(selectedValue);
   };

   const handleEdit = async (event: any) => {
      event.preventDefault();

      dispatch(
         setSnackbar({
            msg: `Editing entry ...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );

      setTitle(sqlPrep(title));
      setCode(sqlPrep(code));

      try {
         await apiPost("/sv-search/upd_entry", {
            token,
            title,
            code,
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
            setTitles(
               titles.map((ti: any) => {
                  const { _id, title, code } = ti;
                  ti._id === _id ? { _id, title, code } : ti;
               })
            )
         );
         dispatch(
            setSuggest(
               suggest.map((s: any) => {
                  const { _id, title, code } = s;
                  s._id === _id ? { _id, title, code } : s;
               })
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Dialog
         onClose={handleClose}
         open={open}
         key={"key" + rand()}
         style={{ width: "90%" }}
      >
         <div style={{ padding: 10 }}>
            <h3>Update Entry</h3> <br />
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
                              defaultValue={title}
                              rows='1'
                              fullWidth={true}
                              onChange={(event) => setTitle(event.target.value)}
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
                              defaultValue={code}
                              fullWidth={true}
                              onChange={(event) => setCode(event.target.value)}
                           />
                        </div>
                     </Grid>

                     <Grid item xs={12}>
                        <div style={{ padding: 5 }}>
                           <ButtonGroup variant='contained' color='secondary'>
                              <Button onClick={(event) => handleEdit(event)}>
                                 Edit Entry
                              </Button>
                           </ButtonGroup>
                        </div>
                     </Grid>
                  </Grid>
               </form>
            </div>
         </div>
      </Dialog>
   );
}
