import "./App.css";
import { Suspense, useMemo, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Add } from "./pages/Add";
import { Dashboard } from "./pages/Dashoard";
import { useAppSelector } from "./app/hooks";
import { SnackbarMsg } from "./components/SnackbarMsg";
import { Todo } from "./pages/Todo";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { Categories } from "./pages/Categories";

function App() {
   let snackbar: any = useAppSelector((state) => state.snackbar);
   let stateAll: any = useAppSelector((state) => state);

   useEffect(() => {}, [snackbar]);

   useMemo(() => {
      localStorage.state = JSON.stringify(stateAll);
      //console.log(JSON.parse(localStorage.state));
   }, [stateAll]);

   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path='/' element={<Navigate replace to='/login' />} />
               <Route path='/login' element={<Login />} />

               <Route element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<Dashboard text={""} />} />
                  <Route path='/search' element={<Search text={""} />} />
                  <Route path='/add' element={<Add />} />
                  <Route path='/todo' element={<Todo />} />
                  <Route path='/categories' element={<Categories />} />
               </Route>
            </Routes>
         </Suspense>
         <SnackbarMsg snackbarState={snackbar} />
      </>
   );
}

export default App;
