/*
    7. Simplification de la création d'un objet **simple**, mais qui peut être instancié via des méthodes.
    L'objet créer sera un dé, ce dé peut prendre 3 formes différentes :
        - Un dé classique : 6 faces, ce dé peut être lancé et donne une valeur random entre 1 et 6 (inclus)
        - Un dé pipé : 6 faces mais ne fera uniquement que des 6
        - Un dé 9 faces : Ce dé peut être lancé et donne une valeur random entre 1 et 9 (inclus)
    Les méthodes attendues sont :
        - CreateClassicDice
        - CreateLoadedDice
        - CreateNineFaceDice
    Ces méthodes retournent un objet de type IDice (Interface du produit à créer)

    Design pattern : Factory Method

    Pourquoi ?
    Ce pattern est utile lorsqu'il y a besoin de créer des objets dérivés d'une classe de base commune, mais que
    la création exacte dépend d'une sous-classe ou d'une méthode spécifique. Dans ce cas, nous avons
    plusieurs types de dés (ClassicDice, LoadedDice, NineFaceDice) qui partagent une interface commune (IDice).
*/

interface IDice {
    roll(): number;
}

class ClassicDice implements IDice {
    roll(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
}

class LoadedDice implements IDice {
    roll(): number {
        return 6;
    }
}

class NineFaceDice implements IDice {
    roll(): number {
        return Math.floor(Math.random() * 9) + 1;
    }
}

class DiceFactory {
    static createClassicDice(): IDice {
        return new ClassicDice();
    }

    static createLoadedDice(): IDice {
        return new LoadedDice();
    }

    static createNineFaceDice(): IDice {
        return new NineFaceDice();
    }
}

const classicDice: IDice = DiceFactory.createClassicDice();
console.log('Classic Dice roll:', classicDice.roll()); // Entre 1 et 6 (inclus)

const loadedDice: IDice = DiceFactory.createLoadedDice();
console.log('Loaded Dice roll:', loadedDice.roll()); // 6

const nineFaceDice: IDice = DiceFactory.createNineFaceDice();
console.log('Nine Face Dice roll:', nineFaceDice.roll()); // Entre 1 et 9 (inclus)
