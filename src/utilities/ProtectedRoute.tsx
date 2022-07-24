import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isValidSession } from "./validate";

const ProtectedRoute = () => {
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.titles);

   // show unauthorized screen if no user is found in redux store
   if (!isValidSession(session)) {
      return (
         <div className='unauthorized'>
            <h1>Unauthorized :(</h1>
            <span>
               <NavLink to='/login'>Login</NavLink> to gain access
            </span>
         </div>
      );
   }

   // returns child route elements
   return <Outlet />;
};
export default ProtectedRoute;
