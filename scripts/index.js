import { GameInitialized } from './classes/Game.js';

const btn_startWave = document.querySelector('#startWave');

// GameInitialized représente le jeu avec le json contenant toutes les données chargées
GameInitialized.then((myGame) => {
    const mapNum = 0;
    // Charge la map
    myGame.loadMap(mapNum);

    // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));
});

/**
 * Event du bouton de l'état du jeu
 * @param {Game} theGame
 */
function handleGame(theGame) {
    theGame.setPlaying();
    btn_startWave.textContent = theGame.isPlaying ? 'Pause' : 'Lecture';
}
