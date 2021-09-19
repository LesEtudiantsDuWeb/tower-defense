/**
 * Compare 2 tableaux pour savoir s'ils sont identiques.
 * Note : Le type et l'ordre des valeurs est important, sinon les tableaux ne seront pas egaux !
 * @param {any[]} array1
 * @param {any[]} array2
 * @returns {boolean}
 */
export const compareArrays = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);

/**
 * Retourne un élément HTML à partir du sélecteur
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * Ajoute des éléments dans le DOM
 * @param {HTMLElement} parent Container
 * @param {HTMLElement[]} elements Tableau contenant les éléments à ajouter
 */
export const appendChilds = (parent, elements) => elements.forEach(element => parent.appendChild(element));


export default {compareArrays,appendChilds};