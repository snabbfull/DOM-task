import MyContainer from "./container/container.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = new MyContainer(document.querySelector(".container"));

  window.container = container;

  const randomImgInterval = setInterval(() => {
    const image = document.querySelector(".img");
    if (image) {
      container.deleteRandomImage();
    }
    container.getRandomImage();
  }, 1000);
});
