import { LogStyles } from './../constants.js';

export default class Json {
    /** @type {TJson | undefined} */
    _data;
    /** @type {TJsonMap | undefined} */
    _map;
    /** @type {TJsonWave | undefined} */
    _wave;

    // Données des maps
    /** @type {{ x: number; y: number }} */
    _tilesXY;
    /** @type {number[]} */
    _tiles;
    /** @type {number[][]} */
    _routes;
    /** @type {number[]} */
    _waves;

    /** @type {number} */
    _mapIndex;
    /** @type {number} */
    _waveIndex;

    constructor() {
        this._tilesXY = { x: 0, y: 0 };
        this._tiles = [];
        this._waves = [];
        this._routes = [];

        this._mapIndex = -1;
        this._waveIndex = -1;
    }

    /**
     * Charge un fichier json. Charge par défaut la map 0
     * @param {string} url
     */
    static async Load(url) {
        const json = new Json();
        try {
            json._data = await fetch(url).then((res) => res.json());
            json.setMap(0);
        } catch (err) {
            console.error(`%cErreur lors du chargement du fichier json`, LogStyles.error);
        }
        return json;
    }

    /**
     * @returns {TJson}
     */
    get data() {
        return this._data;
    }

    /**
     * @returns {TJsonPlayer}
     */
    get player() {
        return this.data.player;
    }

    nbTiles() {
        return this._tilesXY.x * this._tilesXY.y;
    }

    /**
     * Met à jour la map pour récupérer plus facilement les cases et les routes
     * @param {number} i
     */
    setMap(i) {
        if (i === this._mapIndex) return;

        this._mapIndex = i;
        this._map = this.data.maps[i];

        if (this._map) {
            this._tilesXY = this._map.nbTiles;
            this._waves = this._map.waves;
            this._routes = this._map.routes;
            this._tiles = this._map.tiles.flatMap((x) => x);

            // Vérifie si les données sont corrects
            if (this._tiles.length !== this.nbTiles()) {
                console.error(`%cErreur ! Le nombre de cases entre nbTiles et tiles ne correspond pas pour la map ${i} !`, LogStyles.error);
            }
            if (!this._map.tiles.every((tile) => tile.length === this._tilesXY.x)) {
                console.error(`%cErreur ! Une ligne du tableau des cases de la map ${i} ne contient pas le nombre de colonnes attendu !`, LogStyles.error);
            }
            if (!this._waves.length) {
                console.error(`%cErreur ! Le tableau des vagues de la map ${i} est vide !`, LogStyles.error)
            }
            if (!this._routes.every(route => route.length)) {
                console.error(`%cErreur ! Une route du tableau des routes de la map ${i} est vide !`, LogStyles.error)
            }
        } else {
            console.error(`%cErreur ! L'index ${i} n'existe pas sur le tableau des maps !`, LogStyles.error);
        }
    }

    /**
     * @param {number | undefined} i 
     * @returns {TJsonMap}
     */
    getMap(i) {
        // Si un index de map a été passé en param, on renvoit la map demandée
        if (typeof i === 'number' && this.data.maps[i]) return this.data.maps[i];

        // Renvoit la map en cours
        return this._map;
    }

    /**
     * @returns {TJsonTurret[]}
     */
    get turrets() {
        return this.data.turrets;
    }

    /**
     * @returns {TJsonMonster[]}
     */
    get monsters() {
        return this.data.monsters;
    }

    /**
     * @param {number} i 
     */
    setWave(i) {
        this._wave = this.data.waves[i];

        if (this._wave) {
        } else {
            console.error(`%cL'index ${i} n'existe pas sur le tableau des waves !`, LogStyles.error);
        }
    }

    /**
     * @param {number | undefined} i 
     * @returns {TJsonWave}
     */
    getWave(i) {
        // Si un index de vague a été passé en param, on renvoit la vague demandée
        if (typeof i === 'number') return this.data.waves[i];

        // Renvoit la vague en cours
        return this._wave;
    }

    /**
     * @returns {number[]}
     */
    get tiles() {
        return this._tiles;
    }

    /**
     * @returns {number[][]}
     */
    get routes() {
        return this._routes;
    }

    /**
     * @returns {number}
     */
    get nbWaves() {
        return this._map?.waves.length ?? -1;
    }
}

export const JsonLoaded = Json.Load('../json/datas.json');
