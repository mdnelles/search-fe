import { Counter } from "./features/counter/Counter";
import "./App.css";

import React, { Suspense, lazy, useMemo } from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   useNavigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Add } from "./pages/Add";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { useAppSelector } from "./app/hooks";

function App() {
   const navigate = useNavigate();
   let session: any = useAppSelector((state) => state.session);
   const checkLogin = () => {
      if (!session || session.token) navigate(`/login`);
   };
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
      </>
   );
}

export default App;
