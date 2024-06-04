import Account from "./account";
import Address from "./address";
import Contact from "./contact";
import { Gender } from "./enums";

export default class User {
    id: Number;
    name: String;
    lastName: String;
    birthDate: Date;
    gender: Gender;
    addresses: Address[];
    contacts: Contact[];
    account: Account;

    constructor() {
        
    }
}