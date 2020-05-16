let Person = require('./person');

class Teacher extends Person {
    constructor(params) {
        super(params);
       this.university = params.university;
       this.type = 'teacher';
    }
    render() {
        let teacherBlock = document.createElement('div');
        teacherBlock.setAttribute('class','person');

        let ava = document.createElement('img');
        ava.setAttribute('src',this.photoUrl);
        teacherBlock.append(ava);

        let name = document.createElement('div');
        name.innerHTML = this.fullName;
        teacherBlock.append(name);

        let university = document.createElement('span');
        university.innerHTML = `Преподаватель ${this.university}`;
        teacherBlock.append(university);

        return teacherBlock;
    }
    appendToDom(element) {
        let layout = this.render();
        element.append(layout);
    }
}
module.exports = Teacher;