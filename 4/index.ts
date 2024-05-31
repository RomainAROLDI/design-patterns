/*
    4. Mettre à disposition un code permettant d'ajouter des éléments à un sapin de Noël, par exemple,
    des guirlandes, des boules, des étoiles, des petits anges. Vous devez être en mesure de compter le nombre
    d'éléments qui sont ajoutés au sapin (sans les différencier, s'il y a 2 guirlandes, 1 étoile, 3 boules,
    votre code doit retourner : "6 éléments sont présents sur le sapin").

    Design pattern : Decorator

    Pourquoi ?
    La problématique décrit la nécessité d'ajouter dynamiquement des éléments au sapin de Noël ainsi que
    de pouvoir compter leur nombre. Le pattern Decorator permet d'ajouter des fonctionnalités à un objet de manière
    flexible et dynamique.
*/

interface ChristmasTree {
    getDescription(): string;

    getNumberOfDecorations(): number;
}

class ConcreteChristmasTree implements ChristmasTree {
    public getDescription(): string {
        return "Christmas Tree";
    }

    public getNumberOfDecorations(): number {
        return 0;
    }
}

abstract class TreeDecorator implements ChristmasTree {
    protected decoratedTree: ChristmasTree;

    constructor(tree: ChristmasTree) {
        this.decoratedTree = tree;
    }

    public getDescription(): string {
        return this.decoratedTree.getDescription();
    }

    public getNumberOfDecorations(): number {
        return this.decoratedTree.getNumberOfDecorations();
    }
}

class GarlandDecorator extends TreeDecorator {
    public getDescription(): string {
        return `${this.decoratedTree.getDescription()}, Garland`;
    }

    public getNumberOfDecorations(): number {
        return this.decoratedTree.getNumberOfDecorations() + 1;
    }
}

class BallDecorator extends TreeDecorator {
    public getDescription(): string {
        return `${this.decoratedTree.getDescription()}, Ball`;
    }

    public getNumberOfDecorations(): number {
        return this.decoratedTree.getNumberOfDecorations() + 1;
    }
}

class StarDecorator extends TreeDecorator {
    public getDescription(): string {
        return `${this.decoratedTree.getDescription()}, Star`;
    }

    public getNumberOfDecorations(): number {
        return this.decoratedTree.getNumberOfDecorations() + 1;
    }
}

class AngelDecorator extends TreeDecorator {
    public getDescription(): string {
        return `${this.decoratedTree.getDescription()}, Angel`;
    }

    public getNumberOfDecorations(): number {
        return this.decoratedTree.getNumberOfDecorations() + 1;
    }
}

let tree: ChristmasTree = new ConcreteChristmasTree();
console.log(tree.getDescription()); // Christmas Tree
console.log(`${tree.getNumberOfDecorations()} éléments sont présents sur le sapin.`); // 0 éléments sont présents sur le sapin.

tree = new GarlandDecorator(tree);
tree = new BallDecorator(tree);
tree = new StarDecorator(tree);
tree = new AngelDecorator(tree);
tree = new BallDecorator(tree);

console.log(tree.getDescription()); // Christmas Tree, Garland, Ball, Star, Angel, Ball
console.log(`${tree.getNumberOfDecorations()} éléments sont présents sur le sapin.`); // 5 éléments sont présents sur le sapin.
