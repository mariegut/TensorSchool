class Student {
    constructor(params) {
       this.fullName = params.fullName;
       this.university = params.university;
       this.course = params.course;
       this.birthDate = params.birthDate;
       this.photoUrl = params.photoUrl;
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
}

function appendStudentBlock(student) {
    let studentBlock = document.createElement('div');
    studentBlock.setAttribute('class','student');

    let ava = document.createElement('img');
    ava.setAttribute('src',student.photoUrl);
    studentBlock.append(ava);

    let name = document.createElement('div');
    name.innerHTML = student.fullName;
    studentBlock.append(name);

    let university = document.createElement('span');
    university.innerHTML = `${student.university} ${student.course} курс`;
    studentBlock.append(university);

    document.getElementById('students').append(studentBlock);
    return studentBlock;
}

function openCard(student, target, studentBlock) {
    let card = document.createElement('div');
    card.setAttribute('class','card');
    
    let name = document.createElement('div');
    name.innerHTML = student.fullName;
    name.setAttribute('class','name');
    card.append(name);
    
    let date = document.createElement('span');
    date.innerHTML='День рождения ';
    let dateVal = document.createElement('div');
    dateVal.setAttribute('class','info');
    dateVal.innerHTML=`${student.birthDateStr} , ${student.age}`;
    date.append(dateVal);
    card.append(date);
    
    let university = document.createElement('span');
    university.innerHTML='Учится ';
    let universityVal = document.createElement('div');
    universityVal.setAttribute('class','info');
    universityVal.innerHTML=`${student.university}, ${student.course} курс`;
    university.append(universityVal);
    card.append(university);

    let ava = document.createElement('img');
    ava.setAttribute('src',student.photoUrl);
    card.append(ava);
    
    target.parentNode.append(card);

    card.addEventListener('click', (event) => {
        target.parentNode.removeChild(card);
     })
}


const studentArr = [
    {
        fullName: 'Маша Иванова',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: 'img/ava1.png'
    },
    {
        fullName: 'Миша Петров',
        university: 'СурГУ',
        course: 3,
        birthDate: new Date(1999, 5, 10),
        photoUrl: 'img/ava2.png'
    },
    {
        fullName: 'Марат Сидоров',
        university: 'БГУ',
        course: 4,
        birthDate: new Date(1998, 8, 15),
        photoUrl: 'img/ava3.png'
    }
 ];
 
 studentArr.forEach((item) => {
    const student = new Student(item);
    const studentBlock = appendStudentBlock(student);
    studentBlock.addEventListener('click', (event) => {
      openCard(student, event.currentTarget, studentBlock);
    })
    
});
