export default class User {
    constructor(id, name, surname, email, additionalInfo, roles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.additionalInfo = additionalInfo;
        this.roles = roles;
    }
}