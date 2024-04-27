import {
  CustomWallpaper,
  CustomWallpaperInBase64
} from "../models/custom-wallpaper.model";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import {
  ACCEPT_IMG_FORMAT,
  CUSTOM_WALLPAPER,
  DEFAULT_WALLPAPER,
  MIN_SIZE_IMG
} from "../constants/wallpaper.constants";
import {
  DARK_THEME_NAME,
  LIGHT_THEME_NAME
} from "../constants/common.constants";

/**
 * Функция, меняющая содержимое объекта фоновой картинки для темной и светлой темы из формата base64 в файл
 * @category Utilities - Wallpaper
 * @param customWallpaper - Объект фоновой картинки для темной и светлой темы
 * @returns - <b>True</b>, если объект был изменен
 */
export const changeCustomWallpaperFormBase64ToFile = (
  customWallpaper?: CustomWallpaper | CustomWallpaperInBase64 | null
): boolean => {
  let isChanged = false;

  if (customWallpaper) {
    if (typeof customWallpaper.lightTheme === "string") {
      isChanged = true;
      customWallpaper.lightTheme = convertBase64ToFile(
        customWallpaper.lightTheme,
        LIGHT_THEME_NAME
      );
    }

    if (typeof customWallpaper.darkTheme === "string") {
      isChanged = true;
      customWallpaper.darkTheme = convertBase64ToFile(
        customWallpaper.darkTheme,
        DARK_THEME_NAME
      );
    }
  }

  return isChanged;
};

/**
 * Функция, конвертирующая строку base64 в файл картинки
 * @category Utilities - Wallpaper
 * @param base64 - Строка в формате base64
 * @param name - Имя файла
 * @returns - Файл картинки {@link File}
 */
const convertBase64ToFile = (base64: string, name: string): File => {
  return new File([new Blob([base64])], name);
};

/**
 * Функция для получения url картинки в зависимости от темы
 * @category Utilities - Wallpaper
 * @param customWallpaper - Объект фоновой картинки для темной и светлой темы
 * @param wallpaper - Название кейса фоновой картинки
 * @param isDark - Флаг темной темы
 * @returns - Url картинки в формате base64
 */
export const getImgUrl = (
  customWallpaper: CustomWallpaper | null,
  wallpaper: string,
  isDark: boolean
): string => {
  if (wallpaper === DEFAULT_WALLPAPER) {
    return "";
  }

  if (wallpaper === CUSTOM_WALLPAPER) {
    if (isDark) {
      if (customWallpaper?.darkTheme) {
        return URL.createObjectURL(customWallpaper.darkTheme);
      }
    } else if (customWallpaper?.lightTheme) {
      return URL.createObjectURL(customWallpaper.lightTheme);
    }

    return "";
  }

  const theme = isDark ? DARK_THEME_NAME : LIGHT_THEME_NAME;
  return require(`../static/imgs/${wallpaper}-${theme}.jpg`);
};

/**
 * Функция, получающая файл загруженной картинки для компонента <tt>Upload</tt>
 * @category Utilities - Wallpaper
 * @param file - Файл фоновой картинки
 * @returns - Массив с загруженным файлом или пустой список {@link UploadFile}[]
 */
export const getInitialFileList = (file: File | null = null): UploadFile[] => {
  if (file) {
    const rcFile = {
      size: file.size,
      name: file.name,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: new Date(file.lastModified),
      uid: `rc-upload-${Date.now()}-1`
    } as RcFile;
    const uploadFile: UploadFile = {
      uid: rcFile.uid,
      size: rcFile.size,
      name: rcFile.name,
      type: rcFile.type,
      lastModified: rcFile.lastModified,
      lastModifiedDate: rcFile.lastModifiedDate,
      status: "done",
      percent: 100,
      thumbUrl: URL.createObjectURL(file),
      originFileObj: rcFile,
      response: file
    };

    return [uploadFile];
  }

  return [];
};

/**
 * Функция, позволяющая узнать загружена одна картинка или две
 * @category Utilities - Wallpaper
 * @param wallpaper - Объект фоновой картинки для темной и светлой темы
 * @returns - <b>True</b>, если для темной и светлой темы используется одна картинка
 */
export const getInitialOneToBoth = (
  wallpaper: CustomWallpaper | null
): boolean => {
  return !wallpaper || !!(wallpaper.lightTheme && !wallpaper.darkTheme);
};

/**
 * Функция, проверяющая тип и размер файла
 * @category Utilities - Wallpaper
 * @param file - Файл для проверки
 * @returns - Ключ локализации ошибки или пустую строку
 */
export const getUploadingErrorKey = (file: File): string => {
  const acceptFormats = ACCEPT_IMG_FORMAT.split(",");
  if (!acceptFormats.includes(file.type)) {
    return "wallpaper.unacceptableFormat";
  }

  if (file.size > MIN_SIZE_IMG) {
    return "wallpaper.unacceptableSize";
  }

  return "";
};
