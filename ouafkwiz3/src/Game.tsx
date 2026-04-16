import { useState,useEffect } from "react";
import { data } from "react-router-dom";



const Game = ({fetchquestions}: { fetchquestions: () => Promise<string> }) => {
  const [answer_list,setAnswer_list] = useState<string[]>(
    []
  );
  const [buttons, setButtons] = useState(answer_list);
  const [question_data, setQuestion_data] = useState<string>('');
  const [question_index,setQuestion_index] = useState<number>(1);
  const [max_question,setMax_question] = useState<number>(0);
  const [question_string,setQuestion_string] = useState<string>();
  const [isbegin,setisbegin] = useState<boolean>(true);
  const [good_answers_number,setgood_answers_number] = useState<number>(0);
  const [show_screen_mode, setshow_screen_mode] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [seed,setSeed] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.toString().trim()) {
      console.log('Valeur soumise:', inputValue);
      alert(`Vous avez écrit : ${inputValue}`);
    } else {
      alert('Veuillez écrire quelque chose');
    }
  };

  setAnswer_list
  buttons
  setButtons
  data

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchquestions(); // Attendez la résolution de la Promise
        
        begin_data(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      }
    };
    
    loadQuestions();
  }, [fetchquestions]); // Ajoutez fetchquestions comme dépendance




  



  
  const begin_data = (data : string) => {
    if (isbegin==true) {
      setInputValue((Math.floor(Math.random() * 100000) + 1).toString());
      setisbegin(false)
    setQuestion_data(data);
        
    setMax_question(JSON.parse(data).length);


    
  }
  }

  const get_question_string_2 = (data : string) => {
    
    data
    
    //console.log("string",questionstring3)
    let questionstring5 : any = question_string;


    let questionstring2 : any ;
    if (questionstring5) {

    let questionstring4 : any = JSON.parse(questionstring5);
    questionstring2 = JSON.parse(questionstring4[question_index-1].question_string);
  }
    
    return questionstring2;
  }


  const shuffleArray = (array:string[],local_seed : number) => {
    
    const shuffled = [...array];
     // Crée une copie pour ne pas modifier l'original
    //const seed3 : number = seed;
    //console.log('seed :', seed3)
    let seed2 : number = seededRandom(local_seed+question_index);
    
    //console.log('seed 2 :',seed2)
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor( seed2 * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}





  const getquestionstring = (data : string) => {
    let return_string : string = ''; 
    if (data && question_index) {
    return_string  = get_question_string_2(data).question;
  }
    return return_string;
  }

  

  const get_good_anser_string = (data : string) => {
    let return_string : string = ''; 
    if (data && question_index) {
    return_string  = get_question_string_2(data).bonne_reponse;
  }
    return return_string;
  }



  const get_bad_ansers_string = (data : string) => {
    let return_string : string[] = []; 
    if (data && question_index) {
    return_string  = get_question_string_2(data).mauvaises_reponses;
  }
    return return_string;
  }





const getanswerlist = () => {
    let list : string[] = [];
    if (question_data) {
      let local_answer_list : string[] = [];
      local_answer_list = get_bad_ansers_string(question_data);
      let local_good_answer : string = get_good_anser_string(question_data);
      //setgoodanswer(local_good_answer);
      local_answer_list.push(local_good_answer);
      //question = getquestionstring(question_data);
      list = shuffleArray(local_answer_list,seed)
    }
    return list;
  }


  const seededRandom = (seed:number) => {
    let s : number = seed;
        s = (s * 1103515245 + 12345) % 2147483648;
        let s2 : number = (s / 2147483648) * 1;
        return s2;
    
}

const get_score = () => {
  let scorestring = "score "+good_answers_number+"/"+question_index;
  return scorestring
}

const onanswerclick = (answerstring : string,btn:String) => {
  btn
  //let validation : string = 'false'
  console.log("current answer : ",answerstring, "expected answer : ",get_good_anser_string(question_data))
  let local_good_answer_number : number = good_answers_number
  if (answerstring==get_good_anser_string(question_data)) {
    //validation = 'true'
    local_good_answer_number+=1;
  }
  setgood_answers_number(local_good_answer_number);
  
  //changequestiontest()
  setshow_screen_mode(3);
}

const next_question = () => {
  changequestiontest();
}

  const changequestiontest = () => {
    //console.log('index',question_index);
    //max_question
    if (question_index<2) {
    console.log("max question : ",max_question);
    setQuestion_index(question_index+1);
    setshow_screen_mode(1);
    
  } else {
    setshow_screen_mode(2);
    
    console.log("jeu fini");
  }
    /*
    if (question_index==2) {
      setQuestion_index(1);
    } else {
      setQuestion_index(2);
    }*/
  }

  const start_game = () => {
    const local_seed:number = Number(inputValue)
    setSeed(local_seed);
    setshow_screen_mode(1);

    

    let questionstring : any = JSON.parse(question_data);
    //
    
    //console.log("max questions : ",max_question)
    let stringliste : string[] = [];
    questionstring.forEach((question:any) => {
      stringliste.push(JSON.stringify(question));
      
    });

    stringliste = shuffleArray(stringliste,local_seed);

    let questionstring3 : any[] = [];

    stringliste.forEach((question:string) => {
      questionstring3.push(JSON.parse(question));
      
    });

    setQuestion_string(JSON.stringify(questionstring3));

  }


  const go_back = () => {
    //setshow_screen_mode(0);
    location.reload();
  }

  const getquestion = () => {
    let question : string = ''
    
    if (question_data) {
      question = getquestionstring(question_data);
    }
    return question;
  }

  const show_answer = () => {
    let answer_string : string = '';
    answer_string = 'La bonne réponse était : '+get_good_anser_string(question_data);
    return answer_string;
  }

  return (
    <>
      

      <div className="page">
        {(show_screen_mode==1 && <div>


          <div>
          <h1 className="headline">
           {getquestion()}
          </h1>
          <div className="divider" />
        </div>

        <div className="section">

          <div className="btn-list">
            
            {getanswerlist().map((btn,index) => (
              <button onClick={() => onanswerclick(getanswerlist()[index],btn)} className="main-btn" key = {index}>{getanswerlist()[index]}</button>
            ))}
          </div>
        </div>


          
        </div>)}

        {(show_screen_mode==2 && <div>
        
        <h1>
          {get_score()}
        </h1>
        <button onClick={() => go_back()}>Retour</button>
        </div>
        )}
        

        {(show_screen_mode==0 && <div>
          
          <form onSubmit={handleSubmit}>
            <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="seed"
        />
        </div>
        <div>
        <button 
          type="submit"
          onClick={() => start_game()}
        >
          Jouer
        </button>
        </div>
      </form>

        </div>)}
        
        {(show_screen_mode==3 && <div><h1>
          {show_answer()}
         </h1>
          <button onClick={() => next_question()}>Suivant</button>
        </div>)}

        
      </div>
    </>
  );
};

export default Game;






















































