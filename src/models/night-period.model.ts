/**
 * Интерфейс ночного периода
 * @property sunset - Время заката
 * @property sunrise - Время восхода
 * @interface
 */
export interface NightPeriod {
  sunset: string | null;
  sunrise: string | null;
}
