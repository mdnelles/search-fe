import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { isValidSession } from "./validate";

const ProtectedRoute = () => {
   const session: any = useAppSelector((state) => state.session);
   const navigate = useNavigate();

   if (!isValidSession(session)) {
      setTimeout(() => navigate(`/`), 500);
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
