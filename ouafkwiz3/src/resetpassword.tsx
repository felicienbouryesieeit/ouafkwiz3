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











/*







import { useEffect, useState } from 'react';
import { supabase } from './createClient.ts'; //React,
//import React from 'react';
interface User {
  name: string;
    id: number;
}

const Vide2 = () => {
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User>({
    
    name: '',
    id: 0
  })
  console.log(user)


  useEffect(() => {
    fetchUsers()
  }, [])



  async function fetchUsers(): Promise<void> {
    const { data} = await supabase
      .from('users')
      .select('*');

    setUsers(data as User[] || []);
    
  }


  async function createUser(): Promise<void> {
    await supabase
      .from('users')
      .insert({ name: user.name })
      
  }


  function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser(prevFormData=>{return{...prevFormData,
      [event.target.name]: event.target.value
    }})}


    const test = () => {
      console.log("users doudou : ",users);
      return users
    }
  return (
  <div>
    <div>
      {users.map(user => (
        <div key={user.id}>
          <div>{user.name}  </div>
        </div>
      ))}
    </div>
  </div>
    
  )

}

export default Vide2;

/*



  /*
  
    <form onSubmit={createUser}>
      <input type="text" placeholder="name" name="name" onChange={handlechange}/>
      <input type="email" placeholder="Email" />
      <button type='submit'>Ajouter</button>
    </form>
    <div>
      {users.map(user => (
        <div key={user.id}>
          <div>{user.name}  </div>
        </div>
      ))}
    </div>
  <div>
    
    
    
    
    
    
    </div>
  
  */
