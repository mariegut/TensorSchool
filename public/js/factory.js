let Person = require('./person');
let Student = require('./student');
let Teacher = require('./teacher');

class Factory {
    createStudent(params) {
        return new Student(params);
    }
    createTeacher(params) {
        return new Teacher(params);
    }
    createPerson(params) {
        return new Person(params);
    }
}
module.exports = Factory;