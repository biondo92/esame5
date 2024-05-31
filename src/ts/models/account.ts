export default class Account {
    /**
     * la chiave primaria del utente
     */
    userId: number;
    email: string;
    password: string;

    /**
     *
     */
    constructor() {
        this.email = "";
        this.password = "";
    }
}