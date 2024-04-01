/**
 * Интерфейс пользовательских фоновых картинок в виде файлов
 * @property lightTheme - Картинка для светлой темы
 * @property darkTheme - Картинка для темной темы
 * @interface
 */
export interface CustomWallpaper {
  lightTheme?: File;
  darkTheme?: File;
}

/**
 * Интерфейс пользовательских фоновых картинок в виде строки формата base64
 * @property lightTheme - Картинка для светлой темы
 * @property darkTheme - Картинка для темной темы
 * @interface
 */
export interface CustomWallpaperInBase64 {
  lightTheme?: string;
  darkTheme?: string;
}
