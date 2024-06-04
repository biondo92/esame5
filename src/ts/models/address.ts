import { AddressType } from "./enums";

export default class Address {
    id: Number;
    address: String;
    postalCode: String;
    city: string;
    type: AddressType;
    userId: number;

    /**
     *
     */
    constructor() {
        this.address = "";
        this.postalCode = "";
        this.city = "";
        this.type = AddressType.Residential;
    }
}