/*
    1. Gestion de la présence d'une et une seule responsable de promotion,
    cette responsable de promotion reste le même objet toute la durée de vie de l'application.
    Il doit tout de même être possible de modifier le nom de la responsable sans instancier un nouvel objet.

    Design pattern : Singleton

    Pourquoi ?
    La problématique décrit la nécessité d'une et une seule responsable de promotion,
    ce qui correspond parfaitement au but du Singleton : garantir qu'une classe n'a qu'une seule instance.
    Le Singleton permet également de fournir un point d'accès global à cette instance,
    ce qui est utile pour accéder à la responsable de promotion de n'importe où dans l'application.
*/

class PromotionLeader {
    private static instance: PromotionLeader;
    private name: string;

    private constructor(name: string) {
        this.name = name;
    }

    public static getInstance(name?: string): PromotionLeader {
        if (!PromotionLeader.instance) {
            if (name) {
                PromotionLeader.instance = new PromotionLeader(name);
            } else {
                throw new Error("PromotionLeader is not yet initialized. Please provide a name.");
            }
        }
        return PromotionLeader.instance;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

const leader = PromotionLeader.getInstance("Alice");
console.log(leader.getName()); // Alice

leader.setName("Bob");
console.log(leader.getName()); // Bob

const sameLeader = PromotionLeader.getInstance();
console.log(sameLeader.getName()); // Bob
console.log(leader.getName()); // Bob