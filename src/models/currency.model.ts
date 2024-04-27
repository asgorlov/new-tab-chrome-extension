/**
 * Интерфейс валюты
 * @property code - Код валюты
 * @property rate - Курс текущей валюты к основной
 * @interface
 */
export interface Currency {
  code: string;
  rate?: number;
}

/**
 * Интерфейс валют для конвертации
 * @property selected - Список выбранных для конвертации валют
 * @property available - Список доступных для конвертации валют
 * @interface
 */
export interface ConvertibleCurrencies {
  selected: Currency[];
  available: string[];
  lastCallApi?: Date;
}

/**
 * Интерфейс основной валюты
 * @property selected - Выбранные основные валюты
 * @property default - Основная валюта по умолчанию (зависит от местоположения или доллар)
 * @interface
 */
export interface MainCurrency {
  selected: string | null;
  default: string;
  ratio: number;
}

/**
 * Интерфейс основной валюты
 * @property mainCurrency - Выбранная основная валюта
 * @property selectedCurrencies - Список выбранных для конвертации валют
 * @interface
 */
export interface GettingExchangeRateParams {
  mainCurrency: Currency;
  selectedCurrencies: Currency[];
}
