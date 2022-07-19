import { Routes, Route } from "react-router-dom";
import { Add } from "../../pages/Add";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Search } from "../../pages/Search";

const Main = () => {
   return (
      <Routes>
         <Route path='/' element={<Login />} />
         <Route path='/add' element={<Add text={""} />} />
         <Route path='/search' element={<Search text={""} />} />
         <Route path='/home' element={<Home />} />
      </Routes>
   );
};
export default Main;
