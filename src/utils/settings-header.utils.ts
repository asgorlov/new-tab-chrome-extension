/**
 * Функция для перехода на указанный элемент
 * @param element - Элемент, на который будет переход
 */
export const scrollToElement = (element?: Element | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Функция для расчета индекса следующего для перехода элемента
 * @param buttonName - Имя нажатой кнопки в меню навигации поиска
 * @param currentFoundElement - Текущий номер элемента в поиске
 * @param foundElements - Массив с элементами, удовлетворяющими поиску
 * @returns - Индекс следующего для перехода элемента
 */
export const getNextElementIndex = (
  buttonName: string,
  currentFoundElement: number,
  foundElements: Element[]
): number => {
  const currentElementIndex = currentFoundElement - 1;

  if (buttonName === "up") {
    return currentElementIndex === 0
      ? foundElements.length - 1
      : currentElementIndex - 1;
  } else {
    return currentElementIndex === foundElements.length - 1
      ? 0
      : currentElementIndex + 1;
  }
};
