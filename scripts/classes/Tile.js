import C, { LogStyles } from '../constants.js';
import Map from './Map.js';

const TYPE_DECOR = 0;
const TYPE_START = 1;
const TYPE_ROUTE = 2;
const TYPE_END = 3;
const TYPE_CONSTRUCTIBLE = 4;
const TYPE_TURRET = 5;

/** Tableau contenant les classes à ajouter en fonction du type */
const arrTypeClasses = Object.freeze({
    [TYPE_DECOR]: 'decor',
    [TYPE_START]: 'start',
    [TYPE_ROUTE]: 'route',
    [TYPE_END]: 'end',
    [TYPE_CONSTRUCTIBLE]: 'constructible',
    [TYPE_TURRET]: 'turret',
});

export default class Tile {
    /**
     * Map en cours
     * @type {Map}
     */
    _map;
    /**
     * Index de la case dans le tableau global
     * @type {number}
     */
    _index;
    /**
     * Type de case
     * @type {number}
     */
    _type = TYPE_DECOR;
    /**
     * Element du DOM lié à la case
     * @type {HTMLDivElement}
     */
    _element;

    /**
     * @param {Object}
     * @property {number} type
     * @property {number} index
     * @property {Map} map
     */
    constructor({ type, index, map }) {
        this._map = map;
        this._index = index;
        this._element = this.createElement();

        this.setElement(type);
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    get element() {
        return this._element;
    }

    /** Contenu à mettre dans la div */
    getContent() {
        return this._index;
    }

    /** Récupère le montant d'or du joueur */
    getPlayerGold() {
        return this._map.game.interface.playerGold;
    }

    /**
     * Met à jour le montant d'or du joueur
     * @param {number} transaction
     */
    setPlayerGold(transaction) {
        this._map.game.interface.setGold(transaction);
    }

    //=======================
    // METHODES
    //=======================

    /**
     * Génère une div avec la classe tile ainsi que la classe correspondant à son type
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement('div');
        div.classList.add('tile');
        C.TEXTCONTENT_TILE && (div.textContent = this.getContent().toString());

        return div;
    }

    /** Génère les events de la case en fonction du type de case que c'est */
    createEvents() {
        switch (this._type) {
            case TYPE_DECOR:
                break;
            case TYPE_START:
                break;
            case TYPE_ROUTE:
                break;
            case TYPE_END:
                break;
            case TYPE_CONSTRUCTIBLE:
                this._element.addEventListener('click', () => this.createEventConstructible());
                break;
            case TYPE_TURRET:
                this._element.addEventListener('click', () => this.createEventTower());
                break;
        }
    }

    /**
     * Event lorsque l'on clique sur une case constructible
     * Actuellement, cliquer sur une case constructible la transforme directement en tourelle
     */
    createEventConstructible() {
        const turretCost = 100;
        console.log('constructible', this._element, 'cost', turretCost);

        // Si le joueur a assez d'or pour acheter la tourelle
        if (this.getPlayerGold() >= turretCost) {
            this.setPlayerGold(-turretCost);
            this.resetElement();
            this.setElement(TYPE_TURRET);
        } else {
            console.log('%cOr insuffisant !', LogStyles.error);
        }
    }

    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spécial
     */
    createEventTower() {
        console.log('tourelle', this._element);
    }

    /** Supprime tous les events de l'éléments en faisant une copie de l'élément */
    removeEvents() {
        this._element.replaceWith((this._element = this._element.cloneNode(true)));
    }

    /** Ajoute la classe CSS à la case en fonction de son type */
    addClasses() {
        this._element.classList.add(arrTypeClasses[this._type]);
    }

    /** Retire la classe CSS en rapport avec le type de case */
    removeClasses() {
        this._element.classList.remove(arrTypeClasses[this._type]);
    }

    /** Reset l'élément */
    resetElement() {
        this.removeEvents();
        this.removeClasses();
    }

    /**
     * Personnifie l'élément
     * @param {number} type
     */
    setElement(type) {
        this._type = type;
        C.TEXTCONTENT_TILE && (this._element.textContent = this.getContent().toString());
        this.addClasses();
        this.createEvents();
    }
}
