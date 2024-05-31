import City from "./city";
import { AddressType } from "./enums";
export default class Address {
    id: Number;
    address: String;
    postalCode: String;
    cityId: number;
    city: City;
    type: AddressType;
    userId: number;

    /**
     *
     */
    constructor() {
        this.address = "";
        this.postalCode = "";
        this.cityId = 0;
        this.type = AddressType.Residential;
    }
}