

const Vide3 = ({ onClickFunc, onClickFunc2}: { onClickFunc: () => void, onClickFunc2: () => void  }) => {

  const pipi = () => {
    const result : any = onClickFunc();
    console.log(result[0].name)
  }


  
  const pipi2 = () => {
    const result : any = onClickFunc2();
    console.log(result[0].name)
  }
  pipi2


  return (
    <div>
      <button onClick={pipi}>
        click me
      </button>
    </div>
  );
};

export default Vide3;















