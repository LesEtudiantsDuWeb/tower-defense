/**
 * Retourne un élément HTML à partir du sélecteur
 * @param {HTMLElement} selector
 */
export const $ = (selector) => document.querySelector(selector);

/** Ajoute des éléments dans le DOM
 * @param {HTMLElement} parent
 * @param {HTMLElement[]} elements
 */
export const appendChilds = (parent, elements) =>
    elements.forEach((element) => parent.appendChild(element));

/** Récupère un élément parmi un tableau à partir de son id
 * @param {number} id Id à rechercher
 * @param {Object[]} arrayOfContents Tableau json
 */
export const getContentById = (id, arrayOfContents) =>
    arrayOfContents.find((content) => content.id === id) ?? [];

/** Récupère des éléments parmi un tableau à partir de leur id
 * @param {number[]} array Tableau d'id à rechercher
 * @param {Object[]} arrayOfContents Tableau json
 */
export const getContentByIds = (array, arrayOfContents) =>
    array.flatMap((id) => getContentById(id, arrayOfContents));

export default {
    appendChilds,
    getContentById,
    getContentByIds,
};