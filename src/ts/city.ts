import { Country } from "./country";

export interface City {
    id: number;
    name: string;
    countryId: number;
    country: Country;
}