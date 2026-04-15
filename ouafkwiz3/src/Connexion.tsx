


import React, { useState,useRef } from 'react';
import TextContainer from './TextContainer.tsx'; /* connectUser */
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
  
  
  
  






  const formcreateuser : any = useRef('');
  const formconnectuser : any = useRef('');
  
  /*
  const sendEmail = (e:any) => {
    
    setConnexionType(3);
    e.preventDefault();
    






    // Récupérer les données du formemailulaire
    const formemailData = new FormData(formemail.current);
    const userEmail = formemailData.get('email'); // Seul l'email vient du formemailulaire
    
    // Préparer les paramètres du template avec des valeurs définies par script
    const templateParams = {
      title: 'Contact depuis le site web', // Titre défini par script
      email: userEmail,
      message: 'code : '+code.toString(), 
      
      // Vous pouvez ajouter plus d'informemailations si nécessaire
      //submission_date: new Date().toLocaleString(),
      //user_agent: navigator.userAgent
    };
    //createUser()



    emailjs
      .send('service_fnvdvmy', 'template_wz0anjj', templateParams, {
        publicKey: 'Fqx8TAT0xBmkXQkNl',
      })
      .then(
        () => {
          console.log('SUCCESS!');

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
*/









  
  
  
  
  
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
  
  
  
  const handlechange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
      //handlechange(event);
      console.log(event.target.value);
  }
  
  
  const [ConnexionType, setConnexionType] = useState(0);

  
    let textcontainer_var : TextContainer = new TextContainer();


    const get_language_int = () => {
    const result : any = get_language();
    return result
  }

  const connect_user  = (e:any) => {
    e.preventDefault();
    const formCheckCodedata = new FormData(formconnectuser.current);
      const local_email = String(formCheckCodedata.get('email')); 
      const local_password = String(formCheckCodedata.get('password')); 
      console.log("naha",local_email,local_password);
      connectUser(local_email,local_password);
      

  }

  
  const create_user = (e:any) => {
    e.preventDefault();
    const formCheckCodedata = new FormData(formcreateuser.current);
      const local_title = String(formCheckCodedata.get('title')); 
      const local_email = String(formCheckCodedata.get('email')); 
      const local_password = String(formCheckCodedata.get('password')); 
      createUser(local_title,local_email,local_password);
      

  }

  const goback = () => {
    setConnexionType(0);
  }
  

  
  return (
    <div>
      
      

      {get_connexion_type()==3 && (
        <div>
      <button onClick={() => logout()}>
        {'log out'}
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

          <form ref={formcreateuser} onSubmit={create_user}>
          <input type="text" name="title" placeholder={textcontainer_var.export_text(get_language_int(),2,3)}/>
          <input type="email" name="email" placeholder={textcontainer_var.export_text(get_language_int(),2,4)}/>
          <input type="text" name="password" placeholder={textcontainer_var.export_text(get_language_int(),2,5)} />
          <input type="submit" value={textcontainer_var.export_text(get_language_int(),2,0)} />
          </form>


          </div>
      )}


      {get_connexion_type()==1 && (
          <div>

        <form ref={formconnectuser} onSubmit={connect_user}>
        <input type="email" placeholder={textcontainer_var.export_text(get_language_int(),2,4)}  name="email"  onChange={handlechange2}/>
        <input type="mot de passe" placeholder={textcontainer_var.export_text(get_language_int(),2,5)} name="password" />
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




/*
          <label>Message</label>
          <textarea name="message" />y


   <form onSubmit={createUser}>
        <input type="text" placeholder="name" name="name" onChange={handlechange}/>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="mot de passe" />
        <button type='submit'>{textcontainer_var.export_text(get_language_int(),2,0)}</button>
        </form>








*/