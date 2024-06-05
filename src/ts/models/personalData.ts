import { Gender } from "./enums";

export default class PersonalData{
    id: number;
    userId: number;
    name: String;
    lastName: String;
    birthDate: Date;
    gender: Gender;

    /**
     *
     */
    constructor() {
        this.name = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.gender = Gender.Other
    }
}