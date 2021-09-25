import utils from './utils.js';
import Tile from './Tile.js';

export class Map {
    constructor({ element, tiles, nbTiles }) {
        /**
         * Element dans le DOM
         * @type {HTMLDivElement}
         */
        this.element = element;
        /**
         * Nombre de cases en X et Y
         * @type {{ x: number, y: number }}
         */
        this.nbTiles = nbTiles;
        /**
         * Tableau contenant toutes les cases
         * @type {Tile[]}
         */
        this.arrTiles = tiles.map((typeTile, index) => new Tile({ type: typeTile, index }));
    }

    /**
     * Génère le DOM en fonction du tableau des cases
     */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this.element.style.setProperty('--nbColumns', this.nbTiles.x);
        this.element.style.setProperty('--nbRows', this.nbTiles.y);

        utils.appendChilds(
            this.element,
            this.arrTiles.map((tile) => tile.element),
        );
    }
}
