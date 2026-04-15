import { useState,useEffect } from "react";



const Game = ({fetchquestions}: { fetchquestions: () => Promise<string> }) => {
  const [answer_list,setAnswer_list] = useState<string[]>(
    ['a','b','c','d']
  );
  const [buttons, setButtons] = useState(answer_list);
  const [question_data, setQuestion_data] = useState<string>('');
  const [question_index,setQuestion_index] = useState<number>(1);
  




  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchquestions(); // Attendez la résolution de la Promise
        setQuestion_data(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      }
    };
    
    loadQuestions();
  }, [fetchquestions]); // Ajoutez fetchquestions comme dépendance



  const get_question_string_2 = (data : string) => {
    let questionstring : any = JSON.parse(data);
    
    let questionstring2 : any = JSON.parse(questionstring[question_index-1].question_string);
    
    return questionstring2;
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









  const changequestiontest = () => {
    //console.log('index',question_index);
    if (question_index==2) {
      setQuestion_index(1);
    } else {
      setQuestion_index(2);
    }
  }

  const getquestion = () => {
    let question : string = ''
    
    if (question_data) {
      question = getquestionstring(question_data);
    }
    return question;
  }

  const getanswerlist = () => {
    let list : string[] = [];
    if (question_data) {
      let local_answer_list : string[] = [];
      local_answer_list = get_bad_ansers_string(question_data);
      local_answer_list.push(get_good_anser_string(question_data));
      //question = getquestionstring(question_data);
      list = local_answer_list
    }
    return list;
  }

  return (
    <>
      

      <div className="page">
        <div className="hero">
          <h1 className="headline">
           {getquestion()}
          </h1>
          <div className="divider" />
        </div>

        <div className="section">

          <div className="btn-list">
            
            {getanswerlist().map((btn,index) => (
              <button onClick={() => changequestiontest()} className="main-btn" key = {index}>{getanswerlist()[index]}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
