export const loadJson = async () => {
    try {
        const res = await fetch('../json/datas.json'); // Fetch du JSON
        return await res.json(); // Return des données en JSON
    } catch (err) {
        console.error(err); // Log les erreurs dans la console
    }
};
