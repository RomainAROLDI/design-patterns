/*
    3. Gestion du status d'une commande MacDo (drive) :
        - En attente de prise en compte de commande
        - Commande prise en compte
        - Commande payée
        - Commande non payée
        - Commande préparée
        - Commande livrée
        - Commande terminée
    ==> A vous de définir les actions (avancer au prochain guichet, paiement, etc...) qui permettent de passer
    d'un état à l'autre. N'hésitez pas à réaliser un diagramme UML (diagramme états-transitions) adapté pour
    vous assurer que votre flow est cohérent par rapport à votre implémentation.

    Design pattern : State

    Pourquoi ?
    La problématique nécessite de gérer un objet (la commande) qui peut se trouver dans différents états,
    chaque état ayant des comportements spécifiques et des transitions permises. Le pattern State permet
    de structurer ce comportement de manière claire et évolutive.
*/

interface OrderState {
    takeOrder(): void;

    pay(): void;

    cancel(): void;

    prepare(): void;

    deliver(): void;

    complete(): void;
}

class Order {
    private state: OrderState;

    constructor() {
        this.state = new PendingOrder(this);
    }

    public setState(state: OrderState): void {
        this.state = state;
    }

    public takeOrder(): void {
        this.state.takeOrder();
    }

    public pay(): void {
        this.state.pay();
    }

    public cancel(): void {
        this.state.cancel();
    }

    public prepare(): void {
        this.state.prepare();
    }

    public deliver(): void {
        this.state.deliver();
    }

    public complete(): void {
        this.state.complete();
    }
}

class PendingOrder implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Order taken.");
        this.order.setState(new OrderTaken(this.order));
    }

    public pay(): void {
        console.log("Action not allowed at this stage.");
    }

    public cancel(): void {
        console.log("Action not allowed at this stage.");
    }

    public prepare(): void {
        console.log("Action not allowed at this stage.");
    }

    public deliver(): void {
        console.log("Action not allowed at this stage.");
    }

    public complete(): void {
        console.log("Action not allowed at this stage.");
    }
}

class OrderTaken implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Order already taken.");
    }

    public pay(): void {
        console.log("Order paid.");
        this.order.setState(new PaidOrder(this.order));
    }

    public cancel(): void {
        console.log("Order not paid, cancelling.");
        this.order.setState(new UnpaidOrder(this.order));
    }

    public prepare(): void {
        console.log("Action not allowed at this stage.");
    }

    public deliver(): void {
        console.log("Action not allowed at this stage.");
    }

    public complete(): void {
        console.log("Action not allowed at this stage.");
    }
}

class PaidOrder implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Order already taken.");
    }

    public pay(): void {
        console.log("Order already paid.");
    }

    public cancel(): void {
        console.log("Action not allowed at this stage.");
    }

    public prepare(): void {
        console.log("Order being prepared.");
        this.order.setState(new PreparedOrder(this.order));
    }

    public deliver(): void {
        console.log("Action not allowed at this stage.");
    }

    public complete(): void {
        console.log("Action not allowed at this stage.");
    }
}

class UnpaidOrder implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Action not allowed at this stage.");
    }

    public pay(): void {
        console.log("Order not paid, action impossible.");
    }

    public cancel(): void {
        console.log("Order already cancelled.");
    }

    public prepare(): void {
        console.log("Action not allowed at this stage.");
    }

    public deliver(): void {
        console.log("Action not allowed at this stage.");
    }

    public complete(): void {
        console.log("Order completed.");
        this.order.setState(new CompletedOrder(this.order));
    }
}

class PreparedOrder implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Action not allowed at this stage.");
    }

    public pay(): void {
        console.log("Action not allowed at this stage.");
    }

    public cancel(): void {
        console.log("Action not allowed at this stage.");
    }

    public prepare(): void {
        console.log("Order already prepared.");
    }

    public deliver(): void {
        console.log("Order delivered.");
        this.order.setState(new DeliveredOrder(this.order));
    }

    public complete(): void {
        console.log("Action not allowed at this stage.");
    }
}

class DeliveredOrder implements OrderState {
    private readonly order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Action not allowed at this stage.");
    }

    public pay(): void {
        console.log("Action not allowed at this stage.");
    }

    public cancel(): void {
        console.log("Action not allowed at this stage.");
    }

    public prepare(): void {
        console.log("Action not allowed at this stage.");
    }

    public deliver(): void {
        console.log("Order already delivered.");
    }

    public complete(): void {
        console.log("Order completed.");
        this.order.setState(new CompletedOrder(this.order));
    }
}

class CompletedOrder implements OrderState {
    private order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public takeOrder(): void {
        console.log("Action not allowed at this stage.");
    }

    public pay(): void {
        console.log("Action not allowed at this stage.");
    }

    public cancel(): void {
        console.log("Action not allowed at this stage.");
    }

    public prepare(): void {
        console.log("Action not allowed at this stage.");
    }

    public deliver(): void {
        console.log("Action not allowed at this stage.");
    }

    public complete(): void {
        console.log("Order already completed.");
    }
}

const order = new Order();

order.takeOrder(); // Order taken.
order.deliver(); // Action not allowed at this stage.
order.pay(); // Order paid.
order.prepare(); // Order being prepared.
order.takeOrder(); // Action not allowed at this stage.
order.deliver(); // Order delivered.
order.complete(); // Order completed.
