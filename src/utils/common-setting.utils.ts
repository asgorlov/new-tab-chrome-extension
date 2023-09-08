/**
 * Функция для скачивания файла
 * @param data - строка с данными
 * @param fileName - имя скачиваемого файла
 * @param fileType - формат скачиваемого файла
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
