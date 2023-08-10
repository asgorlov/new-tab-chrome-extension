/**
 * Интерфейс пользовательских фоновых картинок
 * @interface CustomWallpaper
 */
export interface CustomWallpaper {
  /**
   * Картинка в формате base64 для светлой темы
   */
  lightTheme?: string;
  /**
   * Картинка в формате base64 для темной темы
   */
  darkTheme?: string;
}
