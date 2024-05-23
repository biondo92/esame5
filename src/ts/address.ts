import { City } from "./city";
import { AddressType } from "./enums";

export interface Address {
    id: Number;
    address: String;
    postalCode: String;
    cityId: number;
    city: City;
    type: AddressType;
    userId: number;
}