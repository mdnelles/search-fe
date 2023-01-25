export const sqlPrep = (s: FormDataEntryValue | null | string): string => {
   try {
      s === null ? (s = "") : (s = s.toString());

      s = s.replace(/'/gi, "`");
      s = s.replace(/"/gi, '\\"');
      s = s.replace(/</g, "&lt;"); //for <
      s = s.replace(/>/g, "&gt;"); //for >

      return s;
   } catch (error) {
      console.log(error);
      return "";
   }
};

export const rand = (): string => {
   let text = "";
   const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (let i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
};

export const randNum = (digits: number): string => {
   const trueDigits = digits ? digits : 10;
   let text = "";
   const possible = "0123456789";

   for (let i = 0; i < trueDigits; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
};
