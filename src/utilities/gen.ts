export const sqlPrep = ({ s }: { s: any }): string => {
   s = s.replace(/'/gi, "`");
   s = s.replace(/"/gi, '\\"');
   s = s.replace(/</g, "&lt;"); //for <
   s = s.replace(/>/g, "&gt;"); //for >

   return s;
};

export const rand = (): string => {
   const length = 20;
   for (
      var s = "";
      s.length < length;
      s +=
         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
            (Math.random() * 62) | 0
         )
   );
   return s;
};
