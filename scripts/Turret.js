import Bullet from './Bullet.js';

/**
 * La classe Turret gère la création et le comportement des tourelles.
 *
 * + turretShot() : Gère la création des projectiles
 *
 * Modifications à prévoir :
 * - positionnement de la tourelle selon la case cliquée
 * - caracs de vitesse de tirs, portée et type de projectile géré par les types de tourelles
 * - cible et coordonnées à viser gérées dynamiquement (récupération coordonnées de la cilbe à chaque frame)
 */

export default class Turret {
    /**
     *
     * @param {number} x en pixel
     * @param {number} y en pixel
     * @param {number} range en pixel
     * @param {number} speed en secondes
     * @param {number} bulletSpeed en pixel
     * @param {number} bulletDamages
     */
    constructor(x, y, range, speed, bulletSpeed, bulletDamages) {
        /**
         * Gère les coordonnées de la tourelle en brut pour le moment. A générere selon la case sélectionner à terme
         * @type {number}
         */
        this.x = x; // pixels
        this.y = y; // pixels

        /**
         * Portée de la tourelle
         * @type {number}
         */
        this.range = range; // pixels

        /**
         * Vitesse de tir de la tourelle
         * @type {number}
         */
        this.speed = speed; // seconds

        // Caractéristiques du projectile tiré par la tourelle
        /**
         * Vitesse du projectile
         * @type {number}
         */
        this.bulletSpeed = bulletSpeed; // pixels
        /**
         * Dégats du projectile
         * @type {number}
         */
        this.bulletDamages = bulletDamages;

        /**
         * Element du DOM lié à la tourelle
         * @type {HTMLDivElement}
         */
        this.element = this.createTurret();
    }

    /**
     * Génère une div avec la classe turret, positionnée selon les coordonnées définies dans les paramètres
     * A MODIFIER pour définir les coordonnées sur la case cliquée par le joueur
     *
     * @returns {HTMLDivElement}
     */
    createTurret() {
        const turret = document.createElement('div');

        turret.classList.add('turret');

        turret.style.left = `${this.x}px`;
        turret.style.top = `${this.y}px`;

        document.body.appendChild(turret);

        return turret;
    }

    /**
     * Génération du projectile par la tourelle
     * @param {number} tx position x de la cible visée
     * @param {number} ty position y de la cible visée
     * @returns {object} bullet
     */
    turretShot(tx, ty) {
        // Selection de la target Monster

        const bullet = new Bullet(this.x, this.y, tx, ty, this.bulletSpeed, null);
        // const bullet = new Bullet(this.x, this.y, arrMonster[15], this.bulletSpeed, null);

        return bullet;
    }
}
