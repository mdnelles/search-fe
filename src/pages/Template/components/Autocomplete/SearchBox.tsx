import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { AutoComplete } from "./AutoComplete";

interface TitleType {
   id: number;
   title: string;
   date1?: string;
}

export const SearchBox = (): any => {
   const titles: TitleType[] | [] = useAppSelector((state) => state.titles.arr);
   const [options, optionsSet] = useState([{ name: "init", code: 0 }]);
   let tmp: any = [];

   titles.map((t) => {
      let { id, title } = t;
      tmp.push({ name: title, code: id });
   });
   try {
      if (tmp.length !== options.length) optionsSet(tmp);
   } catch (error) {
      console.log(error);
   }
   return (
      <>
         <AutoComplete
            inputStyle={{ backgroundColor: "#eee" }}
            optionsStyle={{ backgroundColor: "#ddd" }}
            data={options}
            iconColor='#555'
         />
      </>
   );
};
