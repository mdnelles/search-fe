import { useAppSelector } from "../../../../app/hooks";

interface results {
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
   backgroundColor: "#ddd",
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
   if (!!e) {
      e.style.display = e.style.display === "none" ? "block" : "none";
      console.log(e?.style.display);
   }
};

const Display = (obj: results | any) => {
   const { name, body, code } = obj.entry;
   return (
      <div key={"i-" + code}>
         <div style={entryWrapper}>
            <div style={entryTitle} onClick={() => tog(code)}>
               {name}
            </div>
            <div style={entryBody} id={"b-" + code}>
               <pre>{body}</pre>
            </div>
         </div>
      </div>
   );
};

export const SearchResults = (props: SearchResultsProp): any => {
   const { suggest = [] } = props;
   const titles: any = useAppSelector((state) => state.titles);
   //{people.filter(person => person.age < 60).map(filteredPerson => (
   return (
      <>
         <b>Search Results</b>
         {!suggest || !suggest.arr
            ? null
            : suggest.arr.map((t: any) => (
                 <Display entry={t} key={"kk-" + t.code} />
              ))}
      </>
   );
};
