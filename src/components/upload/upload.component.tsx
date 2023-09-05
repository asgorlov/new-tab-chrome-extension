import React, { FC, memo } from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadListType, UploadProps } from "antd/es/upload/interface";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

/**
 * Передаваемые параметры для компонента обновлений приложения
 * @property isDark - Флаг темной темы
 * @property listType - Тип отображения загруженных файлов
 * @property maxCount - Максимальное количество загруженных файлов
 * @property uploadError - Текст ошибки при загрузке
 * @property uploadClassName - Класс поля загрузки
 * @property uploadButtonText - Текст кнопки для загрузки
 * @property validateUploadedFile - Функция валидации загруженного файла
 * @property uploadButtonClassName - Класс кнопки для загрузки
 * @interface
 */
export interface UploadComponentProps
  extends Omit<UploadProps, "listType" | "maxCount"> {
  isDark?: boolean;
  listType?: UploadListType;
  maxCount?: number;
  uploadError?: string;
  uploadClassName?: string;
  uploadButtonText?: string;
  validateUploadedFile?: (file: File) => string;
  uploadButtonClassName?: string;
}

/**
 * Компонент поля загрузки файлов
 * @category Components
 */
const UploadComponent: FC<UploadComponentProps> = ({
  isDark = false,
  listType = "picture",
  maxCount = 1,
  uploadError = "",
  uploadClassName = "",
  uploadButtonText,
  validateUploadedFile,
  uploadButtonClassName = "",
  ...rest
}) => {
  const { t } = useTranslation();

  const customRequest = (options: any) => {
    const errorKey = validateUploadedFile
      ? validateUploadedFile(options.file)
      : "";

    if (errorKey) {
      options.onError(new Error(t(errorKey)));
    } else {
      options.onSuccess(options.file);
    }
  };

  return (
    <div className={clsx("new-tab__upload", { dark: isDark }, uploadClassName)}>
      <Upload
        maxCount={maxCount}
        listType={listType}
        customRequest={customRequest}
        {...rest}
      >
        <Button
          className={clsx("new-tab__upload-button", uploadButtonClassName)}
          icon={<UploadOutlined />}
        >
          {uploadButtonText ?? t("uploadTitle")}
        </Button>
      </Upload>
      <div className="new-tab__upload-error-message">{uploadError}</div>
    </div>
  );
};

export default memo(UploadComponent);
