import { ContactType } from "./enums";

export default class Contact {
    id: number;
    userId: number;
    type: ContactType;
    value: string;

    /**
     *
     */
    constructor() {
        this.type = ContactType.Email;
        this.value = "";
    }
}