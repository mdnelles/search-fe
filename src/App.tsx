import "./App.css";
import React, { Suspense, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Add } from "./pages/Add";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { useAppSelector } from "./app/hooks";
import { SnackbarMsg } from "./components/SnackbarMsg";

function App() {
   const navigate = useNavigate();
   let session: any = useAppSelector((state) => state.snackbar);
   let snackbar: any = useAppSelector((state) => state.snackbar);
   const checkLogin = () => {
      if (!session || session.token) navigate(`/login`);
   };
   useEffect(() => {}, [snackbar]);
   useMemo(() => {
      checkLogin();
   }, []);
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route path='/' element={<Login />} />
               <Route path='/login' element={<Login />} />
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/search' element={<Search text={""} />} />
               <Route path='/add' element={<Add text={""} />} />
            </Routes>
         </Suspense>
         <SnackbarMsg snackbarState={snackbar} />
      </>
   );
}

export default App;
