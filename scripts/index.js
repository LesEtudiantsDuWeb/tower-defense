import Tile from './Tile.js';
import utils, { $ } from './utils.js';
// import * as utils from './utils.js';

const map = $('#map');

const mapContent = [0, 1, 2, 2, 2, 3, 4];
const tiles = mapContent.map((typeTile) => new Tile({ type: typeTile }));

utils.appendChilds(
    map,
    tiles.map((tile) => tile.element),
);
