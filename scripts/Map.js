import utils from './utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from './constants.js';

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
     * @param {Game} param.game
     */
    constructor({ element, tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes, game }) {
        this.game = game;

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
         * Tableau des routes de la map (valeurs brut du json)
         * @type number[][]
         */
        this.jsonMapRoutes = jsonMapRoutes;

        /**
         * Tableau des monstres (valeurs brut du json)
         * @type object[]
         * @property id: number
         * @property name: string
         * @property movement: number
         * @property life: number
         * @property gold: number
         * @property damages: number
         * @property flying: boolean
         * @property type: number
         */
        this.jsonMonsters = jsonMonsters;

        /**
         * Vague courante, démarre à -1
         * @type number
         */
        this.currentWaveIndex = -1;

        /**
         * Tableau contenant l'ensemble des vagues de la map
         */
        this.waves = waves;

        /************************************
         * Tableau contenant l'ensemble des vagues présentes sur la map
         *
         * A chaque nouvelle vague, celle-ci est ajouté dans ce tableau. Dès le dernière monstre de la
         * vague sortie de la map, la vague est supprimée du tableau.
         *
         * NOTE A améliorer plus tard, car si le tableau waves vaut [0, 1, 0],
         *      on chargera 2 fois les données de la wave 0 plutot que de réutiliser celles déjà récupérées.
         * Tableau waves[idMap] = Wave
         *
         * @type Wave[]
         */
        this.currentWaves = [];

        /**
         * Contient l'état du jeu,
         * @type boolean
         */
        this.finished = false;
    }

    /**
     * Génère une nouvelle vague à partir de l'index de la vague courante
     */
    generateWave() {
        console.log('Génération de la vague', this.currentWaveIndex);
        // NOTE modifier map par routes ?
        return new Wave({
            ...this.waves[this.currentWaveIndex],
            jsonMonsters: this.jsonMonsters,
            map: this,
            waveNumber: this.currentWaveIndex,
        });
    }

    /**
     * Passe à la vague suivante
     */
    nextWave() {
        if (this.finished) return;

        if (this.currentWaveIndex < this.waves.length - 1) {
            this.currentWaveIndex++;
            this.currentWaves.push(this.generateWave());
            this.createEvents();
        } else {
            this.finished = true;
        }
    }

    /**
     * Génère le DOM en fonction du tableau des cases
     */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this.element.style.setProperty('--nbColumns', this.nbTiles.x);
        this.element.style.setProperty('--nbRows', this.nbTiles.y);
        this.element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);

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
        // this.arrWaves[this.currentWaveIndex].launchWave();
        this.waveIteration((wave) => wave.createEvents());
    }

    updateStates(timestamp) {
        this.waveIteration((wave) => wave.updateStates(timestamp));
    }

    /**
     * Boucle le tableau des vagues de monstres actuellement sur la carte
     * @param {void} fn 
     */
    waveIteration(fn) {
        this.currentWaves.forEach(fn);
    }

    // TODO Delete later
    // Juste pour les tests (pour avoir un truc à afficher avec console.log)
    waveIteration2(fn) {
        return this.currentWaves.map(fn);
    }
}
