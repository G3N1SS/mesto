export class Section {
  #renderer;
  #containerParentElement;
  #renderItems;

  constructor({items, renderer}, containerSelector) {
    this.#renderItems = items;
    this.#renderer = renderer;
    this.#containerParentElement = document.querySelector(containerSelector);
  }

  addItem(elementNode) {
    this.#containerParentElement.prepend(elementNode);
  }
  rendererItems() {
    this.#renderItems.forEach((item) => {
        this.#renderer(item);
    });
  }
}