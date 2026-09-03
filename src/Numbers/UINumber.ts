export class UINumber {
  element: HTMLElement;

  constructor(lifetime: number) {
    const element = document.createElement("div");
    element.className = "plus-one";
    element.textContent = "+1";
    document.body.appendChild(element);
    this.element = element;
    setTimeout(this.Destroy.bind(this), lifetime * 1000);
  }

  Destroy() {
    this.element.remove();
  }
}
