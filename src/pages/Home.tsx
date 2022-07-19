import React from "react";
import { Link } from "react-router-dom";
import Main from "../components/Routing/Main";

export const Home = (): any => {
   <>
      <div>
         <ul>
            <li>
               <Link to='/home'>Home</Link>
            </li>
            <li>
               <Link to='/add'>Add</Link>
            </li>
            <li>
               <Link to='/search'>Search</Link>
            </li>
         </ul>
         <hr />
         <Main />
      </div>
   </>;
};
