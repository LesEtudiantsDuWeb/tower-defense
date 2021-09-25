import { Game } from './Game.js';

// Le fichier json est en async, ce qui fait que pour constructruire l'objet, nous avons une promesse.
// 2 méthodes possibles : async/await ou then()

// const myGame = await new Game();
// myGame.loadMap(1);

new Game().then(myGame => {
    myGame.loadMap(1);

    // Suite du code
})
