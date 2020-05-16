//всё то же самое, но в одном файле и рабочее

class Person {
    constructor(params) {
        this.fullName = params.fullName;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = 'person';
    }
    get birthDateStr() {
        let month = this.birthDate.getMonth();
        let arr=['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Ноября','Декабря',];
       return `${this.birthDate.getDate()} ${arr[month]}`;
    }
    get age() {
        let now = new Date();
        let titles = ['год', 'года', 'лет'];
        let cases = [2, 0, 1, 1, 1, 2]; 
        let age = now.getFullYear() - this.birthDate.getFullYear(); 
       return `${age} ${titles[ (age%100>4 && age%100<20)? 2 : cases[(age%10<5)?age%10:5] ]}`;
    }
    render() {
        let personBlock = document.createElement('div');
        personBlock.setAttribute('class','person');

        let ava = document.createElement('img');
        ava.setAttribute('src',this.photoUrl);
        personBlock.append(ava);

        let name = document.createElement('div');
        name.innerHTML = this.fullName;
        personBlock.append(name);

        let university = document.createElement('span');
        university.innerHTML = `${this.birthDateStr} , ${this.age}`;
        personBlock.append(university);

        return personBlock;
    }
    appendToDom(element) {
        let layout = this.render();
        element.append(layout);
    }
}

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
const factory = new Factory();

let school = new School();

school.addPerson( factory.createStudent({
    fullName: 'Маша Иванова',
    university: 'УГАТУ',
    course: 2,
    birthDate: new Date(2000, 0, 1),
    photoUrl: 'img/ava1.png'
}) );
school.addPerson( factory.createStudent({
    fullName: 'Миша Петров',
    university: 'СурГУ',
    course: 3,
    birthDate: new Date(1999, 5, 10),
    photoUrl: 'img/ava2.png'
}) );
school.addPerson( factory.createTeacher({
    fullName: 'Марат Сидоров',
    university: 'БГУ',
    birthDate: new Date(1998, 8, 15),
    photoUrl: 'img/ava3.png'
}) );

school.appendToDom(document.body);