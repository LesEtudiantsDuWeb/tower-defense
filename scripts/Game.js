import utils, { $ } from './utils.js';
import Map from './Map.js';

/**
 * La classe Game gère la partie en elle-même. Elle contient l'ensemble des
 * données contenus dans le json.
 *
 * + loadMap() :  Charge la carte choisit par le joueur
 */
export default class Game {
    constructor() {
        // Utilisation de return async/await pour être capable d'utiliser await dans le constructeur
        return (async () => {
            /** Carte à laquelle le joueur joue */
            this.currentMap = undefined;
            /** Toute les données contenues dans le json */
            this.datas = await utils.loadJson('../json/datas.json');
            /** Jeu en mode play ou non */
            this.isPlaying = false;
            // TODO Remove later
            this.isPlaying = true;

            this.timestamp = 0;
            this.animFrameId = 0;

            return this;
        })();
    }

    /**
     * Charge la carte choisit par le joueur
     * @param {number} mapId Id de la carte à charger
     */
    loadMap(mapId) {
        // Instancie la carte à partir des données du json
        /**
         *
         */
        this.currentMap = new Map({
            element: $('#map'),
            tiles: utils.mergeArrays(this.datas.map[mapId].tiles),
            nbTiles: this.datas.map[mapId].nbTiles,
            waves: utils.getContentByIds(this.datas.map[mapId].waves, this.datas.waves),
            jsonMonsters: this.datas.monsters,
            jsonMapRoutes: this.datas.map[mapId].routes,
        });

        this.currentMap.generateDom();
    }

    play() {
        this.currentMap.createEvents();
        this.update();
    }

    stop() {
        cancelAnimationFrame(this.animFrameId);
    }

    updateStates() {
        this.timestamp;

        this.currentMap.updateStates(this.timestamp);

    }

    update() {
        this.animFrameId = requestAnimationFrame(() => this.update()); // Create the loop at each frame

        //   Create a counter to follow time of the play
        this.timestamp += 1;

        this.updateStates();

        // if (this.timestamp === 360) this.stop();
    }
}
