
import { useEffect, useState } from 'react' //React,
import { supabase } from './createClient.ts';

const Resetpassword = () => {
  useState
   useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
    session
     if (event == "PASSWORD_RECOVERY") {
       const newPassword : any = prompt("Choisissez un nouveau mot de passe :");
       const { data, error } = await supabase.auth
         .updateUser({ password: newPassword })
       if (data) alert("Password mis à jour!")
       if (error) alert("Il y à eu une erreur en mettant votre mot de passe à jour.")
     }
   })
 }, [])

  return (
    <div>
    </div>
  );
};

export default Resetpassword;

