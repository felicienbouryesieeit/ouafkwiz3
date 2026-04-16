
import { useEffect, useState } from 'react' //React,
import { supabase } from './createClient.ts';

const Resetpassword = () => {
  useState
   useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
    session
     if (event == "PASSWORD_RECOVERY") {
       const newPassword : any = prompt("What would you like your new password to be?");
       const { data, error } = await supabase.auth
         .updateUser({ password: newPassword })
       if (data) alert("Password updated successfully!")
       if (error) alert("There was an error updating your password.")
     }
   })
 }, [])

  return (
    <div>
      reset password
    </div>
  );
};

export default Resetpassword;

