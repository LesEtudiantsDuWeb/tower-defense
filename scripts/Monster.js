const COMMON = 0;
const RARE = 1;
const ELITE = 2;
const BOSS = 3;

const TypeMonster = Object.freeze({
    0: 'Commom',
    1: 'Rare',
    2: 'Elite',
    3: 'Boss',
});

/**
 * La classe Monstre gère le monstre en lui-même.
 * 
 * + createElement() : Génère une div avec la classe tile ainsi que la classe correspondant à son type
 * + createEvents() : Génère les évènements du monstre (apparition, déplacement, disparition)
 * + startMove() : Met en place le monstre sur la carte
 * + setRoute() : Met à jour la route du monstre
 * + setWave() : Met à jour la vague à laquelle le monstre appartient
 */
export default class Monster {
    constructor({ id, name, life, movement, damages, flying, gold, type }) {
        // Données du json
        this.id = id;
        this.name = name;
        this.life = life;
        this.movement = movement;
        this.flying = flying;
        this.gold = gold;
        this.damages = damages;
        this.type = type;

        /**
         * Element du DOM lié à la case
         * @type {HTMLDivElement}
         */
        this.element = this.createElement();

        /**
         * Route que le monstre va suivre
         * @type number[]
         */
        this.route = [];

        /**
         * Wave à laquelle le monstre appartient
         * @type Wave
         */
        this.wave = undefined;

        /**
         * Container des monsters
         * @type {HTMLDivElement}
         */
        this.container = document.querySelector('#monsters');
    }

    /**
     * Génère une div avec la classe tile ainsi que la classe correspondant à son type
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');

        return div;
    }

    createEvents() {
        // Mouvement du monstre
    }

    /**
     * Met en place le monstre sur la carte
     */
    startMove() {
        // Récupère la position et la taille de la carte de départ de la vague
        const rectTile = this.wave.map.arrTiles[this.route[0]].element.getBoundingClientRect();

        // Met à jour la position et la taille de la div du monstre
        // WARNING : La div n'est pas redimensionnée avec la page
        const style = {
            left: rectTile.x + 'px',
            top: rectTile.y + 'px',
            width: rectTile.width + 'px',
            height: rectTile.height + 'px',
        };
        Object.assign(this.element.style, style);

        // Ajoute le monstre au body afin de pouvoir le déplacer plus facilement d'une case à une autre
        this.container.appendChild(this.element);

        // Génère les évènements pour le faire se déplacer sur la route
        this.createEvents();
    }

    // Met à jour la route du monstre
    setRoute(route) {
        this.route = route;
    }

    // Met à jour la vague à laquelle le monstre appartient
    setWave(wave) {
        this.wave = wave;
    }
}
