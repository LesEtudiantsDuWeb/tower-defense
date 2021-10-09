import { trajCalculation } from './utils.js';

/**
 *
 * La classe Bullet gère la création et la destruction des projectiles générés par les tourelles
 *
 * + moveBullet() : déplacement du projectile selon les coordonnées de la cible
 * + killBullet() : destruction du projectile une fois la cible atteinte
 */

export default class Bullet {
    /**
     *
     * @param {number} originX en pixel
     * @param {number} originY en pixel
     * @param {number} targetX en pixel
     * @param {number} targetY en pixel
     * @param {number} speed en pixel
     * @param {number} damages
     */
    constructor(originX, originY, targetX, targetY, speed, damages) {
    // constructor(originX, originY, target, speed, damages) {
        /**
         * origine X du projectile
         * @type {number}
         */
        this.x = originX;
        /**
         * origine Y du projectile
         * @type {number}
         */
        this.y = originY;
        /**
         * origine X de la cible
         * @type {number}
         */
        this.tx = targetX;
        /**
         * origine Y de la cible
         * @type {number}
         */
        this.ty = targetY;
        /**
         * Vitesse du projectile
         * @type {number}
         */
        this.speed = speed;
        /**
         * Dégats du projectile
         * @type {number}
         */
        this.damages = damages;

        /**
         * Création du projectile
         * @type {HTMLDivElement}
         */
        this.element = this.createBullet();

        // Objet Monster => Monster.element.getBoundingClientRect() / Monster.getPosition()
        this.target = target;
    }

    /**
     * Génère une div avec la classe bullet, positionnée selon les coordonnées définies dans les paramètres (position de la tourelle tirant le projectile)
     *
     * @returns {HTMLDivElement}
     */
    createBullet() {
        const bullet = document.createElement('div');

        bullet.classList.add('bullet');

        bullet.style.left = `${this.x}px`;
        bullet.style.top = `${this.y}px`;

        document.body.appendChild(bullet);

        return bullet;
    }

    /**
     * Gestion du déplacement du projectile, selon la position et la distance le séparant de sa cible
     */
    moveBullet() {
        const delta = trajCalculation(this.x, this.y, this.tx, this.ty);

        if (delta.travelDistance < this.speed) {
            this.killBullet();
        } else {
            this.x = this.x + delta.x * this.speed;
            this.y = this.y + delta.y * this.speed;

            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }

    /**
     * Suppression du projectile dans le DOM
     */
    killBullet() {
        this.element.remove();
    }
}
