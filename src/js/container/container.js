import goblinImg from "../../img/goblin.png";

export default class MyContainer {
  constructor(element) {
    this._element = element;
    this._lastSelectedItem = null;
  }

  deleteRandomImage() {
    //Ищем в классе элемент по селектору
    const imgElement = this._element.querySelector(".img");

    //Удаляем элемент
    if (imgElement) {
      imgElement.remove();
    }
  }

  getRandomImage() {
    //Преобразуем HTMLCollection в настоящий массив (чтобы работали все методы массива)
    const items = [...this._element.querySelectorAll(".container-item")];

    //Формируем актуальный список div, в который можем закинуть картинку (используем метод массивов filter), при этом исключаем из выборки предыдущий div, где была картинка
    let availableItems = items;
    if (this._lastSelectedItem) {
      availableItems = items.filter((item) => item !== this._lastSelectedItem);
    }

    //Рандомно выбираем div из актуального списка
    const randomIndex = Math.floor(Math.random() * availableItems.length);

    const randomItem = availableItems[randomIndex];

    //Перезаписываем предыдущий div, чтобы картинка повторно туда не могла попасть
    this._lastSelectedItem = randomItem;

    //Создаем HTML элемент img, указывая путь на картинку и class
    const imgElement = document.createElement("img");
    imgElement.src = goblinImg;
    imgElement.classList.add("img");

    //Помещаем картинку в рандомный div из актуального списка
    randomItem.appendChild(imgElement);
  }
}
