/**
 * Compare 2 tableaux pour savoir s'ils sont identiques.
 * Note : Le type et l'ordre des valeurs est important !
 * @param {any[]} array1 
 * @param {any[]} array2 
 * @returns {boolean}
 */
export const compareArrays = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);