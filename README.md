# Design Patterns 🧩

## Table of Contents 📚

- [Introduction 📖](#introduction-)
    - [Prérequis et installation](#prérequis-et-installation)
    - [Classification des patterns](#classification-des-patterns)
    - [Principes à respecter](#principes-à-respecter)
    - [Rappel de certaines notions importantes](#rappel-de-certaines-notions-objets-importantes)
    - [Attention](#attention)
- [Creational Patterns 🏗️](#creational-patterns-)
    - [Singleton](#singleton)
    - [Factory Method](#factory-method)
    - [Builder](#builder)
    - [Prototype](#prototype)
- [Structural Patterns 🧱](#structural-patterns-)
    - [Adapter](#adapter)
    - [Bridge](#bridge)
    - [Composite](#composite)
    - [Decorator](#decorator)
    - [Facade](#facade)
    - [Flyweight](#flyweight)
    - [Proxy](#proxy)
- [Behavioral Patterns 🧠](#behavioral-patterns-)
    - [Chain of Responsibility](#chain-of-responsibility)
    - [Command](#command)
    - [Iterator](#iterator)
    - [Interpretor](#interpretor)
    - [Mediator](#mediator)
    - [Memento](#memento)
    - [Observer](#observer)
    - [State](#state)
    - [Strategy](#strategy)
    - [Template Method](#template-method)
    - [Visitor](#visitor)

## Introduction 📖

### Prérequis et installation

Afin d'exécuter les différents fichiers TypeScript, vous aurez besoin de [Bun](https://bun.sh) (>= v1.1.10).

Pour installer les dépendances :

```bash
bun install
```

Pour exécuter un fichier :

```bash
bun run {chemin_du_fichier}
```

### Classification des patterns

#### **Patterns créateurs** (Singleton, factory, abstract factory)

Patterns aidant à la gestion de la création d’objet

#### **Patterns structurants** (Façade, proxy, decorator, composite, adapter)

On parle de travailler sur la partie externe des classes du pattern. L’extensibilité et l’encapsulation des classes.

#### **Patterns comportementaux** (Strategy, iterator, observer, state)

Ici, on travaille sur la partie interne des classes du pattern. La dynamique des classes du pattern. Améliorer la qualité du code, éviter les duplications ou gérer des problématiques connues.

### Principes à respecter

#### **Principe n°1**

Favoriser la composition (liens dynamiques, flexibles) sur l’héritage (lien statique, peu flexible)
Attention il s’agit juste de favoriser car l’héritage est également très utilisé dans les designs patterns

#### **Principe n°2**

Le code utilisateur d’un pattern doit en priorité TOUJOURS se lier à des abstractions (interfaces, classes abstraites) plutôt qu’à des implémentations concrètes (classes)

#### **Principe n°3**

Privilégier l’encapsulation faible / découplage fort.

### Rappel de certaines notions objets importantes

La mise en place de Design Pattern va nécessiter des notions objets simples mais importante pour la compréhension de ces derniers. Nous allons revoir rapidement :

- Héritage
- Interface
- Composition
- Agrégation
- Classe abstraite

#### **Héritage**
L'héritage permet de partager des propriétés et méthodes entre les classes, il suffit d'utiliser le mot clé extends pour que cette classe (fille) hérite de la classe de base (mère).

Le partage de code s'effectue de manière descendante uniquement.

#### **Interface**
Une interface est un contrat qui définit les méthodes que les classes qui l'implémentent doivent respecter. Une interface ne contient que des signatures de méthodes, pas de corps.

#### **Composition**
La composition est un principe de base de la programmation orientée objet qui permet de créer des objets complexes à partir d'objets plus simples.

Une composition est une agrégation particulière : toutes les instances de B contenues dans A sont supprimées lorsque A est supprimée.

#### **Agrégation**
L'agrégation est un type de composition qui permet de créer des objets complexes à partir d'objets plus simples. La différence avec la composition est que les objets agrégés peuvent exister indépendamment de l'objet agrégateur.

Une association traduit un lien entre une classe A et une classe B (appel de méthode par exemple).

L'agrégation est une association particulière : l'objet A possède une ou plusieurs instances de B.

#### **Classe abstraite**
Une classe abstraite est une classe qui ne peut pas être instanciée. Elle sert de modèle pour les classes qui en héritent. Elle peut contenir des méthodes abstraites (sans corps) qui doivent être implémentées par les classes filles.

Une classe abstraite (mère) permet de définir les signatures des méthodes et les propriétés qui seront partagés à la classe qui va étendre cette classe abstraite (fille)

L'intérêt principal des classes abstraites est d’informer l’utilisateur (la classe fille) de cette classe qu’une instance de cette dernière n’a pas d’utilité a être instanciée. Exemple : vous devez gérer un centre de location de véhicules (voiture, camion, vélo ….). Vous avez très certainement une classe Vehicule, dont héritera Velo, Voiture, Camion…

Mais le centre de location n'aura jamais besoin d'instancier un Vehicule.

> Les classes abstraites peuvent également posséder des méthodes abstraites. Ce sont des méthodes qui ne possèdent pas de corps, et qui devront obligatoirement être surchargée par les classes qui en hérite

### Attention

Petite attention particulière sur la surutilisation : même quand vous aurez l’habitude d’utiliser les design patterns…

Le but des patterns est de répondre à une problématique de code par une conception adaptée ET PAS rendre la conception plus complexe pour mettre des patterns juste parce qu’on veut absolument mettre des patterns partout.

C’est assez effrayant le nombre de développeurs en entreprise qui font ça, de mon expérience, je dirai qu’environ 10% des développeurs que j’ai connu avaient ce syndrome. Travailler avec eux était d’autant plus compliqué que leur syndrome était avancé !
Car ils ajoutent une complexité non négligeable à un projet et ensuite pour faire intervenir une ressource non expérimentée et bien… ça fini souvent avec quelqu'un en pleure avant même d’avoir écrit une ligne de code.

Pour appuyer mes propos, imaginez, nous avons vu une architecture MVC (en 3 couches), y ajouter des patterns n’est déjà pas toujours évident, même si les patterns que l’on a vu s’adaptent bien à l’architecture MVC.

D’autres architectures existent, par exemple SOA, qui est une architecture orientée services. Cette architecture contient, en moyenne pour une utilisation normale, entre 10 et 12 couches. Là, on parle d’une complexité déjà impactante en termes d’architecture…

Ajoutez une surutilisation de patterns et seuls les développeurs séniors seront capables de travailler sur ce projet (mais ça ne donnera envie à personne…)

> Evitez absolument la complexité dans vos développements, un pattern n'a d'avantage que s'il est employé correctement

## Creational Patterns 🏗️

### Singleton

Le pattern Singleton permet de garantir qu’une classe n’a qu’une seule instance et fournit un point d’accès global à cette instance.

```typescript
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}
```

#### Exemple d'utilisation :

```typescript
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true
```

#### Explication :

- La classe Singleton possède un attribut statique `instance` qui contiendra l'instance unique de la classe.
- Le constructeur de la classe est privé pour empêcher l'instanciation de la classe en dehors de la classe elle-même.
- La méthode statique `getInstance` permet de récupérer l'instance unique de la classe. Si l'instance n'existe pas, on la crée.

### Factory Method

Le pattern Factory Method définit une interface pour créer un objet, mais laisse les sous-classes décider de la classe à instancier.

```typescript
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  operation(): string {
    return 'ConcreteProductA';
  }
}

class ConcreteProductB implements Product {
  operation(): string {
    return 'ConcreteProductB';
  }
}

abstract class Creator {
  abstract factoryMethod(): Product;

  operation(): string {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(creator: Creator) {
  console.log(creator.operation());
}

clientCode(new ConcreteCreatorA());
clientCode(new ConcreteCreatorB());
```

#### Explication :

- L'interface `Product` définit les méthodes que les produits concrets doivent implémenter.
- Les classes `ConcreteProductA` et `ConcreteProductB` sont les produits concrets qui implémentent l'interface `Product`.
- La classe abstraite `Creator` définit la méthode `factoryMethod` qui doit être implémentée par les classes filles.
- Les classes `ConcreteCreatorA` et `ConcreteCreatorB` sont les créateurs concrets qui implémentent la méthode `factoryMethod` pour créer des produits concrets.
- La fonction `clientCode` prend un créateur en paramètre et utilise la méthode `operation` pour créer un produit et exécuter une opération.

### Abstract Factory

Le pattern Abstract Factory fournit une interface pour créer des familles d’objets liés ou dépendants sans spécifier leurs classes concrètes.

```typescript
interface AbstractFactory {
  createProductA(): ProductA;
  createProductB(): ProductB;
}

interface ProductA {
  operationA(): string;
}

interface ProductB {
  operationB(): string;
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA(): ProductA {
    return new ConcreteProductA1();
  }

  createProductB(): ProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA(): ProductA {
    return new ConcreteProductA2();
  }

  createProductB(): ProductB {
    return new ConcreteProductB2();
  }
}

class ConcreteProductA1 implements ProductA {
  operationA(): string {
    return 'ConcreteProductA1';
  }
}

class ConcreteProductB1 implements ProductB {
  operationB(): string {
    return 'ConcreteProductB1';
  }
}

class ConcreteProductA2 implements ProductA {
  operationA(): string {
    return 'ConcreteProductA2';
  }
}

class ConcreteProductB2 implements ProductB {
  operationB(): string {
    return 'ConcreteProductB2';
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productA.operationA());
  console.log(productB.operationB());
}

clientCode(new ConcreteFactory1());
clientCode(new ConcreteFactory2());
```

#### Explication :

- L'interface `AbstractFactory` définit les méthodes pour créer des produits de famille.
- Les interfaces `ProductA` et `ProductB` définissent les méthodes que les produits concrets doivent implémenter.
- Les classes `ConcreteFactory1` et `ConcreteFactory2` sont les usines concrètes qui implémentent l'interface `AbstractFactory` pour créer des produits concrets.
- Les classes `ConcreteProductA1`, `ConcreteProductB1`, `ConcreteProductA2` et `ConcreteProductB2` sont les produits concrets qui implémentent les interfaces `ProductA` et `ProductB`.
- La fonction `clientCode` prend une usine en paramètre et utilise les méthodes `createProductA` et `createProductB` pour créer des produits de famille et exécuter des opérations.

### Builder

Le pattern Builder permet de construire des objets complexes étape par étape. Il permet de produire différents types et représentations d’un objet en utilisant le même code de construction.

```typescript
class Product {
  private parts: string[] = [];

  add(part: string): void {
    this.parts.push(part);
  }

  listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  private product: Product;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.product = new Product();
  }

  producePartA(): void {
    this.product.add('PartA1');
  }

  producePartB(): void {
    this.product.add('PartB1');
  }

  producePartC(): void {
    this.product.add('PartC1');
  }

  getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}
```

#### Exemple d'utilisation :

```typescript
const director = new Director();
const builder = new ConcreteBuilder1();

director.setBuilder(builder);
director.buildMinimalViableProduct();
builder.getProduct().listParts();

director.buildFullFeaturedProduct();
builder.getProduct().listParts();
```

#### Explication :

- La classe `Product` est l'objet complexe que nous voulons construire.
- L'interface `Builder` définit les méthodes pour construire différentes parties de l'objet.
- La classe `ConcreteBuilder1` est le constructeur concret qui implémente l'interface `Builder` pour construire un produit concret.
- La classe `Director` est responsable de la construction de l'objet en utilisant le constructeur.

### Prototype

Le pattern Prototype permet de cloner un objet existant sans dépendre de sa classe ou de ses instances.

```typescript
interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype1 implements Prototype {
  clone(): Prototype {
    return new ConcretePrototype1();
  }
}

class ConcretePrototype2 implements Prototype {
  clone(): Prototype {
    return new ConcretePrototype2();
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(proto: Prototype) {
  const prototype = proto.clone();
}

const prototype1 = new ConcretePrototype1();
clientCode(prototype1);

const prototype2 = new ConcretePrototype2();
clientCode(prototype2);
```

#### Explication :

- L'interface `Prototype` définit la méthode `clone` pour cloner un objet.
- Les classes `ConcretePrototype1` et `ConcretePrototype2` implémentent l'interface `Prototype` pour cloner des objets concrets.
- La fonction `clientCode` prend un prototype en paramètre et utilise la méthode `clone` pour cloner l'objet.

## Structural Patterns 🧱

### Adapter

Le pattern Adapter permet de convertir l’interface d’une classe en une autre interface que le client attend. Il permet à des classes de travailler ensemble alors qu’elles n’auraient pas pu autrement en raison d’interfaces incompatibles.

```typescript
interface Target {
  request(): string;
}

class Adaptee {
  specificRequest(): string {
    return 'Adaptee';
  }
}

class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): string {
    return `Adapter: (TRANSLATED) ${this.adaptee.specificRequest()}`;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(target: Target) {
  console.log(target.request());
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

clientCode(adapter);
```

#### Explication :

- L'interface `Target` définit la méthode `request` que le client utilise.
- La classe `Adaptee` a une méthode `specificRequest` que le client ne peut pas utiliser directement.
- La classe `Adapter` implémente l'interface `Target` et utilise l'objet `Adaptee` pour adapter l'interface.

### Bridge

Le pattern Bridge permet de découpler une abstraction de son implémentation afin que les deux puissent varier indépendamment.

```typescript
interface Implementor {
  operationImplementation(): string;
}

class ConcreteImplementorA implements Implementor {
  operationImplementation(): string {
    return 'ConcreteImplementorA';
  }
}

class ConcreteImplementorB implements Implementor {
  operationImplementation(): string {
    return 'ConcreteImplementorB';
  }
}

abstract class Abstraction {
  protected implementor: Implementor;

  constructor(implementor: Implementor) {
    this.implementor = implementor;
  }

  operation(): string {
    return `Abstraction: Base operation with:\n${this.implementor.operationImplementation()}`;
  }
}

class ExtendedAbstraction extends Abstraction {
  operation(): string {
    return `ExtendedAbstraction: Extended operation with:\n${this.implementor.operationImplementation()}`;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementor = new ConcreteImplementorA();
let abstraction = new Abstraction(implementor);
clientCode(abstraction);

implementor = new ConcreteImplementorB();
abstraction = new ExtendedAbstraction(implementor);
clientCode(abstraction);
```

#### Explication :

- L'interface `Implementor` définit la méthode `operationImplementation` qui sera implémentée par les classes concrètes.
- Les classes `ConcreteImplementorA` et `ConcreteImplementorB` implémentent l'interface `Implementor` pour fournir une implémentation concrète.
- La classe `Abstraction` a une référence à l'interface `Implementor` et fournit une méthode `operation` qui appelle la méthode `operationImplementation` de l'implémentation.
- La classe `ExtendedAbstraction` étend `Abstraction` pour fournir une autre méthode `operation`.

### Composite

Le pattern Composite permet de composer des objets dans une structure d’arbre pour représenter une hiérarchie tout en traitant les objets individuels et les compositions d’objets de manière uniforme.

```typescript
abstract class Component {
  protected parent: Component;

  setParent(parent: Component): void {
    this.parent = parent;
  }

  getParent(): Component {
    return this.parent;
  }

  add(component: Component): void {}

  remove(component: Component): void {}

  isComposite(): boolean {
    return false;
  }

  abstract operation(): string;
}

class Leaf extends Component {
  operation(): string {
    return 'Leaf';
  }
}

class Composite extends Component {
  protected children: Component[] = [];

  add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  isComposite(): boolean {
    return true;
  }

  operation(): string {
    const results = this.children.map((child) => child.operation());
    return `Branch(${results.join('+')})`;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
```

#### Explication :

- La classe `Component` définit l'interface des objets de la composition.
- La classe `Leaf` représente les objets finaux de la composition qui n'ont pas d'enfants.
- La classe `Composite` représente les objets qui ont des enfants. Il implémente des méthodes pour ajouter, supprimer des enfants et pour obtenir des informations sur les enfants.
- Les méthodes `operation` des classes `Leaf` et `Composite` sont utilisées pour obtenir des informations sur les objets.

### Decorator

Le pattern Decorator permet d’ajouter de nouvelles fonctionnalités à un objet existant sans altérer sa structure.

```typescript
interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  operation(): string {
    return 'ConcreteComponent';
  }
}

class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
```

#### Explication :

- L'interface `Component` définit la méthode `operation` qui sera implémentée par les classes concrètes.
- La classe `ConcreteComponent` implémente l'interface `Component` pour fournir une implémentation concrète.
- La classe `Decorator` implémente l'interface `Component` et a une référence à l'interface `Component`. Elle fournit une implémentation par défaut de la méthode `operation` qui appelle la méthode `operation` de l'objet encapsulé.
- Les classes `ConcreteDecoratorA` et `ConcreteDecoratorB` étendent la classe `Decorator` pour fournir des implémentations spécifiques de la méthode `operation`.

### Facade

Le pattern Facade fournit une interface unifiée pour un ensemble d’interfaces dans un sous-système. Il définit une interface de niveau supérieur qui facilite l’utilisation du sous-système.

```typescript
class Subsystem1 {
  operation1(): string {
    return 'Subsystem1: operation1';
  }

  operation2(): string {
    return 'Subsystem1: operation2';
  }
}

class Subsystem2 {
  operation1(): string {
    return 'Subsystem2: operation1';
  }

  operation2(): string {
    return 'Subsystem2: operation2';
  }
}

class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1, subsystem2: Subsystem2) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  operation(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operation2();
    result += this.subsystem2.operation2();
    return result;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(facade: Facade) {
  console.log(facade.operation());
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```

#### Explication :

- Les classes `Subsystem1` et `Subsystem2` implémentent des fonctionnalités spécifiques du sous-système.
- La classe `Facade` fournit une interface simple pour le sous-système. Elle utilise les classes du sous-système pour implémenter des fonctionnalités plus complexes.

### Flyweight

Le pattern Flyweight permet de réduire la redondance lorsqu’un grand nombre d’objets partagent des données identiques.

```typescript
class Flyweight {
  private sharedState: string;

  constructor(sharedState: string) {
    this.sharedState = sharedState;
  }

  operation(uniqueState: string): string {
    return `Flyweight: Displaying shared (${this.sharedState}) and unique (${uniqueState}) state.`;
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[]) {
    initialFlyweights.forEach((state) => {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    });
  }

  private getKey(state: string): string {
    return state;
  }

  getFlyweight(sharedState: string): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Can’t find a flyweight, creating new one.');
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }

    return this.flyweights[key];
  }

  listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}
```

#### Exemple d'utilisation :

```typescript
const factory = new FlyweightFactory(['A', 'B', 'C']);
factory.listFlyweights();

const flyweight1 = factory.getFlyweight('A');
flyweight1.operation('X');

const flyweight2 = factory.getFlyweight('B');
flyweight2.operation('Y');

factory.listFlyweights();
```

#### Explication :

- La classe `Flyweight` contient l’état partagé entre plusieurs objets.
- La classe `FlyweightFactory` stocke les objets `Flyweight` et les fournit aux clients. Si un objet `Flyweight` n’existe pas, la fabrique en crée un nouveau.
- Les clients demandent des objets `Flyweight` à la fabrique et leur passent l’état unique.

### Proxy

Le pattern Proxy permet de fournir un substitut ou un espace réservé pour un autre objet afin de contrôler l’accès à cet objet.

```typescript
interface Subject {
  request(): string;
}

class RealSubject implements Subject {
  request(): string {
    return 'RealSubject: Handling request.';
  }
}

class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  request(): string {
    if (this.checkAccess()) {
      return this.realSubject.request();
    }
    return 'Proxy: Access denied.';
  }

  private checkAccess(): boolean {
    return true;
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(subject: Subject) {
  console.log(subject.request());
}

const realSubject = new RealSubject();
clientCode(realSubject);

const proxy = new Proxy(realSubject);
clientCode(proxy);
```

#### Explication :

- L’interface `Subject` déclare les opérations communes pour `RealSubject` et `Proxy`.
- `RealSubject` contient la logique métier réelle.
- `Proxy` contrôle l’accès à `RealSubject` et peut effectuer des tâches supplémentaires avant ou après l’accès à `RealSubject`.
- Le client utilise `Proxy` pour interagir avec `RealSubject`.

## Behavioral Patterns 🧠

### Chain of Responsibility

Le pattern Chain of Responsibility permet de passer une demande le long d’une chaîne de traitements. Chaque maillon de la chaîne peut décider de traiter la demande ou de la transmettre au maillon suivant.

```typescript
abstract class Handler {
  private nextHandler: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class ConcreteHandler1 extends Handler {
  handle(request: string): string {
    if (request === 'one') {
      return 'ConcreteHandler1: Handled the request.';
    }
    return super.handle(request);
  }
}

class ConcreteHandler2 extends Handler {
  handle(request: string): string {
    if (request === 'two') {
      return 'ConcreteHandler2: Handled the request.';
    }
    return super.handle(request);
  }
}
```

#### Exemple d'utilisation :

```typescript
function clientCode(handler: Handler) {
  ['one', 'two', 'three'].forEach((request) => {
    console.log(`Client: Who wants to handle request '${request}'?`);
    const result = handler.handle(request);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${request} was left untouched.`);
    }
  });
}

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
handler1.setNext(handler2);

clientCode(handler1);
```

#### Explication :

- La classe `Handler` déclare une méthode pour construire la chaîne de maillons et une méthode pour traiter les demandes.
- Les classes `ConcreteHandler` implémentent la logique de traitement. Si elles ne peuvent pas traiter la demande, elles la transmettent au maillon suivant.
- Le client construit la chaîne de maillons et envoie les demandes à la première maillon.

### Command

Le pattern Command encapsule une requête en tant qu’objet, ce qui permet de paramétrer des clients avec différentes requêtes, de mettre en file d’attente des requêtes, de journaliser des requêtes et d’annuler des opérations.

```typescript
interface Command {
  execute(): string;
}

class SimpleCommand implements Command {
  execute(): string {
    return 'SimpleCommand: Execute';
  }
}

class ComplexCommand implements Command {
  private receiver: Receiver;
  private a: string;
  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute(): string {
    return this.receiver.doSomething(this.a) + this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  doSomething(a: string): string {
    return `Receiver: Working on (${a}.)`;
  }

  doSomethingElse(b: string): string {
    return `Receiver: Also working on (${b}.)`;
  }
}

class Invoker {
  private onStart: Command;
  private onFinish: Command;

  setOnStart(command: Command): void {
    this.onStart = command;
  }

  setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  doSomethingImportant(): string {
    let result = 'Invoker: Does something important.';
    if (this.onStart) {
      result += this.onStart.execute();
    }
    if (this.onFinish) {
      result += this.onFinish.execute();
    }
    return result;
  }
}
```

#### Exemple d'utilisation :

```typescript
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand());
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

console.log(invoker.doSomethingImportant());
```

#### Explication :

- L’interface `Command` déclare une méthode pour exécuter une commande.
- Les classes `SimpleCommand` et `ComplexCommand` implémentent la logique de la commande.
- La classe `Receiver` contient la logique métier.
- La classe `Invoker` exécute les commandes et peut les paramétrer.

### Interpreter

Le pattern Interpreter permet d’évaluer une grammaire ou une expression.

```typescript
interface AbstractExpression {
  interpret(context: Context): string;
}

class TerminalExpression implements AbstractExpression {
  interpret(context: Context): string {
    return 'TerminalExpression: Interpret';
  }
}
```

#### Exemple d'utilisation :

```typescript
const context = new Context();
const list = [];

list.push(new TerminalExpression());
list.push(new NonterminalExpression());
list.push(new TerminalExpression());
list.push(new TerminalExpression());

list.forEach((item) => {
  console.log(item.interpret(context));
});

console.log(context.output);
```

#### Explication :

- L’interface `AbstractExpression` déclare une méthode pour interpréter une expression.
- Les classes `TerminalExpression` et `NonterminalExpression` implémentent la logique d’interprétation.
- La classe `Context` contient les données partagées entre les expressions.
- Le client construit une syntaxe arborescente et l’évalue.
- Les expressions stockent les résultats dans le contexte.
- Le client récupère les résultats du contexte.
- Le pattern Interpreter est rarement utilisé en JavaScript.

### Iterator

Le pattern Iterator permet de parcourir les éléments d’une collection sans exposer la structure interne de la collection.

```typescript
interface Iterator {
  current(): any;
  next(): any;
  key(): number;
  valid(): boolean;
}

interface Aggregator {
  getIterator(): Iterator;
}

class ConcreteIterator implements Iterator {
  private collection: any[] = [];
  private position: number = 0;

  constructor(collection: any[]) {
    this.collection = collection;
  }

  current(): any {
    return this.collection[this.position];
  }

  next(): any {
    const item = this.collection[this.position];
    this.position += 1;
    return item;
  }

  key(): number {
    return this.position;
  }

  valid(): boolean {
    return this.position < this.collection.length;
  }
}

class Numbers implements Aggregator {
  private collection: number[] = [];

  constructor(collection: number[]) {
    this.collection = collection;
  }

  getIterator(): Iterator {
    return new ConcreteIterator(this.collection);
  }
}
```

#### Exemple d'utilisation :

```typescript
const numbers = new Numbers([1, 2, 3, 4, 5]);
const iterator = numbers.getIterator();

while (iterator.valid()) {
  console.log(iterator.next());
}
```

#### Explication :

- L’interface `Iterator` déclare des méthodes pour parcourir une collection.
- L’interface `Aggregator` déclare une méthode pour obtenir un itérateur.
- La classe `ConcreteIterator` implémente la logique de parcours.
- La classe `Numbers` implémente la logique de la collection.
- Le client utilise l’itérateur pour parcourir la collection.

### Interpretor

Le pattern Interpreter permet d’évaluer une grammaire ou une expression.

```typescript
interface AbstractExpression {
  interpret(context: Context): string;
}

class TerminalExpression implements AbstractExpression {
  interpret(context: Context): string {
    return 'TerminalExpression: Interpret';
  }
}
```

#### Exemple d'utilisation :

```typescript
const context = new Context();
const list = [];

list.push(new TerminalExpression());
list.push(new NonterminalExpression());
list.push(new TerminalExpression());
list.push(new TerminalExpression());

list.forEach((item) => {
  console.log(item.interpret(context));
});

console.log(context.output);
```

#### Explication :

- L’interface `AbstractExpression` déclare une méthode pour interpréter une expression.
- Les classes `TerminalExpression` et `NonterminalExpression` implémentent la logique d’interprétation.
- La classe `Context` contient les données partagées entre les expressions.
- Le client construit une syntaxe arborescente et l’évalue.
- Les expressions stockent les résultats dans le contexte.
- Le client récupère les résultats du contexte.
- Le pattern Interpreter est rarement utilisé en JavaScript.

### Mediator

Le pattern Mediator permet de réduire les dépendances directes entre les objets en les faisant communiquer via un objet médiateur.

```typescript
interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  setComponent1(component1: Component1): void {
    this.component1 = component1;
  }

  setComponent2(component2: Component2): void {
    this.component2 = component2;
  }

  notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }
    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator: Mediator = null) {
    this.mediator = mediator;
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  doA(): void {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  doD(): void {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}
```

#### Exemple d'utilisation :

```typescript
const mediator = new ConcreteMediator();
const component1 = new Component1(mediator);
const component2 = new Component2(mediator);

mediator.setComponent1(component1);
mediator.setComponent2(component2);

component1.doA();
component2.doD();
```

#### Explication :

- L’interface `Mediator` déclare une méthode pour communiquer avec les composants.
- La classe `ConcreteMediator` implémente la logique de communication.
- Les classes `Component1` et `Component2` communiquent avec le médiateur.
- Le client crée les composants et les configure avec le médiateur.
- Les composants communiquent via le médiateur.

### Memento

Le pattern Memento permet de capturer et de restaurer l’état interne d’un objet sans violer l’encapsulation.

```typescript
class Originator {
  private state: string;

  set(state: string): void {
    console.log(`Originator: Setting state to ${state}.`);
    this.state = state;
  }

  saveToMemento(): Memento {
    console.log('Originator: Saving to Memento.');
    return new Memento(this.state);
  }

  restoreFromMemento(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: State after restoring from Memento: ${this.state}.`);
  }
}

class Memento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  backup(): void {
    console.log('Caretaker: Saving Originator\'s state...');
    this.mementos.push(this.originator.saveToMemento());
  }

  undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    console.log(`Caretaker: Restoring state to: ${memento.getState()}`);
    this.originator.restoreFromMemento(memento);
  }

  showHistory(): void {
    console.log('Caretaker: Here\'s the list of mementos:');
    for (const memento of this.mementos) {
      console.log(memento.getState());
    }
  }
}
```

#### Exemple d'utilisation :

```typescript
const originator = new Originator();
const caretaker = new Caretaker(originator);

originator.set('State1');
caretaker.backup();

originator.set('State2');
caretaker.backup();

originator.set('State3');
caretaker.backup();

caretaker.showHistory();

caretaker.undo();
caretaker.undo();
```

#### Explication :

- La classe `Originator` contient l’état interne de l’objet et permet de sauvegarder et de restaurer cet état.
- La classe `Memento` contient l’état sauvegardé de l’objet.
- La classe `Caretaker` est responsable de la sauvegarde et de la restauration de l’état de l’objet.

### Observer

Le pattern Observer permet de définir un mécanisme de souscription pour informer plusieurs objets d’un événement.

```typescript
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class ConcreteSubject implements Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state;
    this.notify();
  }
}

interface Observer {
  update(subject: Subject): void;
}

class ConcreteObserverA implements Observer {
  update(subject: Subject): void {
    if (subject.getState() < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

class ConcreteObserverB implements Observer {
  update(subject: Subject): void {
    if (subject.getState() === 0 || subject.getState() >= 2) {
      console.log('ConcreteObserverB: Reacted to the event.');
    }
  }
}
```

#### Exemple d'utilisation :

```typescript
const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.setState(1);
subject.setState(2);
```

#### Explication :

- L’interface `Subject` déclare les méthodes pour gérer les abonnés.
- La classe `ConcreteSubject` implémente les méthodes pour ajouter, supprimer et informer les abonnés.
- L’interface `Observer` déclare la méthode de mise à jour.
- Les classes `ConcreteObserverA` et `ConcreteObserverB` implémentent la méthode de mise à jour.

### State

Le pattern State permet de changer le comportement d’un objet en fonction de son état interne.

```typescript
interface State {
  handle(context: Context): void;
}

class ConcreteStateA implements State {
  handle(context: Context): void {
    console.log('ConcreteStateA handles request.');
    context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB implements State {
  handle(context: Context): void {
    console.log('ConcreteStateB handles request.');
    context.setState(new ConcreteStateA());
  }
}

class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  request(): void {
    this.state.handle(this);
  }

  setState(state: State): void {
    this.state = state;
  }
}
```

#### Exemple d'utilisation :

```typescript
const context = new Context(new ConcreteStateA());
context.request();
context.request();
context.request();
context.request();
```

#### Explication :

- L’interface `State` déclare la méthode de gestion.
- Les classes `ConcreteStateA` et `ConcreteStateB` implémentent la méthode de gestion.
- La classe `Context` contient l’état interne et permet de changer l’état.

### Strategy

Le pattern Strategy permet de définir une famille d’algorithmes, de les encapsuler et de les rendre interchangeables.

```typescript
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  doSomeBusinessLogic(): void {
    const data = ['a', 'b', 'c', 'd', 'e'];
    console.log(`Context: Sorting data using the strategy (not sure how it'll do it).`);
    const result = this.strategy.doAlgorithm(data);
    console.log(result.join(','));
  }
}
```

#### Exemple d'utilisation :

```typescript
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
```

#### Explication :

- L’interface `Strategy` déclare la méthode de l’algorithme.
- Les classes `ConcreteStrategyA` et `ConcreteStrategyB` implémentent la méthode de l’algorithme.
- La classe `Context` contient une référence à la stratégie et permet de changer la stratégie.

### Template Method

Le pattern Template Method permet de définir le squelette d’un algorithme dans une méthode, en laissant les sous-classes redéfinir certaines étapes.

```typescript
abstract class AbstractClass {
  templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  protected baseOperation1(): void {
    console.log('AbstractClass says: I am doing the bulk of the work.');
  }

  protected baseOperation2(): void {
    console.log('AbstractClass says: But I let subclasses override some operations.');
  }

  protected baseOperation3(): void {
    console.log('AbstractClass says: But I am doing the bulk of the work anyway.');
  }

  protected abstract requiredOperations1(): void;
  protected abstract requiredOperation2(): void;

  protected hook1(): void { }
  protected hook2(): void { }
}

class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1.');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2.');
  }
}

class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1.');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2.');
  }

  protected hook1(): void {
    console.log('ConcreteClass2 says: Overridden Hook1.');
  }
}
```

#### Exemple d'utilisation :

```typescript
const concreteClass1 = new ConcreteClass1();
console.log('Client: ConcreteClass1 is doing the same things as AbstractClass.');
concreteClass1.templateMethod();

console.log('');

const concreteClass2 = new ConcreteClass2();
console.log('Client: ConcreteClass2 is doing the same things as AbstractClass.');
concreteClass2.templateMethod();
```

#### Explication :

- La classe abstraite `AbstractClass` définit le squelette de l’algorithme.
- Les classes `ConcreteClass1` et `ConcreteClass2` implémentent les étapes de l’algorithme.

### Visitor

Le pattern Visitor permet de définir une nouvelle opération sans changer les classes des éléments sur lesquels elle opère.

```typescript
interface Element {
  accept(visitor: Visitor): void;
}

class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this);
  }

  operationA(): string {
    return 'ConcreteElementA';
  }
}

class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this);
  }

  operationB(): string {
    return 'ConcreteElementB';
  }
}

interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void;
  visitConcreteElementB(element: ConcreteElementB): void;
}

class ConcreteVisitor1 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`${element.operationA()} visited by ConcreteVisitor1`);
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`${element.operationB()} visited by ConcreteVisitor1`);
  }
}

class ConcreteVisitor2 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`${element.operationA()} visited by ConcreteVisitor2`);
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`${element.operationB()} visited by ConcreteVisitor2`);
  }
}
```

#### Exemple d'utilisation :

```typescript
const elements = [new ConcreteElementA(), new ConcreteElementB()];
const visitors = [new ConcreteVisitor1(), new ConcreteVisitor2()];

elements.forEach(element => {
  visitors.forEach(visitor => {
    element.accept(visitor);
  });
});
```

#### Explication :

- L’interface `Element` déclare la méthode `accept`.