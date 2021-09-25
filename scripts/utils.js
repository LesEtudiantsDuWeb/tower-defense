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
export const appendChilds = (parent, elements) => elements.forEach((element) => parent.appendChild(element));

/**
 * Charge un fichier JSON à partir d'une url
 * @param {string} url Lien du fichier JSON
 * @returns {object} Contenu du fichier JSON
 */
export const loadJson = async (url) => {
    try {
        const res = await fetch(url); // Fetch du JSON
        return await res.json(); // Returne des données en JSON
    } catch (err) {
        console.error(err); // Log les erreurs dans la console
    }
};

/**
 * Fusionne un tableau à 2 dimensions pour retourner un tableau à une dimension
 * @param {any[][]} arr Tableau à 2 dimensions
 * @returns Tableau à 1 dimension
 */
export const mergeArrays = (arr) => arr.reduce((accArr, currArr) => accArr.concat(...currArr), []);

export default { compareArrays, appendChilds, loadJson, mergeArrays };
