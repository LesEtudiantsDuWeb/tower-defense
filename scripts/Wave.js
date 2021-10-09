import Monster from './Monster.js';
import utils from './utils.js';

/**
 * La classe Wave gère l'ensemble de la vague.
 *
 * + generatePopMonsters() : Génère un tableau contenant l'ensemble des monstres de la vague.
 * + createEvents() : Génère les évènements de la vague
 * + launchWave() : Démarre la vague.
 */
export default class Wave {
    /**
     * @param {object} param
     * @param {number} param.id
     * @param {{ idMonster: number, quantity: number }[]} param.monsters
     * @param {number} param.gold
     * @param {number} param.difficulty
     * @param {object[]} param.jsonMonsters
     */
    constructor({ id, monsters, gold, difficulty, jsonMonsters, map }) {
        // Permet d'accéder facilement à l'instance de Map pour la route
        this.map = map;

        /******************************
         * Id de la vague
         * @type number
         */
        this.id = id;

        /******************************
         * Tableau des objects des monstres de la vague
         * NOTE : A voir si on garde ca par la suite, ca celà sert uniquement à générer
         * le tableau d'apparition des monstres
         * @type {{ idMonster: number; quantity: number }[]}
         */
        this.jsonWaveMonsters = monsters;

        /******************************
         * Tableau des objects des monstres
         * NOTE : A voir si on garde ca par la suite, ca celà sert uniquement à générer
         * le tableau d'apparition des monstres
         * @type object[]
         */
        this.jsonMonsters = jsonMonsters;

        /******************************
         * Or gagné par le joueur à la fin de la vague
         * @type number
         */
        this.gold = gold;

        /******************************
         * Difficulté de la vague. Plus la valeur est élevée, plus la vague est complexe.
         * @type number
         */
        this.difficulty = difficulty;

        /**
         * Contient l'ensemble des monstres de la vague.
         * @type Monster[]
         */
        this.arrPopMonsters = this.generatePopMonsters();
        console.log(this.arrPopMonsters);

        /**
         * Tableau contenant l'ensemble des monstres présent sur la map
         * @type Monster[]
         */
        this.arrMonstersInMap = [];
    }

    /**
     * Génère un tableau contenant l'ensemble des monstres de la vague. Si le monstre A doit
     * apparaitre 3 fois dans la vague, alors, il est 3 fois dans le tableau.
     *
     * Les propriétés de l'élément monsters du json ont le même nom que les attributs de la
     * classe Monster, ce qui permet d'instancier un Monster directement à partir des données
     * du json !
     *
     * L'utilisation du reverse sur le tableau permet que lorsque l'on ajoutera les monstres
     * sur la map, on pourra supprimer à partir du dernier élément plutot que le premier.
     * Ca simplifiera son utilisation.
     */
    generatePopMonsters() {
        return (
            this.jsonWaveMonsters
                // Fusionne les différents monstres en un seul tableau
                .reduce(
                    (arr, monster) => [
                        // Tableau qui sera retourné à la fin
                        ...arr,
                        // Génère un tableau de n éléments
                        ...Array.from(
                            // n éléments correspondant au nombre de monstres dans la vague
                            { length: monster.quantity },
                            // On récupère l'objet du monstre à partir de son id
                            () => new Monster(utils.getContentById(monster.idMonster, this.jsonMonsters)),
                        ),
                    ],
                    [],
                )
                // On inverse l'ordre du tableau
                .reverse()
        );
    }

    /**
     * Génère les évènements de la vague
     */
    createEvents() {
        this.popMonster();
    }

    /**
     * Démarre la vague
     */
    popMonster() {
        if (this.arrPopMonsters.length) {
            // Récupère le premier monstre du tableau d'apparition
            const monster = this.arrPopMonsters.pop();

            console.log('Vague', this.id, 'Apparition du monstre', monster);
            // Met à jour la route du monstre
            // NOTE : Actuellement, on considère qu'il n'y a qu'une route
            // Pas la suite, il faudra soit faire une wave par route, soit répartir
            // les monstres à travers les différentes routes
            monster.setRoute(this.map.getRoutes()[0]);
            // Met à jour la wave du monstre (permet d'avoir accès aux infos de la
            // wave et de la map directement dans le monstre)
            monster.setWave(this);
            // Démarre son mouvement en le placant sur la carte
            monster.initialPosition();

            this.arrMonstersInMap.push(monster);
        } else {
            // Wave terminée !
            setTimeout(() => {
                this.map.nextWave();
            },5000)
                
        }
    }

    updateStates(timestamp) {
        if (timestamp % 10 === 0) {
            this.popMonster();
        }
        this.arrMonstersInMap.forEach((monster) => monster.updateStates(timestamp));
    }
}
