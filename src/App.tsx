import "./App.css";
import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Add } from "./pages/Add";
import { Dashboard } from "./pages/Dashoard";
import { useAppSelector } from "./redux/hooks";
import { SnackbarMsg } from "./components/SnackbarMsg";
import { Todo } from "./pages/Todo";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { Categories } from "./pages/Categories";
import Utilities from "./pages/Utilities";
import { SnackbarState } from "./features/snackbar/snackbarSlice";

function App() {
   const snackbar: SnackbarState = useAppSelector((state) => state.snackbar);

   useEffect(() => {}, [snackbar]);

   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path='/' element={<Navigate replace to='/login' />} />
               <Route path='/login' element={<Login />} />

               <Route element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/add' element={<Add />} />
                  <Route path='/todo' element={<Todo />} />
                  <Route path='/categories' element={<Categories />} />
                  <Route path='/utils' element={<Utilities />} />
               </Route>
            </Routes>
         </Suspense>
         <SnackbarMsg snackbarState={snackbar} />
      </>
   );
}

export default App;
