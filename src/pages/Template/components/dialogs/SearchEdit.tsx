import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useState } from "react";
import { setSnackbar } from "../../../../features/snackbar/snackbarSlice";
import { rand, sqlPrep } from "../../../../utilities/gen";
import { apiPost } from "../../../../utilities/ApiRequest";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { setTitles } from "../../../../features/titles/titlesSlice";

const lgBg = {
   backgroundColor: "#ffffff",
   borderRadius: 3,
   padding: 10,
};

export interface SearchEditProps {
   open: boolean;
   selectedValue: string;
   onClose: (value: string) => void;
   id: number;
}

export function SearchEdit(props: SearchEditProps) {
   const { open, selectedValue, onClose, id } = props;
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const suggest: any = useAppSelector((state) => state.suggest);
   const titles: any = useAppSelector((state) => state.titles);
   const token = session.user.token;

   const local = suggest.arr.filter(
      (s: { code: number; name: string; body: string }) => s.code === id
   );

   const [title, setTitle] = useState<string>(
      !!local && !!local[0] && !!local[0].name ? local[0].name : ""
   );
   const [code, setCode] = useState<string>(
      !!local && !!local[0] && !!local[0].body ? local[0].body : ""
   );

   const handleClose = () => {
      setTitle("");
      setCode("");
      onClose(selectedValue);
   };

   // - useEffect(() => {}, [title, code]);

   const editEntryStart = async (event: any) => {
      event.preventDefault();

      dispatch(
         setSnackbar({
            msg: `Editing entry ...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );

      const main: any = document.getElementById("main");
      const data = new FormData(main);

      let title = data.get("title");
      let code = data.get("code");

      title = sqlPrep(title);
      code = sqlPrep(code);

      try {
         await apiPost("/sv-search/upd_entry", {
            token,
            title,
            code,
            id,
         });

         dispatch(
            setSnackbar({
               msg: `Database record edited...`,
               isOpen: true,
               severity: "success",
               duration: 5500,
            })
         );
         dispatch(
            setTitles(
               titles.map((ti: any) => {
                  ti.id === id
                     ? { id: ti.id, title: ti.title, code: ti.code }
                     : ti;
               })
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const delEntryStart = async (event: any) => {
      event.preventDefault();

      dispatch(
         setSnackbar({
            msg: `deleting entry ...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );
      try {
         await apiPost("/sv-search/del_entry", {
            token,
            id,
         });
         dispatch(setTitles(titles.filter((ti: any) => ti.id === id)));
         dispatch(
            setSnackbar({
               msg: `Database record deleted...`,
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
                           />
                        </div>
                     </Grid>

                     <Grid item xs={12}>
                        <div style={{ padding: 5 }}>
                           <ButtonGroup variant='contained' color='secondary'>
                              <Button
                                 onClick={(event) => editEntryStart(event)}
                              >
                                 Edit Entry
                              </Button>
                              <Button onClick={(event) => delEntryStart(event)}>
                                 Delete
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
