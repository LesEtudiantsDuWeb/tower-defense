import { $ } from '../utils.js';
import Game from './Game.js';

export default class Interface {
    /**
     * Instance de Game
     * @type {Game}
     */
    _game;
    /**
     * Element affichant le montant d'or
     * @type {HTMLElement}
     */
    _playerGoldElement;
    /**
     * Element affichange le nombre de vies
     * @type {HTMLElement}
     */
    _playerLifeElement;
    /**
     * Element affichange le statut des vagues
     * @type {HTMLElement}
     */
    _waveNumberElement;
    /**
     * Element pour modifier l'état du jeu
     * @type {HTMLButtonElement}
     */
     _btnStartWaveElement;
    /**
     * Montant d'or
     * @type {number}
     */
    _playerGold;
    /**
     * Nombre de vies
     * @type {number}
     */
    _playerLife;
    /**
     * Numéro de la vague en cours
     * @type {number}
     */
    _waveNumber;
    /**
     * Nombre maximum de vagues de la carte en cours
     * @type {string}
     */
    _waveMax;

    /**
     *
     * @param {TJsonPlayer|undefined} player
     * @param {number|undefined} waveMax
     */
    constructor(game, player, waveMax) {
        this._game = game;
        this._playerGoldElement = $('#playerGold');
        this._playerLifeElement = $('#playerLife');
        this._waveNumberElement = $('#waveNumber');
        this._btnStartWaveElement = $('#startWave');
        this._playerGold = player?.startGold ?? 0;
        this._playerLife = player?.startLife ?? 0;
        this._waveNumber = 0;
        this._waveMax = waveMax?.toString() ?? 'XX';

        this.handleGame = this.handleGame.bind(this);
        this.setDisplay();
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    get playerGold() {
        return this._playerGold;
    }

    get wave() {
        return `${this._waveNumber} / ${this._waveMax}`;
    }

    //=======================
    // METHODES
    //=======================

    /**
     * Met à jour les valeurs
     * @param {TJsonPlayer|undefined} player
     * @param {number|undefined} waveMax
     */
    set(player, waveMax) {
        this._playerGold = player?.startGold ?? 0;
        this._playerLife = player?.startLife ?? 0;
        this._waveMax = waveMax?.toString() ?? 'XX';

        this.setDisplay();
    }

    /** Met à jour l'affichage */
    setDisplay() {
        this._playerGoldElement.innerText = this._playerGold.toString();
        this._playerLifeElement.innerText = this._playerLife.toString();
        this._waveNumberElement.innerText = this.wave;
        // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
        this._btnStartWaveElement.style.setProperty('display', 'block');
        this._btnStartWaveElement.addEventListener('click', this.handleGame);
    }

    /**
     * Met à jour le montant d'or du joueur
     * @param {number} gold
     */
    setGold(gold) {
        this.anim(this._playerGoldElement, this._playerGold, this._playerGold + gold);
        this._playerGold += gold;
    }

    /**
     * Met à jour le nombre de vie du joueur
     * @param {number} life
     */
    setLife(life) {
        this._playerLife += life;
        this._playerLifeElement.innerText = this._playerLife.toString();
    }

    /**
     * Met à jour le numéro de la vague en cours
     * @param {number} wave
     */
    setWave() {
        this._waveNumber++;
        this._waveNumberElement.innerText = this.wave;
    }

    /**
     * Anime la modification de valeur d'un champ pour une durée de 300ms
     * @param {HTMLElement} element
     * @param {number} start
     * @param {number} end
     */
    anim(element, start, end) {
        const duration = 300;
        const delai = Math.floor(duration / Math.abs(start - end));
        let timer = 0;
        const inc = start > end ? -1 : 1;
        for (let current = start; current - inc !== end; current += inc) {
            setTimeout(() => {
                element.innerText = current.toString();
            }, (timer += delai));
        }
    }
    
    /** Event du bouton de l'état du jeu */
    handleGame() {
        console.log(this)
        this._game.setPlaying();
        this._btnStartWaveElement.textContent = this._game.isPlaying ? 'Pause' : 'Lecture';
    }
}
