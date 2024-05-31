import User from "./models/user";
import Tab from "bootstrap/js/src/tab";

export default class RegisterForm{
    private _jqElement:JQuery<HTMLElement>;
    private _selector:string;
    private _model:User;
    private _tabs: INavTab[]; 
    private _fields: IField[]; 

    /**
    *
    */
    constructor(selector:string = "form") {
        let el = $(selector);
        let tabs = el.find(".nav-link");
        let fields = el.find(".form-control");
        this._selector = selector;
        this._jqElement = el;
        this._tabs = [];
        this._fields = [];
        $.each(tabs, (i, tab) => {
            this._tabs.push({ name: tab.id, tab: new Tab(tab) });
        });
        $.each(fields, (i, elem) => {
            this._fields.push({ name: elem.attributes["name"], element: elem });
        });
    }
}

interface INavTab{
    name: string;
    tab: Tab
}

interface IField{
    name: string;
    element:HTMLElement;
}
