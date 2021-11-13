export default Object.freeze({
    /** Taille des tuiles par défaut */
    TILE_DEFAULT_SIZE: '50px',
    /** Delai en secondes avant de passer à la vague suivante */
    WAVE_DELAI: 2,
    /** Delai en secondes avant de passer au monstre suivant */
    MONSTER_DELAI: 0.5,

    // === DEV CONSTANTS ===

    /** Affiche ou non les logs liés à la vague */
    LOG_WAVE: true,
    /** Affiche ou non l'index de la case */
    TEXTCONTENT_TILE: false,
});

export const LogStyles = Object.freeze({
    error: 'color:red;',
});
