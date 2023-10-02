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
