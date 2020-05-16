//почему-то не работает
let School = require('./school');
let PersonLib = require('./personLib');
let Factory = PersonLib.Factory;
let Student = PersonLib.Student;
let Teacher = PersonLib.Teacher;

// проинициализируем фабрику
const factory = new Factory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
let school = new School();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше
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

// отрисуем всех студентов в dom 
// если методы называются по другому, поменяйте
// точка монтирования document.body может быть изменена на любой другой элемент DOM

school.appendToDom(document.body);

// в итоге в на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше