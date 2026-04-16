const About = () => {
  return (
    <div>
        <h1 className="headline">
           Ouafkwiz ! 
        </h1>
          <div className="about">
            Ouafkwiz est un site web permettant de jouer à des quizz de culture générale générés aléatoirements. Affrontez vos amis au cours de parties endiablées pour savoir lequel d'entre vous possède les meilleurs connaissances en histoire, en géographie, et sur plein d'autres thématiques !
          </div>

        <h1 className="headline">
           Les seeds ?
        </h1>

        <div className="about">
            Lorsque vous voulez lancer une partie de Ouafkwiz, il y a un nombre aléatoire qui apparait au dessus du bouton "jouer". Il s'agit de la seed du quiz. Elle détermine l'aléatoire du choix des questions que vous vous appretez à avoir. Vous pouvez copier cette seed et la partager à vos amis afin de vous affronter sur le même quiz, puis de partager vos scores !
          </div>


    </div>
  );
};

export default About;