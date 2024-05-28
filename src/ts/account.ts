export default interface Account {
    /**
     * la chiave primaria del utente
     */
    userId: number;
    email: string;
    password: string;
}