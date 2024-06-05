import Account from "./account";
import Address from "./address";
import Contact from "./contact";
import PersonalData from "./personalData";


export default class User {
    id: Number;
    personalData: PersonalData;
    addresses: Address[];
    contacts: Contact[];
    account: Account;

    constructor() {
        this.account = new Account();
        this.personalData = new PersonalData();
        this.addresses = [];
        this.contacts = [];
    }
}