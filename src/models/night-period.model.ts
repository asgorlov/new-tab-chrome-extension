/**
 * Интерфейс ночного периода
 * @interface NightPeriod
 */
export interface NightPeriod {
  /**
   * Время заката
   */
  sunset: string | null;
  /**
   * Время восхода
   */
  sunrise: string | null;
}
