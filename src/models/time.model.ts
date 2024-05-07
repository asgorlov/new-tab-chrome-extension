/**
 * Интерфейс настроек виджета часов
 * @property showSeconds - Флаг отображения секунд
 * @property showFlashing - Флаг отображения мигания при отсчете секунд
 * @property isCompact - Флаг отображения небольшого размера шрифтов виджета
 * @interface
 */
export interface TimeSettings {
  showSeconds: boolean;
  showFlashing: boolean;
  isCompact: boolean;
}
