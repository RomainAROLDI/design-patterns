/*
    2. Une station météo donne le temps qu'il fait "Pluie", "Beau temps", "Neige", "Chaleur extrême", ...
    Plusieurs appareils différents doivent communiquer avec la station météo afin de pouvoir afficher
    le temps qu'il fait sur leur écran :
        - Téléphone
        - Ordinateur portable
        - Tablette
        - Voiture
    Chaque changement de météo doit être pris en compte pour tous les appareils et s'afficher sur l'appareil.

    Design pattern : Observer

    Pourquoi ?
    La problématique décrit un scénario où plusieurs objets (les appareils) doivent être informés des
    changements d'état d'un autre objet (la station météo). C'est exactement le rôle de l'Observer.
    En utilisant l'Observer, chaque appareil s'inscrit auprès de la station météo pour recevoir les mises à jour
    automatiquement.
*/

interface Observer {
    update(weather: string): void;
}

class WeatherStation {
    private observers: Observer[] = [];
    private weather: string;

    public constructor(weather: string) {
        this.weather = weather;
    }

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.weather);
        }
    }

    public setWeather(weather: string): void {
        this.weather = weather;
        this.notifyObservers();
    }
}

class Phone implements Observer {
    public update(weather: string): void {
        console.log(`Phone display: ${weather}`);
    }
}

class Laptop implements Observer {
    public update(weather: string): void {
        console.log(`Laptop display: ${weather}`);
    }
}

class Tablet implements Observer {
    public update(weather: string): void {
        console.log(`Tablet display: ${weather}`);
    }
}

class Car implements Observer {
    public update(weather: string): void {
        console.log(`Car display: ${weather}`);
    }
}

const stationMeteo = new WeatherStation("Pluie");

const telephone = new Phone();
const ordinateurPortable = new Laptop();
const tablette = new Tablet();
const voiture = new Car();

// Enregistrement des observateurs auprès de la station météo
stationMeteo.addObserver(telephone);
stationMeteo.addObserver(ordinateurPortable);
stationMeteo.addObserver(tablette);
stationMeteo.addObserver(voiture);

// Communique des nouvelles situations météorologiques aux observateurs et affiche les nouvelles valeurs
stationMeteo.notifyObservers();
stationMeteo.setWeather("Soleil");
stationMeteo.setWeather("Nuageux");
