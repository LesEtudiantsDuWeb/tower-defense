import { loadJson } from './fetchJson.js';
import Tile from './Tile.js';
import utils, { $ } from './utils.js';

const map = $('#map');
const data = await loadJson() // Charge le JSON
const mapContent = data.map[0].tiles[2]; // Récupère la première ligne du tableau 
// const mapContent = [0, 1, 2, 2, 2, 3, 4];

// Génère un tableau contenant toutes les cases (HTMLDivElement)
const tiles = mapContent.map((typeTile) => new Tile({ type: typeTile }));

// Ajoute toutes les cases du tableau dans le DOM
utils.appendChilds(
    map,
    tiles.map((tile) => tile.element),
);
