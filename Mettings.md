- Langages utilisés et framework/librairies:
    - JS
    - SASS
    - Github
    - NPM / Yarn
    - Si back, Express avec Socket.io ou autre ?
    - Données conservées dans un json

- Sémantique:
    - Ecriture des noms de:
        - fonctions : Camel case
        - classes : BEM (https://karac.ch/blog/organisation-et-convention-nommage-css)
        - variables : Camel case
    - Commenter les fonctions
    - 1 fonction => 1 action
    - Eviter les fonctions dans les fonctions
    - POO

- Objectifs du projets:
    - Multiplayer ? Player vs player ? Players vs Ordi ?

    - Système de connexion - Sauvegardes

    - Possibilité de passer la vague => or en contre partie

    - Génération de map aléatoire / à la main

    - Interface :
        - gestion pause : pause par défaut
        - liste des tirs tirés

    - Map :
        - Grid (canvas ou pas ? potentiellement non, à voir)
        - Route pour les monstres
        - 1 à plusieurs points de départ
        - 1 à plusieurs points d'arrivée
        - Taille dynamique :
            - largeur
            - longueur
            => Géré par un tableau imbriqué
                Tableau contenant les lignes, tableau de ligne contenant les cases
        - Nombre de vagues
        - Délai d'attente entre chaque vague
        - Génération de la map de facon procédurale : 
            - Nombre de cases constructibles
            - Nombre de points de départ
            - Taille de la carte
            - Distance des tourelles par rapport à la route
            - Taux route/décors

    - Cases :
        - Type de case : route, constructible, tourelle, point départ, point arrivée, décors (eau)
        - Case constructible => events
            - Construction tourelle
        - Case tourelle => events
            - Amélioration : cout => bonus
            - Destruction : ristourne
            - Choisir le focus : par défaut le plus proche ou au choix : 
                - le plus de pv
                - le plus rapide
                - volante
                - ...
    - Tours :
        - Portée
        - Vitesse de tirs
        - Tir terrestre, aérien ou les 2 (sous-marin)
        - Cout
        - Dégâts
        - Améliorations
        - Monocible ou zone d'effet
        - Effets on hit : givre, brulure, poison
        - Tirs : balle attirée vers le monstre
        - Type de tours : caserne => Défense ?
    - Joueurs :
        - Argent de départ
        - Nombre points de vie
        - Défense ?
        - Sorts ???
        - RPG : Points de compétences / Arbre de compétences
        - Gérer des héros (meme système que caserne)
    - Monstres :
        - Vitesse de dépla
        - PV (Défense ?)
        - Monstre volant ou pas
        - Dégâts (si caserne ou héros et/ou nexus)
        - Or rapporté
        - Type de monstre : lambda, élite, boss
    - Vagues :
        - 1 ou plusieurs types de monstres
        - Quantité de chaque monstre
        - Or rapporté en complétion
        - Apparitions des monstres =>
            - par type ? mélangé ? synchrone ou async ?
            - délai ???
        - difficulté (pour la génération aléatoire)

        Exemple : 2 monstres A, 3 monstres B
            Solution mélangé : Solution 1 ???
                1 : Générer la pile au début avec tous les monstres => 1 seul pile avec son event
                    Délai après chaque monstre (Délai dans Vague)
                2 : 1 pile par type => chaque pile a son event
                    Délai par type de monstre (Délai dans Monstre)

    - Balle : 
        - Dégâts
        - Vitesse
        - Effet on hit
        - Cible
        - Events : collision et création/suppression

- Etapes :
    - Faire une route droite, avec 1 point de départ et d'arrivée



JSON pour Step 1
{
    player:{
        startGold: number,
        startLife: number,
    },
    map:[{
        tiles: number[][],
        waves: number[],
    }],
    tiles:[{
        type: number,
        name: string, // pour nous y retrouver
        events: void[],
    }],
    towers:[{
        id: number,
        name: string,
        cost: number,
        speed: number,
        damages: number,
    }],
    monsters:[{
        id: number,
        name: string,
        speed: number,
        life: number,
        gold: number,
        damages: number,
    }],
    waves:[{
        id: number,
        monsters: {idMonster, quantity}[],
        difficulty: number,
        gold: number,
    }],
}