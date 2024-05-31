import Country from "./country";
export default class City {
    id: number;
    name: string;
    countryId: number;
    country: Country;

    /**
     *
     */
    constructor() {
        this.name = "";
        this.countryId = 0;
    }
}