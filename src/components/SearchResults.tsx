import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import { setTitles } from "../features/titles/titlesSlice";
import { apiPost } from "../utilities/ApiRequest";
import { rand } from "../utilities/gen";
import { SearchEdit } from "./dialogs/SearchEdit";

interface TitleType {
   _id: string;
   id: number;
   title: string;
   date1: string;
   code: string;
}

interface SearchResultsProp {
   suggest: any;
}

const entryWrapper = {
   width: "100%",
   marginTop: 10,
   border: "1px solid #bbb",
   borderRadius: 3,
   color: "#333",
   background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,227,227,1) 100%)",
   overlow: "hidden",
};

const entryTitle = {
   width: "100%",
   padding: 10,
   backgroundColor: "#bbb",
   cursor: "pointer",
};

const entryBody = {
   width: "100%",
   padding: 10,
   display: "none",
};

const tog = (id: number) => {
   const e = document.getElementById("b-" + id);
   if (e) {
      e.style.display = e.style.display === "none" ? "block" : "none";
   }
};

export const SearchResults = (props: SearchResultsProp): any => {
   const { suggest = [] } = props;
   const dispatch = useAppDispatch();
   const session: any = useAppSelector((state) => state.session);
   const titles: any = useAppSelector((state) => state.titles.arr);
   const token = session.user.token;

   const [open, openSet] = useState(false);
   const [idEdit, idEditSet] = useState<number>(0);
   const [selectedValue, setSelectedValue] = useState("");

   const handleDelete = async (event: any, _id: any) => {
      console.log(_id);
      event.preventDefault();

      dispatch(
         setSnackbar({
            msg: `deleting entry ...`,
            isOpen: true,
            severity: "success",
            duration: 5500,
         })
      );
      try {
         await apiPost("/sv-search/del_entry", {
            token,
            _id,
         });
         dispatch(
            setTitles({
               ...titles,
               arr: titles.filter((ti: any) => ti._id !== _id),
            })
         );
         dispatch(
            setSnackbar({
               msg: `Database record deleted...`,
               isOpen: true,
               severity: "success",
               duration: 2500,
            })
         );
      } catch (error) {
         console.log(error);
      }
   };

   const Display = (obj: TitleType | any) => {
      const { subject, code, _id } = obj.entry;
      return (
         <div key={"e-" + _id}>
            <div style={entryWrapper}>
               <div style={entryTitle} onClick={() => tog(code)}>
                  {subject}
               </div>
               <div style={entryBody} id={"b-" + code}>
                  <pre>{code}</pre>
                  <Button
                     onClick={() => {
                        idEditSet(_id);
                        openSet(true);
                     }}
                  >
                     Edit!
                  </Button>
                  <Button onClick={(event) => handleDelete(event, _id)}>
                     Delete
                  </Button>
               </div>
            </div>
         </div>
      );
   };

   const handleClose = (value: string) => {
      openSet(false);
      setSelectedValue(value);
   };

   return (
      <>
         <b>Search Results</b>
         {!suggest || !suggest.arr
            ? null
            : suggest.arr.map((t: any) => {
                 return <Display entry={t} key={"kk-" + rand()} />;
              })}
         {idEdit === 0 ? null : (
            <SearchEdit
               selectedValue={selectedValue}
               open={open}
               onClose={handleClose}
               id={idEdit}
               key={rand()}
            />
         )}
      </>
   );
};
