import { SETTINGS_FILE_TYPE } from "../constants/common-setting.constants";
import { RcFile } from "antd/es/upload/interface";
import defaultStore from "../constants/default-store.constants";
import { NewTabStateBase } from "../models/new-tab-state.model";
import { CURRENT_EXT_VERSION } from "../constants/update.constants";
import { getDeltaChanges } from "./update.utils";
import { changeCustomWallpaperFormBase64ToFile } from "./wallpaper.utils";

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
        const version = json && JSON.parse(json).update?.previousVersion;

        if (version) {
          resolve("");
          return;
        }
      } catch (e) {
        console.error(e);
      }

      resolve("commonSetting.import.parseError");
    };

    reader.readAsText(file);
  });
};

/**
 * Функция, конвертирующая json-строку в объект настроек, адаптированных под текущую версию приложения
 * @param json - Строка с настройками в формате json
 * @returns - Настройки {@link NewTabStateBase}
 * @category Utilities - Common Setting
 */
export const getSettingsAdaptedToCurrentVersion = (
  json: string
): NewTabStateBase => {
  const settings = JSON.parse(json);
  const version = settings.update?.previousVersion;

  if (version && version < CURRENT_EXT_VERSION) {
    const searchEngines = settings.searchEngines;
    const deltaSearchEngines = getDeltaChanges(
      CURRENT_EXT_VERSION,
      version
    ).searchEngines.filter(engine => !searchEngines.includes(engine));
    searchEngines.push(...deltaSearchEngines);

    changeCustomWallpaperFormBase64ToFile(settings.customWallpaper);
  }

  Object.keys(settings).forEach(name => {
    if (!Object.hasOwn(defaultStore, name)) {
      delete settings[name];
    }
  });

  return settings;
};
