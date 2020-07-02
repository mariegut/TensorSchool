export default class Component {
   
   constructor(options) {
       this.options = options;
     this.state = {};
     this.container = undefined;
     
     // для сбора подписок на события и автоматической отписки
       this.handlers = {};
   }


   /**
    * помещает верстку компонента в dom
    * @param {DOMElement} container контейнер в котором строиться верстка, куда поместить
    * @param {String} position insertAdjacentElement позиция куда помесить, до, в, вконец, после
    */
   mount(container, position) {
       // прехук до монтирования        
       this.beforeMount();
     
       // создаем новый компонент в доме
       const newComponent = document.createElement('div');
     
       // помещаем туда верстку
       newComponent.innerHTML = this.toString();
     
     this.container = newComponent.firstElementChild;
     
       // перекладываем верстку в нужный контейнер
       container.insertAdjacentElement(position || 'beforeend', newComponent.firstElementChild);
     
       // подчищаем за собой
       newComponent.remove();
     
       // прехук после монтирования
       this.afterMount()
   }

   /**
    * вызываеться при необходимости обновить компонент в верстке
    */
   update() { }

   /**
    * Уничтожения компонента из dom и вообще
    */
   unmount() {
       // выполняем прехуки
       this.beforeUnmount();
     
       // уничтожаем собственный контейнер
       this.removeContainer()

       // прехук после уничтожения
       this.afterUnmount();
   }

   // прехук до монтирования
   beforeMount() {}

   // прехук после монтирования
   afterMount() {}

   // прехук до размонтирования
   beforeUnmount() {}

   // прехук после размонтирования
   afterUnmount() {}

   // получение контейнера из дома куда смонтирован компонент
   getContainer() {
       if (this.container === undefined) {
           this.container = document.getElementById(this.id);
       }
       return this.container;
   }
  
  // уничтожаем собственный контейнер
  removeContainer() {
     if (this.container) {
        this.container.remove();
        this.container = undefined;
     }
   }

   // view компонента, обязательно должен содержать контейнер!!!
   render() {
       return `<div></div>`;
   }

   // текстовое представление компонента, по сути его рендер
   toString() {
       return this.render(this.options, this.state);
   }
  
  // observer
  // прдписка любого компонента или его части на событие для его автоматической отписки при уничтожении исходного компонента
   subscribeTo(target, eventName, handler) {
       const handlers = this.handlers[eventName] || [];
       // положим источник и обработчик в список события
       handlers.push({
           target,
           handler
       });
       this.handlers[eventName] = handlers;
       // подпишимся
       target.addEventListener(eventName, handler);
   }

   // отписаться от всех событий
   unsubscribeAll() {
       for (let eventName in this.handlers) {
           this.unsubscribeByEvent(eventName);
       }
   }

   // отписать всех от определенного события
   unsubscribeByEvent(eventName) {
       this.handlers[eventName].forEach(element => {
           element.target.removeEventListener(eventName, element.handler);
       });
   }
}