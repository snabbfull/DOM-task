import MyContainer from "./container/container.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = document.querySelector("body");
  let finishGame = document.createElement("button");
  finishGame.textContent = "Завершить игру";
  finishGame.classList.add("finish");

  game.append(finishGame);

  const container = document.querySelector(".container");

  for (let i = 0; i < 16; i++) {
    const containerItem = document.createElement("div");
    containerItem.classList.add("container-item");
    containerItem.dataset.id = i;

    container.append(containerItem);
  }

  const myContainer = new MyContainer(container);

  window.container = myContainer;

  const randomImgInterval = setInterval(() => {
    myContainer.deleteRandomImage();
    myContainer.getRandomImage();
  }, 1000);

  window.randomImgInterval = randomImgInterval;

  finishGame = document.addEventListener("click", () => {
    clearInterval(window.randomImgInterval);
  });
});
