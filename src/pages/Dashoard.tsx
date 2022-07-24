import { DashboardTemplate } from "./Template/DashboardTemplate";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { apiPost } from "../utilities/ApiRequest";
import { setTitles } from "../features/titles/titlesSlice";
import { useState } from "react";
import { setTodo } from "../features/todo/todoSlice";
import { setNote } from "../features/note/noteSlice";
import { setSearchTypes } from "../features/stype/stypeSlice";

const pstyle = {
   margin: 20,
   paddingLeft: 20,
   paddingTop: 11,
   paddingRight: 20,
   paddingBottom: 10,
};

interface DashboardProps {
   text: string;
}

const Success = () => {
   return (
      <>
         <CheckCircleIcon color='success' />
      </>
   );
};

const Loading = () => {
   return (
      <>
         <HourglassTopIcon color='info' /> Loading from Database
      </>
   );
};

export const Dashboard = (props: DashboardProps) => {
   const dispatch = useAppDispatch();
   const titles: any = useAppSelector((state) => state.titles);
   const todo: any = useAppSelector((state) => state.todo);
   const note: any = useAppSelector((state) => state.note);
   const session: any = useAppSelector((state) => state.session);
   const stype: any = useAppSelector((state) => state.stype);
   const token = session.user.token;

   const [titlesMsg, titlesMsgSet] = useState<JSX.Element>(
      titles.init ? <Success /> : <Loading />
   );
   const [todoMsg, todoMsgSet] = useState<JSX.Element>(
      titles.init ? <Success /> : <Loading />
   );
   const [noteMsg, noteMsgSet] = useState<JSX.Element>(
      titles.init ? <Success /> : <Loading />
   );
   const [stypeMsg, stypeMsgSet] = useState<JSX.Element>(
      titles.init ? <Success /> : <Loading />
   );

   dispatch(setSnackbar({ isOpen: false }));

   (async () => {
      if (!titles.init) {
         dispatch(setTitles({ arr: [], init: true }));
         const titlesRes = await apiPost("/search/get_titles", { token });
         if (!titlesRes.data.err && !titles.init) {
            dispatch(setTitles({ arr: titlesRes.data.data, init: true }));
            titlesMsgSet(<Success />);
         }
      }
   })();
   (async () => {
      if (!todo.init) {
         const todoRes = await apiPost("/todo/get_todo", { token });
         if (!todoRes.data.err && !todo.init) {
            dispatch(setTodo({ arr: todoRes.data.data, init: true }));
            todoMsgSet(<Success />);
         }
      }
   })();
   (async () => {
      if (!stype.init) {
         const stypeRes = await apiPost("/search/get_ttypes", { token });
         if (!stypeRes.data.err && !stype.init) {
            dispatch(setSearchTypes({ arr: stypeRes.data.data, init: true }));
            stypeMsgSet(<Success />);
         }
      }
   })();
   (async () => {
      if (!note.txt) {
         const noteRes = await apiPost("/note/fetch", { token });
         if (!noteRes.data.err && !todo.init) {
            dispatch(setNote({ txt: noteRes.data.data, init: true }));
            noteMsgSet(<Success />);
         }
      }
   })();

   return (
      <DashboardTemplate>
         <h3>Dashboard Home</h3>
         <Paper style={pstyle}>
            <b>Search Titles</b>
            <br />
            {!titles.init ? (
               <Box sx={{ width: "100%" }}>
                  Loading Search...
                  <LinearProgress />
               </Box>
            ) : (
               <>
                  Titles are loaded count : {titles.arr.length || 0}
                  <hr />
                  {titlesMsg}
               </>
            )}
         </Paper>
         <Paper style={pstyle}>
            <b>Todos</b>
            <br />
            {!todo.init ? (
               <Box sx={{ width: "100%" }}>
                  Loading Todos...
                  <LinearProgress />
               </Box>
            ) : (
               <>
                  Todos are loaded count : {todo.arr.length || 0}
                  <hr />
                  {todoMsg}
               </>
            )}
         </Paper>
         <Paper style={pstyle}>
            <b>Search Types</b>
            <br />
            {!todo.init ? (
               <Box sx={{ width: "100%" }}>
                  Loading Search Types...
                  <LinearProgress />
               </Box>
            ) : (
               <>
                  Types are loaded count : {stype.arr.length || 0}
                  <hr />
                  {stypeMsg}
               </>
            )}
         </Paper>
         <Paper style={pstyle}>
            <b>Notepad</b>
            <br />
            {!note.txt ? (
               <Box sx={{ width: "100%" }}>
                  Loading notepad...
                  <LinearProgress />
               </Box>
            ) : (
               <>
                  Loaded and ready to go
                  <hr />
                  {noteMsg}
               </>
            )}
         </Paper>
      </DashboardTemplate>
   );
};
