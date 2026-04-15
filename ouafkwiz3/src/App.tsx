import { useEffect, useState } from 'react' //React,
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Game from './Game.tsx';
import Vide3 from './Vide3.tsx';
import Connexion from './Connexion.tsx';
import { supabase } from './createClient.ts';
import TextContainer from './TextContainer.tsx';
import Resetpassword from './resetpassword.tsx';
//import ContactUs from './ContactUs.tsx';
import Comments from './Comments.tsx';

interface User {
  name: string;
    id: number;
    created_at : string;
}

interface Comment {
  comment: string;
    id: number;
    created_at : string;
    name : string;
}

function App() {
  let textcontainer_var : TextContainer = new TextContainer();
  const [token,setToken] = useState('');
  const [users, setUsers] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [user, setUser] = useState<User>({
    
    name: '',
    id: 0,
    created_at:''
  })
  user
  setUser
  setUsers
  const [LangageInt,setLangageInt] = useState(0);
  const [TextIndex,setTextIndex] = useState(0);
  const [isstarting,setIsstarting] = useState(true);
  

  setTextIndex

  useEffect(()=>{
    const token2 = sessionStorage.getItem('token')
    if (token2) {
      //let data2 = 
      setToken(token2);
      console.log("bandito");
      console.log(JSON.parse(token2));
      //let data : any = JSON.parse(token2)

      
    }
  },[])

  const getusername = () => {
    let username :string = textcontainer_var.export_text(LangageInt,TextIndex,3);
    if (get_token()) {
      username = getusername2();
      //console.log("username : ", username);
    }
    return username;
  }

  const getusername2 = () => {
    let username :string = JSON.parse(token).user.user_metadata.first_name;
    return username;
  }

  const get_token = () => {
    
    return token;
  }


  const isconnected = () => {
    let isconnectedvar : boolean = false;
    if (token) {
      isconnectedvar = true;
    }
    return isconnectedvar;
  }

  isconnected


  
  


  const change_Langage = () => {
    let local_int = LangageInt;
    
    local_int+=1;

    if (local_int==2) {
      local_int=0
    }
    setLangageInt2(local_int);
  }

  const setLangageInt2 = (local_int:number) => {
    
    setLangageInt(local_int);
    localStorage.setItem("language",local_int.toString());
  }


  const getcomments = () => {
    return comments;
  }
  
  const begin = () => {
    if (isstarting) {
      setIsstarting(false);
      setLangageInt2(Number(localStorage.getItem('language')||'0'))
    }
  }
  begin()

  //console.log(user)

/*
  useEffect(() => {
    fetchUsers()
  }, [])*/


  useEffect(() => {
    fetchcomments()
  }, [])

  function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser(prevFormData=>{return{...prevFormData,
      [event.target.name]: event.target.value
    }})}

  /*
  async function fetchUsers(): Promise<void> {
    const { data} = await supabase
      .from('users')
      .select('*');

    setUsers(data as User[] || []);
    
  }*/



  async function fetchcomments(): Promise<void> {
    
    const {data} = await supabase
      .from('comments')
      .select('*');

    setComments(data as Comment[] || []);
    
  }


async function resetpassword() {
  
  const { data, error } = await supabase.auth.resetPasswordForEmail('felicienboury@gmail.com', {
    redirectTo: 'https://poker-vite-ts.vercel.app/poker_vite_ts/resetpassword'
  });
  if (data) {
    alert("check your email");
  }

  if (error) {
    alert(error);
    console.error(error);
  }
}

async function logout() {
  try {
  const { error } = await supabase.auth.signOut()
  sessionStorage.removeItem('token');
  location.reload();
  if (error) {
      alert(error)
      console.error(error);
      return;
    }

  }
  catch (error) {
    console.error(error);
  }
}





async function createUser(local_name : string,local_email : string,local_password : string): Promise<void> {
  
    try {
    const { data, error } = await supabase.auth.signUp(
  {
    
    email: local_email,
    password: local_password,
    options: {
      data: {
        first_name: local_name,
      }
    }
  }
)
  data
    if (error) {
      alert(error)
      console.error(error);
      return;
    }
    
    alert("success")
    //console.log(data);
    //await fetchUsers();
  } catch (error) {
    console.error(error);
  }



  
  
}














async function connectUser(local_email : string,local_password : string): Promise<void> {
      
    try {
    const { data, error } = await supabase.auth.signInWithPassword({
  email: local_email,
  password: local_password,
})

    if (error) {
      alert(error)
      console.error(error);
      return;
    }
    
    alert("success")
    console.log(data);
    sessionStorage.setItem('token',JSON.stringify(data));
    location.reload();

    //await fetchUsers();
  } catch (error) {
    console.error(error);
  }



  
  
}























  async function createcomment(local_comment : string): Promise<void> {

    //event: React.FormEvent<HTMLFormElement>
    
    
    try {
    const { data, error } = await supabase
      .from('comments')
      .insert({ 
        comment: local_comment 
      ,name: JSON.parse(token).user.user_metadata.first_name
      })/*user.name*/
      .select();
    
    if (error) {
      console.error(error);
      return;
    }
    
    console.log(data);
    await fetchcomments();
  } catch (error) {
    console.error(error);
  }
  
  }
  createcomment

    const test = () => {
      //console.log("users doudou : ",users);
      return users
    }
  const get_language = () =>{
    return LangageInt;
  }



  const testclick = () => {
    test();
    return users
  }
  
  const testclick2 = () => {
    test();
    return users
  }
  
//<Vide3 onClickFunc={testclick}></Vide3>
  const get_language_string = () => {
    let language_emoji = ""
    switch (LangageInt) {
      case 0 : language_emoji = "🇬🇧"; break;
      case 1 : language_emoji = "🇫🇷"; break;
    }
    return language_emoji;
  }
  // className='language-button'
  return (
    <BrowserRouter>
      <header>
        
        <nav className ="navbar">
          <Link to="/" className ="navbar-button">
            {textcontainer_var.export_text(LangageInt,TextIndex,0)}
          </Link>
          <Link to="/poker_vite_ts/Game" className ="navbar-button">
            {textcontainer_var.export_text(LangageInt,TextIndex,1)}
          </Link>
          <Link to="/poker_vite_ts/ContactUs" className ="navbar-button">
            {'Comments'}
          </Link>
          <Link to="/poker_vite_ts/Connexion" className ="navbar-button">
            {getusername()}
          </Link>
          
          <button onClick={change_Langage} className='language-button'>{get_language_string()}​</button>
        </nav>
        
        
        <Routes>
          <Route path="/" element={<Accueil get_language={get_language}/>} />
          <Route path="/poker_vite_ts/Game" element={<Game/>} />

          <Route path="/poker_vite_ts/ContactUs" element={<Comments createcomment={createcomment} getcomments={getcomments} get_token={get_token}
          />} />

          <Route path="/poker_vite_ts/Connexion" element={<Connexion
          get_language={get_language} connectUser={connectUser} createUser={createUser} handlechange={handlechange} get_token={get_token} logout={logout} resetpassword={resetpassword}
          />} />
          <Route path="/Vide3" element={<Vide3 
          onClickFunc={testclick}
          onClickFunc2={testclick2}/>} />
          <Route path="/poker_vite_ts/resetpassword" element={<Resetpassword/>} />
          
        </Routes>


      </header>


    </BrowserRouter>
    
  );
}

// Composant Accueil (page par défaut)
const Accueil = ({ get_language}: { get_language: () => void}) => {
  
  let textcontainer_var : TextContainer = new TextContainer();
  const get_language_int = () => {
    const result : any = get_language();
    return result
  }

  const navigate = useNavigate();
  return (
  <div>
  
  <div className='chip-crypt'></div>
  <div><button className='play-button' onClick={() => navigate('/poker_vite_ts/Game')}>{textcontainer_var.export_text(get_language_int(),0,2)}</button></div>
  
  
    
  <div>
  </div>
    </div>
    
  )

}

export default App


/*

  code vide2 et vide3



  
          <Link to="/Vide2" className ="navbar-button">
            Vide 2
          </Link>
          <Link to="/Vide3" className ="navbar-button">
            Vide 3
          </Link>






  CODE DU GET ET DU POST 





    <form onSubmit={createUser}>
      <input type="text" placeholder="name" name="name" onChange={handlechange}/>
      <input type="email" placeholder="Email" />
      <button type='submit'>Ajouter</button>
    </form>
    <div>
      {users.map(user => (
        <div key={user.id}>
          <div>{user.name} {user.created_at} </div>
        </div>
      ))}
    </div>
    
    */