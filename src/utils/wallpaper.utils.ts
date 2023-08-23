import { CustomWallpaper } from "../models/custom-wallpaper.model";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import {
  ACCEPT_IMG_FORMAT,
  MIN_SIZE_IMG
} from "../constants/wallpaper.constants";

/**
 * Метод, конвертирующий файл картинки в base64
 * @category Wallpaper Utilities
 * @param file - файл картинки
 * @returns - строку в формате base64 {@link File}
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
 * Метод, конвертирующий строку base64 в файл картинки
 * @category Wallpaper Utilities
 * @param base64 - строка в формате base64
 * @param name - имя файла
 * @returns - файл картинки {@link File}
 */
export const convertBase64ToImg = (base64: string, name: string): File => {
  return new File([new Blob([base64])], name);
};

/**
 * Метод для получения url картинки в зависимости от темы
 * @category Wallpaper Utilities
 * @param wallpaper - объекта картинки для фона
 * @param isDark - флаг темной темы
 * @returns - url картинки в формате base64
 */
export const getImgUrl = (
  wallpaper: CustomWallpaper,
  isDark: boolean
): string => {
  const url =
    isDark && wallpaper.darkTheme ? wallpaper.darkTheme : wallpaper.lightTheme;

  return url ?? "";
};

/**
 * Метод, получающий файл загруженной картинки для компонента <tt>Upload</tt>
 * @category Wallpaper Utilities
 * @param imgUrl - строка картинки в формате base64
 * @param theme - тема приложения
 * @returns - массив с загруженным файлом или пустой список {@link UploadFile}[]
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
 * Метод, позволяющий узнать загружена одна картинка или две
 * @category Wallpaper Utilities
 * @param wallpaper - объект фоновой картинки для темной и светлой темы
 * @returns - <b>true</b>, если для темной и светлой темы используется одна картинка
 */
export const getInitialOneToBoth = (
  wallpaper: CustomWallpaper | null
): boolean => {
  return !wallpaper || !!(wallpaper.lightTheme && !wallpaper.darkTheme);
};

/**
 * Метод, проверяющий тип и размер файла
 * @category Wallpaper Utilities
 * @param file - файл для проверки
 * @returns - ключ локализации ошибки или пустую строку
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
