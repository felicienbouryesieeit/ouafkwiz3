


import React, { useState, useRef } from 'react';
import TextContainer from './TextContainer.tsx';
//import emailjs from '@emailjs/browser';


const Connexion = ({ get_language, connectUser, createUser, handlechange, get_token,logout,resetpassword}: { get_language: () => void,connectUser :(local_email : string,local_password : string) => void,createUser: (local_name : string,local_email : string,local_password : string) => void, handlechange : (event: React.ChangeEvent<HTMLInputElement>) => void,get_token: () => string,logout: () => void,resetpassword:()=>void}) => {
    
  
  
  
  const [isstarting,setIsstarting] = useState(true);
  
  
  /*event: React.FormEvent<HTMLFormElement> */
  
  
  
  
  
  
  handlechange
  
  const begin = () => {
    if (isstarting) {
      setIsstarting(false);
      
    }
  }
  begin()
  
  
  
  






  const formCreateUser = useRef<HTMLFormElement | null>(null);
  const formConnectUser = useRef<HTMLFormElement | null>(null);
  
  







  
  
  
  
  
  const isconnected = () => {
    const token2 = get_token();
    let isconnectedbool : boolean = false;
    if (token2) {
      
      isconnectedbool = true;
    }
    return isconnectedbool;
  }
  
  const get_connexion_type = () => {
    
    let connexion_type : number = ConnexionType;
    if (isconnected()) {
      connexion_type = 3;
    }
    return connexion_type;
  }
  
  
  
  const [ConnexionType, setConnexionType] = useState(0);

  
    let textcontainer_var : TextContainer = new TextContainer();


    const get_language_int = () => {
    const result : any = get_language();
    return result
  }

  const connect_user = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formCheckCodedata = new FormData(formConnectUser.current ?? undefined);
    const local_email = String(formCheckCodedata.get('email'));
    const local_password = String(formCheckCodedata.get('password'));
    connectUser(local_email, local_password);
  }

  const create_user = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formCheckCodedata = new FormData(formCreateUser.current ?? undefined);
    const local_title = String(formCheckCodedata.get('title'));
    const local_email = String(formCheckCodedata.get('email'));
    const local_password = String(formCheckCodedata.get('password'));
    createUser(local_title, local_email, local_password);
  }

  const goback = () => {
    setConnexionType(0);
  }
  

  
  return (
    <div>
      
      

      {get_connexion_type()==3 && (
        <div>
      <button onClick={() => logout()}>
        {'se déconnecter'}
      </button>
      </div>
      )}

      {get_connexion_type()==0 && (
        <div>
      <button onClick={() => setConnexionType(1)}>
        {textcontainer_var.export_text(get_language_int(),2,1)}
      </button>
      <button onClick={() => setConnexionType(2)}>
        {textcontainer_var.export_text(get_language_int(),2,0)}
      </button>
      </div>
      )}

        


        {get_connexion_type()==2 && (
          <div>

          <form ref={formCreateUser} onSubmit={create_user}>
            <input type="text" name="title" placeholder={textcontainer_var.export_text(get_language_int(),2,3)} required />
            <input type="email" name="email" placeholder={textcontainer_var.export_text(get_language_int(),2,4)} autoComplete="email" required />
            <input type="password" name="password" placeholder={textcontainer_var.export_text(get_language_int(),2,5)} autoComplete="new-password" minLength={8} required />
            <input type="submit" value={textcontainer_var.export_text(get_language_int(),2,0)} />
          </form>


          </div>
      )}


      {get_connexion_type()==1 && (
          <div>

        <form ref={formConnectUser} onSubmit={connect_user}>
          <input type="email" placeholder={textcontainer_var.export_text(get_language_int(),2,4)} name="email" autoComplete="email" required />
          <input type="password" placeholder={textcontainer_var.export_text(get_language_int(),2,5)} name="password" autoComplete="current-password" required />
          <button type='submit'>{textcontainer_var.export_text(get_language_int(),2,1)}</button>
        </form>
      <button onClick={() => resetpassword()}>
        {textcontainer_var.export_text(get_language_int(),2,2)}
      </button>

          </div>
      )}
      {(get_connexion_type()==1 || get_connexion_type()==2) && (
      <button onClick={() => goback()}>{textcontainer_var.export_text(get_language_int(),2,6)}</button>)}
        
        </div>
  );
};

export default Connexion;
//


