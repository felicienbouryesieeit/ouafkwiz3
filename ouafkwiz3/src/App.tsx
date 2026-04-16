import { useEffect, useState } from 'react' //React,
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Game from './Game.tsx';
import Vide3 from './Vide3.tsx';
import Connexion from './Connexion.tsx';
import { supabase } from './createClient.ts';
import TextContainer from './TextContainer.tsx';
import Resetpassword from './resetpassword.tsx';

interface User {
  name: string;
    id: number;
    created_at : string;
}

interface question {
  
    id: number;
    created_at : string;
    question_string : string;
}

function App() {
  let textcontainer_var : TextContainer = new TextContainer();
  const [session, setSession] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([])
  const [questions, setQuestions] = useState<question[]>([])
  const [user, setUser] = useState<User>({
    
    name: '',
    id: 0,
    created_at:''
  })
  user
  setUser
  setUsers
  questions
  const [LangageInt,setLangageInt] = useState(1);
  const [TextIndex,setTextIndex] = useState(0);
  const [isstarting,setIsstarting] = useState(true);
  

  setTextIndex

  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);






  async function fetchquestions(): Promise<string> {
    
    const {data} = await supabase
      .from('questions')
      .select('*');
    const data2 : any = data;
    const data3 : string = JSON.stringify(data2);
    setQuestions(data as question[] || []);
    return data3;
    
  }





  const getusername = () => {
    let username :string = textcontainer_var.export_text(LangageInt,TextIndex,3);
    if (get_token()) {
      username = getusername2();
      //console.log("username : ", username);
    }
    return username;
  }

  const getusername2 = () => {
    return session?.user?.user_metadata?.first_name ?? '';
  }

  const get_token = () => {
    return session?.access_token ?? '';
  }


  const isconnected = () => {
    return Boolean(session);
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
  change_Langage

  const setLangageInt2 = (local_int:number) => {
    
    setLangageInt(local_int);
    localStorage.setItem("language",local_int.toString());
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




async function resetpassword() {
  
  const { data, error } = await supabase.auth.resetPasswordForEmail('felicienboury@gmail.com', {
    redirectTo: 'https://ouafkwiz3.vercel.app/ouafkwiz/resetpassword'
    
    
  });
  if (data) {
    alert("Vérifiez votre boite mail.");
  }

  if (error) {
    alert(error);
    console.error(error);
  }
}

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    setSession(null);
    if (error) {
      alert(error.message ?? error);
      console.error(error);
      return;
    }
  } catch (error) {
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
    
    alert("Vérifiez votre boite mail.")
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
      alert(error.message ?? error);
      console.error(error);
      return;
    }
    
    alert("success");
    setSession(data.session);
  } catch (error) {
    console.error(error);
  }



  
  
}






















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
  get_language_string
  // className='language-button'
  return (
    <BrowserRouter>
      <header>
        
        <nav className ="navbar">
          <Link to="/" className ="navbar-button">
            {textcontainer_var.export_text(LangageInt,TextIndex,0)}
          </Link>
          <Link to="/ouafkwiz/Game" className ="navbar-button">
            {textcontainer_var.export_text(LangageInt,TextIndex,1)}
          </Link>
          <Link to="/ouafkwiz/Connexion" className ="navbar-button">
            {getusername()}
          </Link>
          <Link to="/ouafkwiz/resetpassword" className ="navbar-button">
            {"resetpassword"}
          </Link>
          </nav>
        
        
        <Routes>
          <Route path="/" element={<Accueil get_language={get_language}/>} />
          <Route path="/ouafkwiz/Game" element={<Game fetchquestions={fetchquestions}/>} />

          <Route path="/ouafkwiz/Connexion" element={<Connexion
          get_language={get_language} connectUser={connectUser} createUser={createUser} handlechange={handlechange} get_token={get_token} logout={logout} resetpassword={resetpassword}
          />} />
          <Route path="/Vide3" element={<Vide3 
          onClickFunc={testclick}
          onClickFunc2={testclick2}/>} />
          <Route path="/ouafkwiz/resetpassword" element={<Resetpassword/>} />
          
        </Routes>


      </header>


    </BrowserRouter>
    
  );
}


/*


          
          <button onClick={change_Langage} className='language-button'>{get_language_string()}​</button>
        
*/
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
  <div><button className='play-button' onClick={() => navigate('/ouafkwiz/Game')}>{textcontainer_var.export_text(get_language_int(),0,2)}</button></div>
  
  
    
  <div>
  </div>
    </div>
    
  )

}

export default App

