export class Section {
  #renderer;
  #containerParentElement;

  constructor({renderer}, containerSelector) {
    this.#renderer = renderer;
    this.#containerParentElement = document.querySelector(containerSelector);
  }

  addItemPrepend(elementNode) {
    this.#containerParentElement.prepend(elementNode);
  }

  addItemAppend(elementNode) {
    this.#containerParentElement.append(elementNode);
  }
  rendererItems(items) {
    items.forEach((item) => {
        this.#renderer(item);
    });
  }
}