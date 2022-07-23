import { DashboardTemplate } from "./Template/DashboardTemplate";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { apiPost } from "../utilities/ApiRequest";
import { setTitles } from "../features/titles/titlesSlice";
import { useState } from "react";

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

export const Dashboard = (props: DashboardProps) => {
   const dispatch = useAppDispatch();
   const titles: any = useAppSelector((state) => state.titles);
   const todo: any = useAppSelector((state) => state.todo);
   const note: any = useAppSelector((state) => state.note);
   const session: any = useAppSelector((state) => state.session);
   const token = session.user.token;

   const [titlesMsg, titlesMsgSet] = useState<string>("-");
   const [todoMsg, todoMsgSet] = useState<string>("-");
   const [noteMsg, noteMsgSet] = useState<string>("-");
   dispatch(setSnackbar({ isOpen: false }));

   if (!titles.init && titlesMsg === "-") {
      (async () => {
         const title = await apiPost("/search/get_titles", { token });
         console.log(title.data);
         if (!title.data.err) {
            dispatch(setTitles({ arr: title.data.data, init: true }));
            titlesMsgSet("Titles Loaded");
         } else {
            titlesMsgSet(title.data.msg || "something went wrong");
         }
      })();
   }

   return (
      <DashboardTemplate>
         <h3>Dashboard Home</h3>
         <Paper style={pstyle}>
            <h5>Search Titles</h5>
            {!titles.init && titlesMsg === "-" ? (
               <Box sx={{ width: "100%" }}>
                  Loading Search...
                  <LinearProgress />
               </Box>
            ) : (
               <>{titlesMsg}</>
            )}
         </Paper>
         <Paper style={pstyle}>
            <h5>Todos</h5>
            {!todo.init && todoMsg === "-" ? (
               <Box sx={{ width: "100%" }}>
                  Loading Todos...
                  <LinearProgress />
               </Box>
            ) : (
               <>{todoMsg}</>
            )}
         </Paper>
         <Paper style={pstyle}>
            <h5>Note</h5>
            {!note.txt && noteMsg === "-" ? (
               <Box sx={{ width: "100%" }}>
                  Loading notepad...
                  <LinearProgress />
               </Box>
            ) : (
               <>{noteMsg}</>
            )}
         </Paper>
      </DashboardTemplate>
   );
};
