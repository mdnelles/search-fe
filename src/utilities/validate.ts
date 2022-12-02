export const isValidEmail = (email: FormDataEntryValue | null | string) => {
   return email === null
      ? ""
      : String(email)
           .toLowerCase()
           .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           );
};

export const isValidPassword = (
   password: FormDataEntryValue | null | string
) => {
   try {
      return password === null
         ? ""
         : password.toString().length > 2
         ? true
         : false;
   } catch (err) {
      return false;
   }
};

export const isValidSession = (session: string | any) =>
   !!session && !!session.user && session.user.token ? true : false;
