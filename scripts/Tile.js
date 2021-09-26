/**
 * Tableau contenant les classes à ajouter en fonction du type
 */
const arrTypeClasses = Object.freeze({
    0: 'decor',
    1: 'start',
    2: 'route',
    3: 'end',
    4: 'constructible',
    5: 'tower',
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
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                this.element.addEventListener('click', () => this.createEventConstructible());
                break;
            case 5:
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
        this.type = 5;
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
