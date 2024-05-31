/*
    6. Considérant ce code. A vous de trouver le moyen de rendre compatible l'utilisation de
    la classe ComposantPdf avec la classe DocumentHtml : ...

    Design pattern : Adapter

    Pourquoi ?
    L'Adapter est précieux lorsqu'une interface existante doit être utilisée, mais ne correspond pas à
    l'interface requise par l'application. Dans cette situation, le meilleur moyen de rendre compatible l'utilisation
    de la classe ComposantPdf avec la classe DocumentHtml est de mettre en place ce pattern.
*/

interface Document {
    Content: string;

    Draw(): void;

    Print(): void;
}

class DocumentHtml implements Document {
    protected content?: string;

    public set Content(content: string) {
        this.content = content;
    }

    public Draw(): void {
        console.log("Drawing HTML document: " + this.content);
    }

    public Print(): void {
        console.log("Printing HTML document: " + this.content);
    }
}

class PdfAdapter implements Document {
    private pdfComponent: PdfComponent;

    constructor() {
        this.pdfComponent = new PdfComponent();
    }

    public set Content(content: string) {
        this.pdfComponent.PdfSetContent(content);
    }

    public Draw(): void {
        this.pdfComponent.PdfPrepareDisplay();
        this.pdfComponent.PdfRefresh();
        this.pdfComponent.PdfFinishDisplay();
    }

    public Print(): void {
        this.pdfComponent.PdfSendToPrinter();
    }
}

class PdfComponent {
    protected content?: string;

    public PdfSetContent(content: string): void {
        this.content = content;
    }

    public PdfPrepareDisplay(): void {
        console.log("Displaying PDF: Start");
    }

    public PdfRefresh(): void {
        console.log("Displaying PDF content: " + this.content);
    }

    public PdfFinishDisplay(): void {
        console.log("Displaying PDF: End");
    }

    public PdfSendToPrinter(): void {
        console.log("Printing PDF: " + this.content);
    }
}

const documentHtml: Document = new DocumentHtml();
documentHtml.Content = "<html><body>HTML Content</body></html>";
documentHtml.Draw();
documentHtml.Print();

const pdfAdapter: Document = new PdfAdapter();
pdfAdapter.Content = "PDF Content";
pdfAdapter.Draw();
pdfAdapter.Print();
