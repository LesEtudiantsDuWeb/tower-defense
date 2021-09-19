export default class Tile {
    /**
     * @param {{type:number}} type
     */
    constructor({ type }) {
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
        div.textContent = this.type;
        return div;
    }

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
        this.element.textContent = this.type;
        this.createEvents();
        this.addClasses();
    }

    createEventTower() {
        console.log('tourelle', this.element);
    }

    /**
     * Supprime tous les events de l'éléments en faisant une copie de l'élément
     */
    removeEvents() {
        this.element.replaceWith((this.element = this.element.cloneNode(true)));
        // this.element = this.element.cloneNode(true);
    }

    addClasses() {
        switch (this.type) {
            case 0:
                this.element.classList.add('decor');
                break;
            case 1:
                this.element.classList.add('start');
                break;
            case 2:
                this.element.classList.add('route');
                break;
            case 3:
                this.element.classList.add('end');
                break;
            case 4:
                this.element.classList.add('constructible');
                break;
            case 5:
                this.element.classList.add('tower');
                break;
        }
    }

    removeClasses() {
        this.element.classList.remove('decor', 'start', 'route', 'end', 'constructible', 'tower');
    }
}
