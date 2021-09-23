import utils from './utils.js';
import Tile from './Tile.js';

export class Map {
    constructor({ element, tiles, nbTiles }) {
        /**
         * Element of DOM
         * @type {HTMLDivElement}
         */
        this.element = element;
        /**
         * Nomber of tiles in X and Y
         * @type {{ x: number, y: number }}
         */
        this.nbTiles = nbTiles;
        /**
         * Array of tiles
         * @type {Tile[]}
         */
        this.arrTiles = tiles.map((typeTile) => new Tile({ type: typeTile }));
    }

    /**
     * Generate all the DOM from array of tiles
     */
    generateDom() {
        // Modify css variables for the grid
        this.element.style.setProperty('--nbColumns', this.nbTiles.x);
        this.element.style.setProperty('--nbRows', this.nbTiles.y);

        utils.appendChilds(
            this.element,
            this.arrTiles.map((tile) => tile.element),
        );
    }
}
