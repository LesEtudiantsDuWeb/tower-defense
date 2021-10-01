import utils from './utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';

/**
 * La classe Map gère tout ce qui est en rapport avec la map.
 * 
 * + generateDom() : Génère le DOM en fonction du tableau des cases
 * + getRoutes() : Retourne les routes de la map
 * + createEvents() : Génère les évènements de la map
 */
export default class Map {
    /**
     *
     * @param {object} param
     * @param {HTMLDivElement} param.element
     * @param {number[]} param.tiles
     * @param {{ x: number, y: number }} param.nbTiles
     * @param {object[]} param.waves
     * @param {object[]} param.jsonMonsters
     * @param {number[][]} param.jsonMapRoutes
     */
    constructor({ element, tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes }) {
        /************************************
         * Element dans le DOM
         * @type {HTMLDivElement}
         */
        this.element = element;

        /************************************
         * Nombre de cases en X et Y
         * @type {{ x: number, y: number }}
         */
        this.nbTiles = nbTiles;

        /************************************
         * Tableau contenant toutes les cases
         * @type Tile[]
         */
        this.arrTiles = tiles.map((type, index) => new Tile({ type, index }));
        
        /************************************
         * Tableau des routes de la map
         * @type number[][]
         */
        this.jsonMapRoutes = jsonMapRoutes;

        /**
         * Vague courrante
         * @type number
         */
        this.currentWave = 0;

        /************************************
         * Tableau contenant toutes les cases
         * 
         * NOTE A améliorer plus tard, car si le tableau waves vaut [0, 1, 0],
         *      on chargera 2 fois les données de la wave 0 plutot que de réutiliser celles déjà récupérées.
         * 
         * TODO Générer les tableaux de chaque élément du json dans Game
         * @type Wave[]
         */
        this.arrWaves = waves.map((wave) => new Wave({ ...wave, jsonMonsters, map: this }));
    }

    /**
     * Génère le DOM en fonction du tableau des cases
     */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this.element.style.setProperty('--nbColumns', this.nbTiles.x);
        this.element.style.setProperty('--nbRows', this.nbTiles.y);

        // Ajoute les cases dans la map
        utils.appendChilds(
            this.element,
            this.arrTiles.map((tile) => tile.element),
        );
    }

    /**
     * Retourne les routes de la map
     */
    getRoutes() {
        return this.jsonMapRoutes;
    }

    /**
     * Génère les évènements de la map
     */
    createEvents() {
        // Démarre la vague courrante
        this.arrWaves[this.currentWave].launchWave();
    }
}
