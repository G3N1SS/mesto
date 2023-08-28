export class Section {
  #renderer;
  #containerParentElement;

  constructor({renderer}, containerSelector) {
    this.#renderer = renderer;
    this.#containerParentElement = document.querySelector(containerSelector);
  }

  addItem(elementNode) {
    this.#containerParentElement.prepend(elementNode);
  }
  rendererItems(items) {
    items.forEach((item) => {
        this.#renderer(item);
    });
  }
}