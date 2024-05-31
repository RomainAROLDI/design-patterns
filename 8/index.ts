/*
    8. Vous développez une application de dessin qui doit supporter plusieurs formes géométriques
    (comme des cercles, des rectangles, etc.) et doit être compatible avec plusieurs bibliothèques de rendu graphique
    (comme OpenGL et DirectX). Vous voulez pouvoir ajouter de nouvelles formes ou de nouvelles bibliothèques de rendu
    sans avoir à modifier le code existant. (Attention, ici il n'est pas demandé d'avoir un point
    d'entré pour créer les objets...)

    Design pattern : Bridge

    Pourquoi ?
    Le Bridge est un pont entre une classe abstraite et une interface. Dans notre cas, il est intéressant
    d'en construire un afin d'anticiper les problèmes de compatibilité et d'éviter la multiplication de classe.
*/

interface Renderer {
    renderCircle(radius: number): void;

    renderRectangle(width: number, height: number): void;
}

class OpenGLRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log(`OpenGL rendering a circle with radius ${radius}`);
    }

    renderRectangle(width: number, height: number): void {
        console.log(`OpenGL rendering a rectangle with width ${width} and height ${height}`);
    }
}

class DirectXRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log(`DirectX rendering a circle with radius ${radius}`);
    }

    renderRectangle(width: number, height: number): void {
        console.log(`DirectX rendering a rectangle with width ${width} and height ${height}`);
    }
}

abstract class Shape {
    protected renderer: Renderer;

    protected constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    abstract draw(): void;
}

class Circle extends Shape {
    private readonly radius: number;

    constructor(renderer: Renderer, radius: number) {
        super(renderer);
        this.radius = radius;
    }

    draw(): void {
        this.renderer.renderCircle(this.radius);
    }
}

class Rectangle extends Shape {
    private readonly width: number;
    private readonly height: number;

    constructor(renderer: Renderer, width: number, height: number) {
        super(renderer);
        this.width = width;
        this.height = height;
    }

    draw(): void {
        this.renderer.renderRectangle(this.width, this.height);
    }
}

// bun run 8/index.ts

const openGLRenderer = new OpenGLRenderer();
const directXRenderer = new DirectXRenderer();

const circleWithOpenGL = new Circle(openGLRenderer, 10);
circleWithOpenGL.draw(); // OpenGL rendering a circle with radius 10

const rectangleWithDirectX = new Rectangle(directXRenderer, 20, 30);
rectangleWithDirectX.draw(); // DirectX rendering a rectangle with width 20 and height 30

const circleWithDirectX = new Circle(directXRenderer, 15);
circleWithDirectX.draw(); // DirectX rendering a circle with radius 15

const rectangleWithOpenGL = new Rectangle(openGLRenderer, 25, 35);
rectangleWithOpenGL.draw(); // OpenGL rendering a rectangle with width 25 and height 35
