import Account from "./models/account";
import Address from "./models/address";
import Contact from "./models/contact";
import PersonalData from "./models/personalData";
import User from "./models/user";
import bootstrap from 'bootstrap/dist/js/bootstrap';

// elimina l'errore: Property '<property_name>' does not exist on type 'JQueryStatic'.ts(2339)
declare var $: any;

/**
 * Questa classe contiene la logica che gestisce il form di registrazione
 */
export class Register {
    private _accountForm: Form<Account>;
    private _personalDataForm: Form<PersonalData>;
    private _addressForm: Form<Address>;
    private _contactForm: Form<Contact>;
    private _tabs: INavTab[];
    private _steps: IDictionary;
    private _model: User = new User();

    /**
     * Dato un selettore ed eventuali regole di validazione costruisce la logica che gestisce la creazione dell'utente
     */
    constructor(selector: string, validation: any = {}) {
        let parent = $(selector);
        let forms = parent.find("form");
        this._tabs = [];
        this._steps = {};

        // Cicla tutti i form presenti allìinterno del selettore, crea un'istanza della Tab che contiene quel form ed istanzia un hendler per il form specifico 
        $.each(forms, (i, frm) => {
            this._tabs.push({ name: frm.id, tab: new bootstrap.Tab($("#" + frm.id + "-tab-trigger")) });
            this._steps[frm.id] = {};

            let validator = validation[frm.id];
            if (frm.id == "account") {
                this._accountForm = new Form<Account>("#" + frm.id, validator);
            }
            if (frm.id == "personalData") {
                this._personalDataForm = new Form<PersonalData>("#" + frm.id, validator);
            }
            if (frm.id == "addresses") {
                this._addressForm = new Form<Address>("#" + frm.id, validator);
            }
            if (frm.id == "contacts") {
                this._contactForm = new Form<Contact>("#" + frm.id, validator);
            }
        });

        //Gestisce il click sui tasti che hanno classe next, recupera il tasto sul quale l'utente ha cliccato, da questo recupera l'informazione sullo step successivo dopo di che attreverso Boostrap mostra la tab relativa
        $(document).on("click", ".next", (e) => {
            var target = $(e.target);
            this._tabs.filter((tab) => tab.name == target.data("next"))[0].tab.show();
        });
        //come sopra, gestisce il click sui tasti che hanno classe prev, recupera il tasto sul quale l'utente ha cliccato, da questo recupera l'informazione sullo step precedente dopo di che attreverso Boostrap mostra la tab relativa
        $(document).on("click", ".prev", (e) => {
            var target = $(e.target);
            this._tabs.filter((tab) => tab.name == target.data("prev"))[0].tab.show();
        });
        // Gestisce il click sui bottoni con class add-data contenuti all'interno dei modal, recupera il tasto su cui l'utente ha cliccato, su questo tasto ci sono infomazioni relative alla proprietà del modello che si sta aggiungendo
        $(document).on("click", ".add-data", (e) => {
            var target = $(e.target);
            var frm = target.data("form");
            var index = this._model[frm].length;

            if (frm == "addresses") {
                var address = this._addressForm.GetModel();
                this._model[frm][index] = address;
                this._addTableRow(frm, index > 0, index, [
                    address.type,
                    address.address,
                    address.city,
                    address.postalCode
                ]);
            }

            if (frm == "contacts") {
                var contact = this._contactForm.GetModel();
                this._model[frm][index] = contact;
                this._addTableRow(frm, index > 0, index, [
                    contact.type,
                    contact.value
                ]);
            }

            target.parent().find('[data-bs-dismiss="modal"]').trigger("click");
        });
        //Gestisce il click sui bottoni con class delete contenuti all'interno di una tabella, elimina la riga e rimuove l'oggetto dal modello
        $(document).on("click", ".delete", (e) => {
            var target = $(e.target);
            var row = target.parent().parent();
            var rowId = row.data("id");
            var model = row.data("model");
            var ele = this._model[model][rowId];
            this._model[model] = this._model[model].filter(item => item != ele);
            row.remove();
        })
    }

    /**
     * Aggiunge una riga ad una tabella
     * 
     * @param table il name della propietà nel modello
     * @param append determina se aggiungere la riga oppure svuotare la tabella e aggiungere la riga
     * @param values una collezione di valori che verrano mostrati a schermo
     * questo medoto generico data una tabella di destinazione permette di aggiungere una nuova riga con le colonne passate in input
     */
    private _addTableRow(table: string, append: boolean, id: number, values: any[]): void {
        var tbody = $("#" + table + "-table tbody");
        var tr = $("<tr />");
        tr.data("id", id);
        tr.data("model", table);
        $.each(values, (i, val) => {
            tr.append($("<td/>", {
                text: val
            }));
        });
        var td = $("<td/>");
        var icon = $("<i/>", {
            class: "fas fa-trash pointer-events-none"
        });
        var btn = $("<button/>", {
            class: "btn btn-danger delete"
        });

        btn.append(icon);
        td.append(btn);

        tr.append(td);
        if (append) {
            tbody.append(tr);
        } else {
            tbody.html("").append(tr);
        }
    }

    /**
     * Questo metoodo restituisce il modello di tipo 'User' che rappresenta l'utente che si sta creando
     * @returns User
     * restituisce il modello 
     */
    public GetModel(): User {
        this._model.account = this._accountForm.GetModel();
        this._model.personalData = this._personalDataForm.GetModel()
        return this._model;
    }
}

class Form<T> {
    private _jqElement: JQuery<HTMLElement>;
    private _selector: string;
    private _fields: IField[];
    private _model: T = {} as T;
    private _fieldsToValidate: IDictionary = {};

    /**
     * dato il selettore di un form, e le validazioni richieste per quel form, recupera tutti i campi contenuti nel form ed applica ad ognuno la relativa validazione se presente
     * inoltre si occupa di valorizzare il modello al cambiamento dell input
     */
    constructor(selector: string = "form", validators: any = {}) {
        let el = $(selector);
        let fields = el.find(".form-control");
        this._selector = selector;
        this._jqElement = el;
        this._fields = [];
        this._fieldsToValidate = {};

        $.each(fields, (i, elem) => {
            var name = elem.attributes["name"].nodeValue;
            var callback = validators[name];

            if (callback == null || callback == undefined) {
                console.log("no validation callback supplied for '" + name + "'...");
                elem.onblur = (e) => {
                    this._model[name] = $(e.target).val();
                }
            }
            else {
                this._fieldsToValidate = this._fieldsToValidate || {};
                this._fieldsToValidate[name] = { valid: false };

                elem.onblur = (e) => {
                    var target = $(e.target);

                    var result = callback(target.val());

                    if (result.isValid) {
                        target.removeClass("is-invalid").addClass("is-valid");
                        target.parent().find(".form-text").html("");
                        this._fieldsToValidate[name].valid = true;
                    }
                    else {
                        target.removeClass("is-valid").addClass("is-invalid");
                        target.parent().find(".form-text").html(result.message);
                        this._fieldsToValidate[name].valid = false;
                    }
                    this._model[name] = $(e.target).val();
                    this.Check(selector.replace("#", ""));
                };
            }

            this._fields.push({ name: name, element: elem });
        });
    }
    //questo metodo verifica se tutti i campi obbligatori per un dato form sono compilati, in caso positivo abilita lo step successivo in caso contrario lo disabilita
    private Check(step: string) {
        var isFilled = true;
        var current = this._fieldsToValidate;
        Object.keys(current).forEach(function (key) {
            isFilled = current[key].valid;
        });

        if (isFilled) {
            $("#" + step + " .next").removeClass("disabled");
            $("." + step + ".add-data").removeClass("disabled");
            $("[data-require=\"" + step + "\"]").removeClass("disabled");
        }
        else {
            $("#" + step + " .next").addClass("disabled");
            $("." + step + ".add-data").addClass("disabled");
            $("[data-require=\"" + step + "\"]").addClass("disabled");
        }
    }
    //restituisce il modello del form
    public GetModel(): T {
        return this._model;
    }
}

interface INavTab {
    name: string;
    tab: any
}

interface IField {
    name: string;
    element: HTMLElement;
}

interface IDictionary {
    [key: string]: any;
};
