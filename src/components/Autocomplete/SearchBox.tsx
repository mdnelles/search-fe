import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { AutoComplete } from "./AutoComplete";

interface TitleType {
   _id: string;
   id: number | never;
   title: string;
   date: string;
   code: string;
}

interface OptionsType {
   _id: string;
   subject: string;
   code: string;
}

export const SearchBox = (): any => {
   const titles: TitleType[] | [] = useAppSelector(
      (state: any) => state.titles.arr
   );
   const [options, optionsSet] = useState<OptionsType[] | []>([
      { _id: "", subject: "", code: "" },
   ]);
   const tmp: OptionsType[] = [];

   try {
      titles.map((t) => {
         const { _id, title, code } = t;
         tmp.push({ _id, subject: title, code });
      });
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
