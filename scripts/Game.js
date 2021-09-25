import utils, { $ } from './utils.js';
import { Map } from './Map.js';

export class Game {
    constructor() {
        // Utilisation de return async/await pour être capable d'utiliser await dans le constructeur
        return (async () => {
            /** Id de la carte */
            // this.mapId = -1;
            /** Carte à laquelle le joueur joue */
            this.currentMap = undefined;
            /** Toute les données contenues dans le json */
            this.datas = await utils.loadJson('../json/datas.json');

            return this;
        })();
    }

    /**
     * Charge la carte choisit par le joueur
     * @param {number} mapId Id de la carte à charger
     */
    loadMap(mapId) {
        // this.mapId = mapId;

        // Instancie la carte à partir des données du json
        this.currentMap = new Map({
            element: $('#map'),
            tiles: utils.mergeArrays(this.datas.map[mapId].tiles),
            nbTiles: this.datas.map[mapId].nbTiles,
        });

        this.currentMap.generateDom();
    }
}
