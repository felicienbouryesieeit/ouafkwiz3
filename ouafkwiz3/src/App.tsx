import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Game from "./Game.tsx";
import Vide3 from "./Vide3.tsx";
import Connexion from "./Connexion.tsx";
import { supabase } from "./createClient.ts";
import TextContainer from "./TextContainer.tsx";
import Resetpassword from "./resetpassword.tsx";
import About from "./About.tsx";

interface User {
  name: string;
  id: number;
  created_at: string;
}

interface question {
  id: number;
  created_at: string;
  question_string: string;
}

function App() {
  let textcontainer_var: TextContainer = new TextContainer();
  const [session, setSession] = useState<any>(null);
  const [users] = useState<User[]>([]);
  const [questions,setQuestions] = useState<question[]>([]);
  questions
  const [user, setUser] = useState<User>({
    name: "",
    id: 0,
    created_at: "",
  });
  user
  const [LangageInt, setLangageInt] = useState(1);
  const [TextIndex] = useState(0);
  const [isstarting, setIsstarting] = useState(true);

  
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
    const { data } = await supabase.from("questions").select("*");
    const data2: any = data;
    const data3: string = JSON.stringify(data2);
    setQuestions(data as question[] || []);
    return data3;
  }

  const getusername = () => {
    let username: string = textcontainer_var.export_text(LangageInt, TextIndex, 3);
    if (get_token()) {
      username = getusername2();
    }
    return username;
  };

  const getusername2 = () => {
    return session?.user?.user_metadata?.first_name ?? "";
  };

  const get_token = () => {
    return session?.access_token ?? "";
  };



  const setLangageInt2 = (local_int: number) => {
    setLangageInt(local_int);
    localStorage.setItem("language", local_int.toString());
  };

  const begin = () => {
    if (isstarting) {
      setIsstarting(false);
      setLangageInt2(Number(localStorage.getItem("language") || "0"));
    }
  };
  begin();

  function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function resetpassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail("felicienboury@gmail.com", {
      redirectTo: "https://ouafkwiz3.vercel.app/ouafkwiz/resetpassword",
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

  async function createUser(local_name: string, local_email: string, local_password: string): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: local_email,
        password: local_password,
        options: {
          data: {
            first_name: local_name,
          },
        },
      });
      data;
      if (error) {
        alert(error);
        console.error(error);
        return;
      }

      alert("Vérifiez votre boite mail.");
    } catch (error) {
      console.error(error);
    }
  }

  async function connectUser(local_email: string, local_password: string): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: local_email,
        password: local_password,
      });

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
    return users;
  };

  const get_language = () => {
    return LangageInt;
  };

  const testclick = () => {
    test();
    return users;
  };

  const testclick2 = () => {
    test();
    return users;
  };



  return (
    <BrowserRouter>
      <header>
        <nav className="navbar">
          <Link to="/" className="navbar-button">
            {textcontainer_var.export_text(LangageInt, TextIndex, 0)}
          </Link>
          <Link to="/ouafkwiz/Connexion" className="navbar-button">
            {getusername()}
          </Link>
          <Link to="/ouafkwiz/About" className="navbar-button">
            À propos
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Accueil get_language={get_language} />} />
          <Route path="/ouafkwiz/Game/:seed_url" element={<Game fetchquestions={fetchquestions} />} />
          <Route
            path="/ouafkwiz/Connexion"
            element={
              <Connexion
                get_language={get_language}
                connectUser={connectUser}
                createUser={createUser}
                handlechange={handlechange}
                get_token={get_token}
                logout={logout}
                resetpassword={resetpassword}
              />
            }
          />
          <Route path="/Vide3" element={<Vide3 onClickFunc={testclick} onClickFunc2={testclick2} />} />
          <Route path="/ouafkwiz/resetpassword" element={<Resetpassword />} />
          <Route path="/ouafkwiz/about" element={<About />} />
        </Routes>
      </header>
    </BrowserRouter>
  );
}

const Accueil = ({ get_language }: { get_language: () => void }) => {
  let textcontainer_var: TextContainer = new TextContainer();
  const get_language_int = () => {
    const result: any = get_language();
    return result;
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="chip-crypt"></div>
      <div>
        <button className="play-button" onClick={() => navigate("/ouafkwiz/Game/11")}>
          {textcontainer_var.export_text(get_language_int(), 0, 2)}
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default App;
