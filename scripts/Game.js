import utils, { $ } from './utils.js';
import { Map } from './Map.js';

export class Game {
    constructor() {
        // Use of return async/await to be able to use await in constructor
        return (async () => {
            /** Id of the map */
            // this.mapId = -1;
            /** Current map the player is playing */
            this.currentMap = undefined;
            /** All datas contained in the json */
            this.datas = await utils.loadJson('../json/datas.json');

            return this;
        })();
    }

    /**
     * Load a map choosed by the player
     * @param {number} mapId Id of the map to load
     */
    loadMap(mapId) {
        // this.mapId = mapId;

        // Populate the map
        this.currentMap = new Map({
            element: $('#map'),
            tiles: utils.mergeArrays(this.datas.map[mapId].tiles),
            nbTiles: this.datas.map[mapId].nbTiles,
        });

        this.currentMap.generateDom();
    }
}
