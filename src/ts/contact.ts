import { ContactType } from "./enums";

export default interface Contact {
    id: number;
    userId: number;
    type: ContactType;
    value: string;
}