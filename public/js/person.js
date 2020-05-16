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
module.exports = Person;