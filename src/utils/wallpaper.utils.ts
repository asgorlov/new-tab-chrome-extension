import { CustomWallpaper } from "../models/custom-wallpaper.model";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import {
  ACCEPT_IMG_FORMAT,
  CUSTOM_WALLPAPER,
  DEFAULT_WALLPAPER,
  MIN_SIZE_IMG
} from "../constants/wallpaper.constants";

/**
 * Функция, конвертирующая файл картинки в base64
 * @category Utilities - Wallpaper
 * @param file - Файл картинки
 * @returns - Строку в формате base64 {@link File}
 */
export const convertImgToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject("Can't convert file to base64");
    reader.readAsDataURL(file);
  });
};

/**
 * Функция, конвертирующая строку base64 в файл картинки
 * @category Utilities - Wallpaper
 * @param base64 - Строка в формате base64
 * @param name - Имя файла
 * @returns - Файл картинки {@link File}
 */
export const convertBase64ToImg = (base64: string, name: string): File => {
  return new File([new Blob([base64])], name);
};

/**
 * Функция для получения url картинки в зависимости от темы
 * @category Utilities - Wallpaper
 * @param customWallpaper - Объекта фоновой картинки для темной и светлой темы
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
    let url;
    if (customWallpaper) {
      url =
        isDark && customWallpaper.darkTheme
          ? customWallpaper.darkTheme
          : customWallpaper.lightTheme;
    }

    return url ?? "";
  }

  return require(`../static/imgs/${wallpaper}-${
    isDark ? "dark" : "light"
  }.jpg`);
};

/**
 * Функция, получающая файл загруженной картинки для компонента <tt>Upload</tt>
 * @category Utilities - Wallpaper
 * @param imgUrl - Строка картинки в формате base64
 * @param theme - Тема приложения
 * @returns - Массив с загруженным файлом или пустой список {@link UploadFile}[]
 */
export const getInitialFileList = (
  imgUrl: string | undefined,
  theme: "dark" | "light"
): UploadFile[] => {
  if (imgUrl) {
    const file = convertBase64ToImg(imgUrl, `custom-${theme}`);
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
      thumbUrl: imgUrl,
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
