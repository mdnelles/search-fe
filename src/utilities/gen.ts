export const sqlPrep = (s: string): string => {
   s = s.replace(/'/gi, "`");
   s = s.replace(/"/gi, '\\"');
   s = s.replace(/</g, "&lt;"); //for <
   s = s.replace(/>/g, "&gt;"); //for >

   return s;
};
