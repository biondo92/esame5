import User from "./models/user";
import bootstrap from 'bootstrap/dist/js/bootstrap';

// elimina l'errore: Property '<property_name>' does not exist on type 'JQueryStatic'.ts(2339)
declare var $: any;

export class RegisterForm {
    private _jqElement: JQuery<HTMLElement>;
    private _selector: string;
    private _model: User;
    private _tabs: INavTab[];
    private _fields: IField[];

    /**
    *
    */
    constructor(selector: string = "form", validators: any = {}) {
        let el = $(selector);
        let tabs = el.find(".nav-link");
        let fields = el.find(".form-control");
        this._selector = selector;
        this._jqElement = el;
        this._tabs = [];
        this._fields = [];

        $.each(tabs, (i, tab) => {
            this._tabs.push({ name: tab.id, tab: new bootstrap.Tab(tab) });
        });
        $.each(fields, (i, elem) => {
            var name = elem.attributes["name"].nodeValue;
            var callback = validators[name];

            if (callback == null || callback == undefined) {
                console.log("no validation callback supplied for '" + name + "'...");
            }
            else {
                elem.onblur = (e) => {
                    var target = $(e.target);

                    var result = callback(target.val());

                    if (result.isValid) {
                        target.removeClass("is-invalid").addClass("is-valid");
                        target.parent().find(".form-text").html("");
                    }
                    else {
                        target.removeClass("is-valid").addClass("is-invalid");
                        target.parent().find(".form-text").html(result.message);
                    }
                };
            }

            this._fields.push({ name: name, element: elem });
        });
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