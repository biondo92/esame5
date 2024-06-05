import Account from './models/account';
import Address from './models/address';
// import City from './models/city';
import Contact from './models/contact';
// import Country from './models/country';
import * as Enums from './models/enums';
import User from './models/user';
import { Register }  from './forms';
import { ValidationResult } from './models/validationResult'
import PersonalData from './models/personalData';

var Models = {
    Account,
    PersonalData,
    Address,
    Contact,
    User,
    ValidationResult,
    Enums
};

export {
    Register,
    Models
}