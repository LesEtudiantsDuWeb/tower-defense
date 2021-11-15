import { LogStyles } from '../constants.js';
import C from '../constants.js';
import Interface from './Interface.js';
import Json from './Json.js';
import Map from './Map.js';

/**
 * La class Game est la colonne vertébrale du jeu. Celle ci récupère les données
 * contenues dans le json et les propages dans toute l'application.
 *
 * Game fait la liaison entre la Map, l'Interface et le Json.
 */
export default class Game {
    /**
     * Carte à laquelle le joueur joue
     * @type {Map | undefined}
     */
    _currentMap;
    /**
     * Données du json 
     * @type {Json | undefined}
     */
    _json;
    /**
     * Jeu en mode play ou non 
     * @type {boolean}
     */
    _isPlaying;
    /**
     * Timer de la partie. Un timestamp de 1 correspond à 1/60 seconde. 
     * @type {number}
     */
    _timestamp;
    /**
     * Id de l'animation pour être capable de la supprimer par la suite 
     * @type {number}
     */
    _animFrameId;
    /**
     * Infos du joueur 
     * @type {Interface}
     */
    _interface;
    /**
     * Timer à laquelle la prochaine vague commence 
     * @type {number}
     */
     _timestampNextWave;
    /**
     * Delai entre deux vagues 
     * @type {number}
     */
     _delaiBetweenWaves;

    constructor() {
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        this._interface = new Interface(this);
        this._timestampNextWave = 0;
        this._delaiBetweenWaves = C.WAVE_DELAI * 60;

        return this;
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    get isPlaying() {
        return this._isPlaying;
    }

    get interface() {
        return this._interface;
    }

    get json() {
        return this._json;
    }

    get timestamp() {
        return this._timestamp;
    }

    setTimestampNextWave() {
        return this._timestampNextWave = this._timestamp + this._delaiBetweenWaves;
    }

    //=======================
    // METHODES
    //=======================

    /** Instancie une Game et charge le json */
    static CreateAsync = async () => {
        const theGame = new Game();
        /** Toutes les données contenues dans le json */
        theGame._json = await Json.Load('../json/datas.json');
        return theGame;
    };

    /**
     * Charge la carte choisit par le joueur
     * @param {number} mapId
     */
    loadMap(mapId) {
        if (!this._json) return;

        this._json.setMap(mapId);

        // Instancie la carte à partir des données du json
        this._currentMap = new Map(this);

        // Met à jour l'interface à partir des données du json
        this.updateInterface();
    }

    /** Met à jour le contenu de l'interface */
    updateInterface() {
        return this._interface.set(this.json.player, this.json.nbWaves);
    }

    /**
     * Modifie l'état du jeu entre en jeu ou non. Si aucun nouvel état est passé en
     * paramètre, l'état de jeu est basculé.
     * @param {boolean} newState
     */
    setPlaying(newState = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }

    //=======================
    // ANIMATION
    //=======================

    play() {
        this.update();
    }

    stop() {
        cancelAnimationFrame(this._animFrameId);
    }

    update() {
        if (!this._currentMap) {
            console.error(`%cErreur, pas de carte chargée !`, LogStyles.error);
            return;
        }

        this._animFrameId = requestAnimationFrame(() => this.update());

        // Si le timestap correspond à celui de la vague suivante, on débute la vague
        // Par défaut, on commence à 0, donc la première vague se lance dès le début
        if (this._timestamp === this._timestampNextWave) {
            this._currentMap.nextWave();
        }

        // Incrémente le timestamp afin de pouvoir manipuler plus facilement les vitesses de
        // déplacement des éléments
        this._timestamp += 1;

        this._currentMap.updateStates(this._timestamp);
    }
}

export const GameInitialized = Game.CreateAsync();
