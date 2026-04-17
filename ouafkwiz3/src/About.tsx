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
           Jouer à plusieurs
        </h1>

        <div className="about">
            Vous pouvez appuyer sur le bouton "copier l'url" pour partager l'url à vos amis, afin de tous vous affronter sur le même quiz! Cela est possible grâce au système de "seeds" disponible dans ouafkwiz : Il s'agit d'un chiffre qui gére l'aléatoire des questions. 2 joueurs avec la même seed auront exactement les mêmes questions !
          </div>


    </div>
  );
};

export default About;