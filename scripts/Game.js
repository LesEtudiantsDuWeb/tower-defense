import utils, { $ } from './utils.js';
import Map from './Map.js';

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
            jsonMapRoutes: this.datas.map[mapId].routes
        });

        this.currentMap.generateDom();
    }
}
