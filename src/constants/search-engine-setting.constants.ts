/**
 * Регулярное выражение для определения, что строка является ссылкой
 * @category Constants - Search Engine Setting
 */
export const URL_REG_EXP = /^(http|https):\/\/[^ "]+$/i;
/**
 * Регулярное выражение для определения, что последний символ строки является спец символом
 * @category Constants - Search Engine Setting
 */
export const LAST_SPEC_CHAR_REG_EXP = /\W$/;
/**
 * Регулярное выражение для определения, что строка содержит сетевой протокол
 * @category Constants - Search Engine Setting
 */
export const PROTOCOL_REG_EXP = /^.*:\/\//i;

/**
 * Статус ошибки для поля ввода
 * @category Constants - Search Engine Setting
 */
export const ERROR_INPUT_STATUS = "error";
