import react, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
   AutoCompleteContainer,
   AutoCompleteIcon,
   Input,
   AutoCompleteItem,
   AutoCompleteItemButton,
} from "./styles";
const Root = styled.div`
   position: relative;
   width: 80%;
`;

interface IData {
   name: string;
   code: string;
}
interface autoCompleteProps {
   iconColor?: string;
   inputStyle?: react.CSSProperties;
   optionsStyle?: react.CSSProperties;

   data: any[];
}
export const AutoComplete: FC<autoCompleteProps> = ({
   iconColor,
   inputStyle,
   optionsStyle,
   data,
}) => {
   const [search, setSearch] = useState({
      text: "",
      suggestions: [],
   });
   const [isComponentVisible, setIsComponentVisible] = useState(true);
   const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let suggestions: any = [];
      if (value.length > 0) {
         const regex = new RegExp(`^${value}`, "i");
         suggestions = data.sort().filter((v: IData) => regex.test(v.name));
      }
      setIsComponentVisible(true);
      setSearch({ suggestions, text: value });
   };

   const suggestionSelected = (value: IData) => {
      setIsComponentVisible(false);
      console.log("------value-----");
      console.log(value);

      setSearch({
         text: value.name,
         suggestions: [],
      });
   };

   const { suggestions } = search;

   return (
      <Root>
         <div
            onClick={() => setIsComponentVisible(false)}
            style={{
               display: isComponentVisible ? "block" : "none",
               width: "90%",
               height: "200vh",
               backgroundColor: "transparent",
               position: "fixed",
               zIndex: 0,
               top: 0,
               left: 0,
            }}
         />
         <div>
            <Input
               id='input'
               autoComplete='off'
               value={search.text}
               onChange={onTextChanged}
               type={"text"}
               style={inputStyle}
            />
         </div>
         {suggestions.length > 0 && isComponentVisible && (
            <AutoCompleteContainer style={optionsStyle}>
               {suggestions.map((item: IData) => (
                  <AutoCompleteItem key={item.code}>
                     <AutoCompleteItemButton
                        key={item.code}
                        onClick={() => suggestionSelected(item)}
                     >
                        {item.name}
                     </AutoCompleteItemButton>
                  </AutoCompleteItem>
               ))}
            </AutoCompleteContainer>
         )}
      </Root>
   );
};
