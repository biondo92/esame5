export class ValidationResult{
    isValid: boolean;
    message: string;

    /**
     *
     */
    constructor(result:boolean, message:string = "") {
        this.isValid = result;
        this.message = message;
    }
}