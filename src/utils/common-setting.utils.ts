import { SETTINGS_FILE_TYPE } from "../constants/common-setting.constants";
import { RcFile } from "antd/es/upload/interface";

/**
 * Функция для скачивания файла
 * @param data - Строка с данными
 * @param fileName - Имя скачиваемого файла
 * @param fileType - Формат скачиваемого файла
 * @category Utilities - Common Setting
 */
export const downloadFile = (
  data: string,
  fileName: string,
  fileType: string
) => {
  const blob = new Blob([data], { type: fileType });
  const anchor = document.createElement("a");
  const eventInitDict = {
    view: window,
    bubbles: true,
    cancelable: true
  };

  anchor.download = fileName;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.dispatchEvent(new MouseEvent("click", eventInitDict));
  anchor.remove();
};

/**
 * Функция валидации для загруженных настроек
 * @param file - Проверяемый файл
 * @returns - Ключ ошибки или пустую строку
 * @category Utilities - Common Setting
 */
export const getSettingsUploadingErrorKey = async (
  file: RcFile
): Promise<string> => {
  if (file.type !== SETTINGS_FILE_TYPE) {
    return "commonSetting.import.typeError";
  }

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      try {
        const json = event.target?.result?.toString();

        if (json && JSON.parse(json)) {
          resolve("");
          return;
        }
      } catch (e) {
        console.error(e);
      }

      resolve("commonSetting.import.parseError");
    };

    reader.readAsDataURL(file);
  });
};
