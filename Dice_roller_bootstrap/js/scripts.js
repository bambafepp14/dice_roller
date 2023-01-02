/*!
* Start Bootstrap - Shop Item v5.0.5 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


'use strict';
// La "use strict"directive était nouvelle dans ECMAScript version 5.

// Ce n'est pas une déclaration, mais une expression littérale, ignorée par les versions antérieures de JavaScript.

// Le but de "use strict"est d'indiquer que le code doit être exécuté en "mode strict".

// Avec le mode strict, vous ne pouvez pas, par exemple, utiliser des variables non déclarées.

const player0El =   document.querySelector('.player--0');
const player1El =   document.querySelector('.player--1');
const score0El  =   document.getElementById('score--0');
const score1El  =   document.getElementById('score--1');
const diceEl    =   document.querySelector('.dice');
const rollDice  =   document.querySelector('.btn--roll');
const newGame   =   document.querySelector('.btn--new');
const holdBtn   =   document.querySelector('.btn--hold');
const current0  =   document.getElementById('current--0');
const current1  =   document.getElementById('current--1');

// La méthode querySelector() de l'interface Document retourne le premier Element dans le document correspondant au sélecteur 
// - ou groupe de sélecteurs - spécifié(s), ou null si aucune correspondance n'est trouvée.

 let currentScore,activePlayer,score,canPlay;

const init=function(){
     currentScore = 0;
     activePlayer = 0;
     score = [0, 0];
     canPlay = true;

     
    current0.textContent = 0;
    current1.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer=function(){
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     currentScore = 0; // Le score actuel du joueur sera de 0 après avoir changé de joueur
     activePlayer = activePlayer === 0 ? 1 : 0;
     player0El.classList.toggle('player--active');
     player1El.classList.toggle('player--active');
}

rollDice.addEventListener('click', function () {
  if(canPlay){
    //1. Génération de jets de dés aléatoires
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Affichage de jets de dés sur la page Web en supprimant la classe masquée
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      //Ajouter des dés au score actuel
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //sur la base de la mise à jour activePlayer du currentScore
    } else {
      // Si 1 puis changer de joueur
      switchPlayer();
    }
  }
});


holdBtn.addEventListener('click', function(){
    if(canPlay){
      //Ajouter le score actuel au score des joueurs actifs
      score[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];

      //Vérifiez si le score des joueurs est >=100 si oui terminer le jeu
      if (score[activePlayer] >= 50) {
        canPlay = false;
        
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        
          diceEl.classList.add('hidden');
       
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        //changer de joueur
        switchPlayer();
      }
    }
})

newGame.addEventListener('click',init);


