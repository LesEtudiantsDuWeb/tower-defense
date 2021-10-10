const TYPE_COMMON = 0;
const TYPE_RARE = 1;
const TYPE_ELITE = 2;
const TYPE_BOSS = 3;

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
    initialPosition() {
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

    /**
     * Met à jour la position du monstre
     */
    setPosition() {
        const rect = this.element.getBoundingClientRect();
        this.element.style.setProperty('top', rect.y + 5 + 'px');

        // Si le monstre a atteint la sortie
        if (rect.y > 666) {
            console.log('Vague', this.wave.waveNumber, 'Disparition du monstre', this);
            // Retire le monstre du tableau
            this.wave.arrMonstersInMap = this.wave.arrMonstersInMap.filter(
                (monster) => monster.element !== this.element,
            );
            // Retire le monstre du dom
            this.element.remove();

            // On vérifie qu'il ne reste pas des monstre sur le carte ainsi qu'à apparaitre
            if (!(this.wave.arrMonstersInMap.length + this.wave.arrPopMonsters.length)) {
                // Retire la vague du tableau
                this.wave.map.currentWaves = this.wave.map.currentWaves.filter((wave) => wave !== this.wave);
                console.log('Vague', this.wave.waveNumber, 'terminée !');

                // Si c'était la dernière vague de la map, on termine le jeu
                if (this.wave.map.finished) {
                    this.wave.map.game.stop();
                }
            }
        }
    }

    /**
     * Met à jour la route du monstre
     */
    setRoute(route) {
        this.route = route;
    }

    /**
     * Met à jour la vague à laquelle le monstre appartient
     */
    setWave(wave) {
        this.wave = wave;
    }

    updateStates(timestamp) {
        this.setPosition();
    }
}
