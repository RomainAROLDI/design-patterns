/*
    5. Vous avez plusieurs types d'étudiants : Le bon, le mauvais, le moyen. Chaque étudiant peut avoir un
    comportement sur la journée de cours : Rêvasser, Attentionné, Questionneur, Dormeur, Absent.
    Vous devez faire en sorte de pouvoir composer entre n'importe quel type d'étudiant et n'importe quel
    comportement directement à la compilation. Donc il peut y avoir un étudiant fort qui rêvasse,
    un étudiant moyen qui dort, un étudiant mauvais qui questionne, etc...
    Tout ça sans multiplier les classes. (Attention, on parle d'ajout de comportement, ne vous trompez pas de pattern)

    Design pattern : Strategy

    Pourquoi ?
    La problématique nécessite de pouvoir combiner dynamiquement des comportements variés avec différents types
    d'étudiants sans multiplier les classes. Le pattern Strategy permet de définir des comportements
    (rêvasser, être attentif, etc.) de manière interchangeable et de les associer à des types d'étudiants
    (bon, moyen, mauvais) de façon flexible.
*/

interface Behavior {
    behave(): void;
}

class Dreaming implements Behavior {
    public behave(): void {
        console.log("Dreaming...");
    }
}

class Attentive implements Behavior {
    public behave(): void {
        console.log("Being attentive...");
    }
}

class Questioning implements Behavior {
    public behave(): void {
        console.log("Asking questions...");
    }
}

class Sleeping implements Behavior {
    public behave(): void {
        console.log("Sleeping...");
    }
}

class Absent implements Behavior {
    public behave(): void {
        console.log("Absent...");
    }
}

interface StudentType {
    study(): void;
}

class GoodStudent implements StudentType {
    public study(): void {
        console.log("Studying effectively...");
    }
}

class AverageStudent implements StudentType {
    public study(): void {
        console.log("Studying moderately...");
    }
}

class BadStudent implements StudentType {
    public study(): void {
        console.log("Struggling with studying...");
    }
}

class Student {
    private studentType: StudentType;
    private behavior: Behavior;

    constructor(studentType: StudentType, behavior: Behavior) {
        this.studentType = studentType;
        this.behavior = behavior;
    }

    public performStudy(): void {
        this.studentType.study();
    }

    public performBehavior(): void {
        this.behavior.behave();
    }

    public setBehavior(behavior: Behavior): void {
        this.behavior = behavior;
    }
}

const goodStudentDreaming = new Student(new GoodStudent(), new Dreaming());
const averageStudentSleeping = new Student(new AverageStudent(), new Sleeping());
const badStudentQuestioning = new Student(new BadStudent(), new Questioning());

goodStudentDreaming.performStudy(); // Studying effectively...
goodStudentDreaming.performBehavior(); // Dreaming...
goodStudentDreaming.setBehavior(new Absent()); // Changement de comportement
goodStudentDreaming.performBehavior(); // Absent...

averageStudentSleeping.performStudy(); // Studying moderately...
averageStudentSleeping.performBehavior(); // Sleeping...
averageStudentSleeping.setBehavior(new Attentive()); // Changement de comportement
averageStudentSleeping.performBehavior(); // Being attentive...

badStudentQuestioning.performStudy(); // Struggling with studying...
badStudentQuestioning.performBehavior(); // Asking questions...
badStudentQuestioning.setBehavior(new Dreaming()); // Changement de comportement
badStudentQuestioning.performBehavior(); // Dreaming...
