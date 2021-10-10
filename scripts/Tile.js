const TYPE_DECOR = 0;
const TYPE_START = 1;
const TYPE_ROUTE = 2;
const TYPE_END = 3;
const TYPE_CONSTRUCTIBLE = 4;
const TYPE_TURRET = 5;

/**
 * Tableau contenant les classes à ajouter en fonction du type
 */
const arrTypeClasses = Object.freeze({
    0: 'decor',
    1: 'start',
    2: 'route',
    3: 'end',
    4: 'constructible',
    5: 'turret',
});

export default class Tile {
    /**
     * @param {{ index: number, type: number }} Tile
     */
    constructor({ type, index }) {
        /**
         * Index de la case dans le tableau global
         * @type {number}
         */
        this.index = index;
        /**
         * Type de case
         * @type {number}
         */
        this.type = type;
        /**
         * Element du DOM lié à la case
         * @type {HTMLDivElement}
         */
        this.element = this.createElement();

        this.addClasses();
        this.createEvents();
    }

    /**
     * Génère une div avec la classe tile ainsi que la classe correspondant à son type
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.textContent = this.getContent();

        return div;
    }

    /**
     * Génère les events de la case en fonction du type de case que c'est
     */
    createEvents() {
        switch (this.type) {
            case TYPE_DECOR:
                break;
            case TYPE_START:
                break;
            case TYPE_ROUTE:
                break;
            case TYPE_END:
                break;
            case TYPE_CONSTRUCTIBLE:
                this.element.addEventListener('click', () => this.createEventConstructible());
                break;
            case TYPE_TURRET:
                this.element.addEventListener('click', () => this.createEventTower());
                break;
        }
    }

    /**
     * Event lorsque l'on clique sur une case constructible
     * Actuellement, cliquer sur une case constructible la transforme directement en tourelle
     */
    createEventConstructible() {
        console.log('constructible', this.element);

        this.removeEvents();
        this.removeClasses();
        this.type = TYPE_TURRET;
        this.element.textContent = this.getContent();
        this.createEvents();
        this.addClasses();
    }

    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spéciale
     */
    createEventTower() {
        console.log('tourelle', this.element);
    }

    /**
     * Supprime tous les events de l'éléments en faisant une copie de l'élément
     */
    removeEvents() {
        this.element.replaceWith((this.element = this.element.cloneNode(true)));
    }

    /**
     * Ajoute la classe CSS à la case en fonction de son type
     */
    addClasses() {
        this.element.classList.add(arrTypeClasses[this.type]);
    }

    /**
     * Retire la classe CSS en rapport avec le type de case
     */
    removeClasses() {
        // this.element.classList.remove(...arrTypeClasses);
        this.element.classList.remove(arrTypeClasses[this.type]);
    }

    /**
     * Contenu à mettre dans la div
     */
    getContent() {
        return this.index;
    }
}
