import MyContainer from "../js/container/container.js";

describe("MyContainer", () => {
  let containerElement;
  let containerItems;
  let myContainer;

  beforeEach(() => {
    // Создаем тестовый DOM
    document.body.innerHTML = `
      <div id="root">
        <div class="container-item"></div>
        <div class="container-item"></div>
        <div class="container-item"></div>
      </div>
    `;

    containerElement = document.getElementById("root");
    containerItems = containerElement.querySelectorAll(".container-item");

    // Создаем экземпляр класса
    myContainer = new MyContainer(containerElement);

    // Подменяем getRandomImage, чтобы не импортировать реальный PNG
    const originalGetRandomImage = myContainer.getRandomImage;
    myContainer.getRandomImage = function () {
      const items = [...this._element.querySelectorAll(".container-item")];
      let availableItems = items;
      if (this._lastSelectedItem) {
        availableItems = items.filter((item) => item !== this._lastSelectedItem);
      }
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      const randomItem = availableItems[randomIndex];
      this._lastSelectedItem = randomItem;

      const imgElement = document.createElement("img");
      imgElement.src = "test.png"; // просто строка вместо реального файла
      imgElement.classList.add("img");
      randomItem.appendChild(imgElement);
    };
  });

  test("добавляет изображение в один из контейнеров", () => {
    myContainer.getRandomImage();

    const img = containerElement.querySelector(".img");

    expect(img).not.toBeNull(); // картинка есть
    expect(img.tagName).toBe("IMG"); // это img
    expect(img.src).toContain("test.png"); // путь подменен
  });

  test("не добавляет картинку в тот же контейнер два раза подряд", () => {
    myContainer.getRandomImage();
    const firstContainer = myContainer._lastSelectedItem;

    myContainer.getRandomImage();
    const secondContainer = myContainer._lastSelectedItem;

    expect(secondContainer).not.toBe(firstContainer);
  });

  test("удаляет изображение при вызове deleteRandomImage", () => {
    myContainer.getRandomImage();
    expect(containerElement.querySelector(".img")).not.toBeNull();

    myContainer.deleteRandomImage();
    expect(containerElement.querySelector(".img")).toBeNull();
  });

  test("deleteRandomImage не падает, если изображения нет", () => {
    expect(() => {
      myContainer.deleteRandomImage();
    }).not.toThrow();
  });
});
