/**
 * Retourne un élément HTML à partir du sélecteur
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * Compare 2 tableaux pour savoir s'ils sont identiques.
 * Note : Le type et l'ordre des valeurs est important, sinon les tableaux ne seront pas egaux !
 * @param {any[]} array1
 * @param {any[]} array2
 * @returns {boolean}
 */
export const compareArrays = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);

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

/**
 * Récupère un élément parmi un tableau à partir de son id
 * @param {number} id Id de l'élément à récupérer
 * @param {object[]} arrayOfContents Tableau contenant tous les éléments (doit avoir un attribut id)
 */
export const getContentById = (id, arrayOfContents) => arrayOfContents.find((content) => content.id === id);

/**
 * Récupère des éléments parmi un tableau à partir de leur id
 * @param {number[]} array Tableau contenant les ids
 * @param {object[]} arrayOfContents Tableau contenant tous les éléments (doit avoir un attribut id)
 */
export const getContentByIds = (array, arrayOfContents) => array.map((id) => getContentById(id, arrayOfContents));

// export const getContentByObjectsWithId = (arrayOfObjects, arrayOfContents, propertyName) =>
//     arrayOfObjects.map((object) => getContentById(object[propertyName], arrayOfContents));

/**
 * Calcul des distances entre projectile et cible
 * @param {number} bulletX
 * @param {number} bulletY
 * @param {number} targetX
 * @param {number} targetY
 * @returns {object} distance de la cible en x et en y et distance total de trajet
 */
export function trajCalculation(bulletX, bulletY, targetX, targetY) {
    let x = targetX - bulletX;
    let y = targetY - bulletY;

    let travelDistance = distCalculation(x, y);

    x /= travelDistance;
    y /= travelDistance;

    return { x, y, travelDistance };
}

/**
 * Calcul de la distance en ligne droite entre 2 points
 * @param {number} deltaX
 * @param {number} deltaY
 * @returns {number} distance de trajet entre les deux points
 */
export const distCalculation = (deltaX, deltaY) => Math.sqrt(deltaX * deltaX + deltaY * deltaY);

export default {
    compareArrays,
    appendChilds,
    loadJson,
    mergeArrays,
    getContentById,
    getContentByIds,
    // getContentByObjectsWithId,
    trajCalculation,
};
