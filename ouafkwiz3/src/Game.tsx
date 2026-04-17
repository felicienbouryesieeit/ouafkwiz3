import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Game = ({ fetchquestions }: { fetchquestions: () => Promise<string> }) => {
  
  const [question_data, setQuestion_data] = useState<string>("");
  const [question_index, setQuestion_index] = useState<number>(1);
  const [max_question, setMax_question] = useState<number>(0);
  max_question
  const [question_string, setQuestion_string] = useState<string>();
  const [isbegin, setisbegin] = useState<boolean>(true);
  const [good_answers_number, setgood_answers_number] = useState<number>(0);
  const [show_screen_mode, setshow_screen_mode] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [seed, setSeed] = useState<number>(0);
  const { seed_url } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (isbegin==true) {
        const data = await fetchquestions();
        begin_data(data);
      }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      }
    };

    loadQuestions();
  }, [fetchquestions]);

  const begin_data = (data: string) => {
    if (isbegin == true) {
      let localinputvalue : number = Number(seed_url);

      if (localinputvalue==0) {
        localinputvalue = (Math.floor(Math.random() * 100000) + 1);
      }
      
      
      
      setInputValue(localinputvalue.toString());
      setisbegin(false);
      setQuestion_data(data);
      setMax_question(JSON.parse(data).length);
    }
  };

  const get_question_string_2 = (data: string) => {
    data
    let questionstring5: any = question_string;
    let questionstring2: any;

    if (questionstring5) {
      let questionstring4: any = JSON.parse(questionstring5);
      questionstring2 = JSON.parse(questionstring4[question_index - 1].question_string);
    }

    return questionstring2;
  };

  const shuffleArray = (array: string[], local_seed: number) => {
    const shuffled = [...array];
    let seed2: number = seededRandom(local_seed + question_index);

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seed2 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getquestionstring = (data: string) => {
    let return_string: string = "";
    if (data && question_index) {
      return_string = get_question_string_2(data).question;
    }
    return return_string;
  };

  const get_good_anser_string = (data: string) => {
    let return_string: string = "";
    if (data && question_index) {
      return_string = get_question_string_2(data).bonne_reponse;
    }
    return return_string;
  };

  const get_bad_ansers_string = (data: string) => {
    let return_string: string[] = [];
    if (data && question_index) {
      return_string = get_question_string_2(data).mauvaises_reponses;
    }
    return return_string;
  };

  const getanswerlist = () => {
    let list: string[] = [];
    if (question_data) {
      let local_answer_list: string[] = [];
      local_answer_list = get_bad_ansers_string(question_data);
      let local_good_answer: string = get_good_anser_string(question_data);
      local_answer_list.push(local_good_answer);
      list = shuffleArray(local_answer_list, seed);
    }
    return list;
  };

  const seededRandom = (seed: number) => {
    let s: number = seed;
    s = (s * 1103515245 + 12345) % 2147483648;
    let s2: number = (s / 2147483648) * 1;
    return s2;
  };

  const get_score = () => {
    let scorestring = "score " + good_answers_number + "/" + question_index;
    return scorestring;
  };

  const onanswerclick = (answerstring: string,btn:string) => {
    btn
    let local_good_answer_number: number = good_answers_number;
    if (answerstring == get_good_anser_string(question_data)) {
      local_good_answer_number += 1;
    }
    setgood_answers_number(local_good_answer_number);
    setshow_screen_mode(3);
  };

  const next_question = () => {
    changequestiontest();
  };

  const changequestiontest = () => {
    if (question_index < 10) {
      setQuestion_index(question_index + 1);
      setshow_screen_mode(1);
    } else {
      setshow_screen_mode(2);
    }
  };

  const start_game = () => {
    const local_seed: number = Number(inputValue);
    setSeed(local_seed);
    setshow_screen_mode(1);

    let questionstring: any = JSON.parse(question_data);
    let stringliste: string[] = [];
    questionstring.forEach((question: any) => {
      stringliste.push(JSON.stringify(question));
    });

    stringliste = shuffleArray(stringliste, local_seed);

    let questionstring3: any[] = [];
    stringliste.forEach((question: string) => {
      questionstring3.push(JSON.parse(question));
    });

    setQuestion_string(JSON.stringify(questionstring3));
  };

  const go_back = () => {
    window.location.href = "/ouafkwiz/Game/0";
  };

  const getquestion = () => {
    let question: string = "";
    if (question_data) {
      question = getquestionstring(question_data);
    }
    return question;
  };

  const show_answer = () => {
    let answer_string: string = "";
    answer_string = "La bonne réponse était : " + get_good_anser_string(question_data);
    return answer_string;
  };

  const copy_url = async () => {
    let myUrl = window.location.href;
    let url = new URL(myUrl);
    if (inputValue) {
    let pathParts = url.pathname.split('/');
    pathParts[pathParts.length - 1] = inputValue;
    url.pathname = pathParts.join('/');
    let modifiedUrl = url.toString();
    await navigator.clipboard.writeText(modifiedUrl);
    alert('url copiée')
    }
  }

  return (
    <>
      <div className="page">
        {show_screen_mode == 1 && (
          <div>
            <div>
              <h1 className="headline">{getquestion()}</h1>
              <div className="divider" />
            </div>

            <div className="section">
              <div className="btn-list">
                {getanswerlist().map((btn, index) => (
                  <button onClick={() => onanswerclick(getanswerlist()[index],btn)} className="main-btn" key={index}>
                    {getanswerlist()[index]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {show_screen_mode == 2 && (
          <div>
            <h1>{get_score()}</h1>
            <button onClick={() => go_back()}>Retour</button>
          </div>
        )}

        {show_screen_mode == 0 && (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="seed"
                />
                <button onClick={() => copy_url()}>copier l'url</button>
              </div>
              <div>
                <button type="submit" onClick={() => start_game()}>
                  Jouer
                </button>
              </div>
            </form>
          </div>
        )}

        {show_screen_mode == 3 && (
          <div>
            <h1>{show_answer()}</h1>
            <button onClick={() => next_question()}>Suivant</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
