class School {
    constructor() {
        this.list = [];
    }

    addPerson(person) {
        this.list.push(person);
    }

    removePerson(fullName) {
        this.list = this.list.filter(person => person.fullName !== fullName);
    }

    getPersonByName(fullName) {
        return this.list.find(person => person.fullName == fullName);
    }

    appendToDom(element) {
        this.list.forEach(person => person.appendToDom(element));
    }
}
module.exports = School;