/*
    9. Design Pattern au choix parmis la liste de ceux qui n'ont pas été vu en cours (hors workshop ou pattern du cours).
    Pensez à expliquer votre problématique en commentaire ou dans un readme :
        - Chain Of Responsibility
        - Mediator
        - Interpretor
        - Visitor
        - Memento
        - Flyweight
        - Prototype => **NON AUTORISE**
        - Template Method => **NON AUTORISE**

    Design pattern choisi : Mediator

    Problématique :
    Supposons que vous développez une application de chat en ligne où plusieurs utilisateurs peuvent envoyer
    des messages. Chaque utilisateur doit être notifié lorsqu'un nouveau message est envoyé par un autre utilisateur.
    Vous souhaitez centraliser la gestion des messages et des notifications.
*/

interface User {
    receiveMessage(message: string, from: User): void;

    sendMessage(message: string): void;

    getName(): string;
}

class ChatUser implements User {
    private readonly name: string;
    private mediator: ChatMediator;

    constructor(name: string, mediator: ChatMediator) {
        this.name = name;
        this.mediator = mediator;
    }

    receiveMessage(message: string, from: User): void {
        console.log(`${this.name} received message: "${message}" from ${from.getName()}`);
    }

    sendMessage(message: string): void {
        console.log(`${this.name} sends message: "${message}"`);
        this.mediator.broadcastMessage(message, this);
    }

    getName(): string {
        return this.name;
    }
}

interface ChatMediator {
    addUser(user: User): void;

    broadcastMessage(message: string, from: User): void;
}

class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    broadcastMessage(message: string, from: User): void {
        for (const user of this.users) {
            if (user !== from) {
                user.receiveMessage(message, from);
            }
        }
    }
}

const chatRoom = new ChatRoom();

const user1 = new ChatUser("Alice", chatRoom);
const user2 = new ChatUser("Bob", chatRoom);
const user3 = new ChatUser("Charlie", chatRoom);

chatRoom.addUser(user1);
chatRoom.addUser(user2);
chatRoom.addUser(user3);

user1.sendMessage("Hello everyone!");
user2.sendMessage("Hi Alice!");
user3.sendMessage("Hey guys!");
