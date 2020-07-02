import  Component  from './component.js';

'use strict';


class Header extends Component {
    render({title, description}) {
        return `
        <header>
            <div class="card card_header">
                <img class="card__img" src="img/logo.jpg" alt="${title}" />
                <p class="card__title" title="${title}">${title}</p>
                <span class="card__description" title="${description}">${description}</span>
            </div>
        </header>`;
    }
}

/**
 * компонент персоны
 */
class Person extends Component {
    constructor({item}) {
        super();
        this.state.item = item;
    }

    render(options, {item}) {
        return `<div class="card card_person">
            <img class="card__img card__img_round" src="${item.photo || 'img/ui/default_pix.jpg'}" alt="Аватар ${item.title}" />
            <p class="card__title" title="${item.title || ''}">${item.title || ''}</p>
            <span class="card__description" title="${item.study || ''}">${item.study || ''}</span>
        </div>`;
    }

    afterMount() {
        this.subscribeTo(this.getContainer(), 'click', this.onClick.bind(this));
    }

    onClick() {
        this.openPersonPopup(this.state.item);
    }

    openPersonPopup(item) {
        if (this.openPopupAction === undefined) {
            this.openPopupAction = factory.create(OpenPopupAction);
        }
        this.openPopupAction.execute({
            caption:  `${item.title}`,
            target: this.getContainer(),
            content:`<center><img height="300" width="300" class="card__img" src="${item.photo || 'img/ui/default_pix.jpg'}" alt="Аватар ${item.title}" /></center>`,
            offset: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        });
    }
}

class PersonList {
    constructor() {
        this.list = [];
    }

    addPerson(person) {
        this.list.push(person);
    }

    mount(element) {
        this.list.forEach(person => { const card = factory.create(Person, {item: person});
        card.mount(element);});
    }
}

/**
 * Компонент окошка
 */
class Popup extends Component {
    render({caption, content, contentComponent}) {
        return `<div class="popup">
            <div class="popup__header">
                <p class="popup__title" title="${caption}">${caption}</p>
                <img class="popup__closeButton" title="Закрыть" alt="Кнопка закрыть" src="img/ui/close_x.png"/>
            </div>
            <div class="popup__content">
            ${content}
            </div>
        </div>`;
    }

    afterMount() {
        this._closeButton = this.getContainer().querySelector('.popup__closeButton');
        this.subscribeTo(this._closeButton, 'click', this.onClose.bind(this));
        this.setPopupPosition();
    }

    beforeUnmount() {
        delete this._closeButton;
    }

    onClose() {
        this.close();
    }

    close() {
        this.unmount();
    }


    /**
     * Позиционирует Popup окно
     * @param {Element} popup dom элемент popup 
     * @param {Element} target dom элемент для позиционирования
     * @param {Object} offset объект настроек размера popup
     */
    setPopupPosition() {
        const container = this.getContainer();
        const offset = this.options.offset;

        // выставляем значения по умолчанию для получения реальных размеров в доме
        container.style.left = offset.left + 'px';
        container.style.top = offset.top + 'px';
        
        // получаем реальные размеры элементов окна и таргета и вычисляем куда позиционировать popup
        let position = this.coutPopupPosition(this.options.target.getBoundingClientRect(), container.getBoundingClientRect());
        container.style.left = position.left + 'px';
        container.style.top = position.top + 'px';
    }

    /**
     * Вычисление положения popup
     * @param {Object} target - объект размеров и положения относительного элемента 
     * @param {Object} offset - объект размеров и положения popup
     * @returns  {left, top} - смещение окна
     */
    coutPopupPosition(target, offset) {
        let {width=0, height=0, left=0, top=0} = offset || {};
        let {left:tleft=0, top:ttop=0} = target || {};

        // получаем размер окна браузера
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const defOffset = 8; // смещение чтоб не липло к краям

        if (left + width === innerWidth) {
            tleft = 0;
        }

        // берем левый верхний угол таргета и смещение для popup если надо
        left = tleft + left;
        top = ttop - top;

        // проверяем влезает ли в окно браузера, если нет, корректируем смещение
        if (tleft + width > innerWidth) {
            left = left + (innerWidth - (width + tleft)) - defOffset;
        }

        if (ttop + height >= innerHeight) {
            top = top + (innerHeight - (ttop + height)) - defOffset;
        }

        return {left, top};
    }
}

/**
 * компонент стека окошек
 */
class PopupStack extends Component {
	constructor(options) {
		super(options);
		this.popups = [];
	}
	
    render() {
        return `<div class="popup-stack"></div>`;
    }

    clear() {
		this.popups.forEach( p => {
			p.unmount();
		});
    }

    append(options) {
		const popup = factory.create(Popup, options);
		this.popups.push(popup);
		popup.mount(this.getContainer());
    }
}

/**
 * Команда — это поведенческий паттерн проектирования, который превращает запросы в объекты, позволяя передавать их как аргументы при вызове методов, ставить запросы в очередь, 
 * логировать их, а также поддерживать отмену операций.
 */

class Action {
    execute(meta) {
        throw new Error('Необходима реализация');
    }
}

class OpenPopupAction extends Action {
    execute(meta) {
        popupStack.clear();
        popupStack.append(meta);
    }
}


/**
 * Абстрактная фабрика для создания контролов
 */
class ComponentFactory {
    create(component, options) {
        return new component(options || {});
    }
}

const factory = new ComponentFactory();

const head = factory.create(Header, {
    title: 'Tensor Scool',
    description: 'Это страница школы Тензор. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.'  
});
head.mount(document.body);

const person = factory.create(Person, {
	item: {
		title: 'Женя Серова',
		photo: 'img/ava03.jpg',
		study: 'Угату',
		bday: new Date('1998-11-13'),
		phone: '+7 (963) 123-45-67',
		active: new Date('2020-04-03T20:00:00')
	}
});
person.mount(document.body);


let school = new PersonList();

school.addPerson({
        title: 'Маша Иванова',
        study: 'УГАТУ',
        course: 2,
        bday: new Date(2000, 0, 1),
        photo: 'img/ava02.jpg'
    } 
);
school.addPerson( {
        title: 'Миша Петров',
        study: 'СурГУ',
        course: 3,
        bday: new Date(1999, 5, 10),
        photo: 'img/ava01.jpg'
    }
);
school.addPerson( {
        title: 'Марат Сидоров',
        study: 'БГУ',
        course: 3,
        bday: new Date(1998, 8, 15),
        photo: 'img/ava04.jpg'
    }
);

school.mount(document.body);

const popupStack = factory.create(PopupStack);
popupStack.mount(document.body);


