import { GameInitialized } from './classes/Game.js';

// GameInitialized représente le jeu avec le json contenant toutes les données chargées
GameInitialized.then((myGame) => {
    const mapNum = 0;
    // Charge la map
    myGame.loadMap(mapNum);
});