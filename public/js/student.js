let Person = require('./person');

class Student extends Person {
    constructor(params) {
        super(params);
       this.course = params.course;
       this.university = params.university;
       this.type = 'student';
    }
    render() {
        let studentBlock = document.createElement('div');
        studentBlock.setAttribute('class','person');

        let ava = document.createElement('img');
        ava.setAttribute('src',this.photoUrl);
        studentBlock.append(ava);

        let name = document.createElement('div');
        name.innerHTML = this.fullName;
        studentBlock.append(name);

        let university = document.createElement('span');
        university.innerHTML = `${this.university} ${this.course} курс`;
        studentBlock.append(university);

        return studentBlock;
    }
    appendToDom(element) {
        let layout = this.render();
        element.append(layout);
    }
}
module.exports = Student;