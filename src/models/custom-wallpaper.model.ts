/**
 * Интерфейс пользовательских фоновых картинок
 * @property lightTheme - Картинка в формате base64 для светлой темы
 * @property darkTheme - Картинка в формате base64 для темной темы
 * @interface
 */
export interface CustomWallpaper {
  lightTheme?: string;
  darkTheme?: string;
}
