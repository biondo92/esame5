import { ContactType } from "./enums";

export interface Contact {
    id: number;
    userId: number;
    type: ContactType;
    value: string;
}