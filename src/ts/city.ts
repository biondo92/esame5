import Country from "./country";

export default interface City {
    id: number;
    name: string;
    countryId: number;
    country: Country;
}