import "./App.css";
import React, { Suspense, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Add } from "./pages/Add";
import { Dashboard } from "./pages/Dashoard";
import { useAppSelector } from "./app/hooks";
import { SnackbarMsg } from "./components/SnackbarMsg";
import { Note } from "./pages/Note";
import { Todo } from "./pages/Todo";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { CollectionsOutlined } from "@mui/icons-material";

function App() {
   const navigate = useNavigate();
   let session: any = useAppSelector((state) => state.snackbar);
   let snackbar: any = useAppSelector((state) => state.snackbar);
   let stateAll: any = useAppSelector((state) => state);

   useEffect(() => {}, [snackbar]);

   useMemo(() => {
      console.log(stateAll);
   }, [stateAll]);

   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path='/' element={<Login />} />
               <Route path='/login' element={<Login />} />

               <Route element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<Dashboard text={""} />} />
                  <Route path='/search' element={<Search text={""} />} />
                  <Route path='/add' element={<Add text={""} />} />
                  <Route path='/note' element={<Note text={""} />} />
                  <Route path='/todo' element={<Todo text={""} />} />
               </Route>
            </Routes>
         </Suspense>
         <SnackbarMsg snackbarState={snackbar} />
      </>
   );
}

export default App;
