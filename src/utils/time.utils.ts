import i18n from "i18next";

/**
 * Функция для конвертирования значения времени (часы, минуты, секунды) в массив символов, состоящий из двух элементов.
 * @category Utilities - Time
 * @param value - Значение для конвертирования в строку
 * @returns - Массив символов. Если на входе пришло 1, то на выходе будет [0, 1], если
 */
export const convertToFixedString = (value: number): string[] =>
  value.toString().padStart(2, "0").split("");

/**
 * Функция для получения форматированной даты
 * @category Utilities - Time
 * @param date - Дата для форматирования
 * @returns - Строка в формате "день недели, число месяц год"
 */
export const getFormattedDateStringForTimeWidget = (date: Date): string => {
  const dayOfWeek = i18n.t(`time.dayOfWeek.${date.getDay()}`);
  const month = i18n.t(`time.month.${date.getMonth()}`);

  return `${dayOfWeek}, ${date.getDate()} ${month} ${date.getFullYear()}`;
};
