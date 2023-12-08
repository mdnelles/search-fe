import react, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { setSuggest } from "../../features/suggest/suggestSlice";

import {
   AutoCompleteContainer,
   Input,
   AutoCompleteItem,
   AutoCompleteItemButton,
} from "./styles";
const Root = styled.div`
   position: relative;
   width: 80%;
`;

interface autoCompleteProps {
   iconColor?: string;
   inputStyle?: react.CSSProperties;
   optionsStyle?: react.CSSProperties;

   data: any[];
}
export const AutoComplete: FC<autoCompleteProps> = ({
   inputStyle,
   optionsStyle,
   data,
}) => {
   //const suggest: any = useAppSelector((state) => state.suggest);
   const dispatch = useAppDispatch();
   const [search, setSearch] = useState({
      text: "",
      suggestions: [],
   });

   const [isComponentVisible, setIsComponentVisible] = useState(true);
   const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let suggestions: any = [];
      if (value.length > 0) {
         suggestions = data
            .sort()
            .filter((v: any) =>
               v.subject
                  ? v.subject
                       .toString()
                       .toUpperCase()
                       .includes(value.toString().toUpperCase())
                  : ""
            );
         dispatch(
            setSuggest({
               arr: suggestions,
            })
         );
      }
      setIsComponentVisible(true);
      setSearch({ suggestions, text: value });
   };

   const suggestionSelected = (value: any) => {
      setIsComponentVisible(false);

      setSearch({
         text: value.subject,
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
         <div style={{ position: "absolute", left: -2000 }}>
            {suggestions.length > 0 && isComponentVisible && (
               <AutoCompleteContainer style={optionsStyle}>
                  {suggestions.map((item: any) => (
                     <AutoCompleteItem key={item._id}>
                        <AutoCompleteItemButton
                           key={"i" + item._id}
                           onClick={() => suggestionSelected(item)}
                        >
                           {item.subject}
                        </AutoCompleteItemButton>
                     </AutoCompleteItem>
                  ))}
               </AutoCompleteContainer>
            )}
         </div>
      </Root>
   );
};
