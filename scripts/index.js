import { loadJson } from './fetchJson.js';
import Tile from './Tile.js';
import utils, { $ } from './utils.js';

const map = $('#map');
const data = await loadJson(); // Charge le JSON

// Récupère toute la map
const mapContent = data.map[0].tiles.reduce((accArr, currArr) => accArr.concat(...currArr), []);

// Génère un tableau contenant toutes les cases (HTMLDivElement)
const tiles = mapContent.map((typeTile) => new Tile({ type: typeTile }));

// Ajoute toutes les cases du tableau dans le DOM
utils.appendChilds(
    map,
    tiles.map((tile) => tile.element),
);
