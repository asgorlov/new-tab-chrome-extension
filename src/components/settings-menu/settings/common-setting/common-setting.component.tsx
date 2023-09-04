import React, { FC, memo, MouseEvent } from "react";
import { ReactComponent as CommonIcon } from "../../../../static/svgs/menu-settings/common-icon.svg";
import CollapseComponent from "../collapse.component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngine
} from "../../../../store/new-tab/new-tab.selectors";
import clsx from "clsx";
import { Button, Modal, Radio, Upload } from "antd";
import {
  BUTTON_NAMES,
  DEVICE_OPTION,
  SETTINGS_FILE_TYPE
} from "../../../../constants/common-setting.constants";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { RadioChangeEvent } from "antd/es/radio/interface";

/**
 * Передаваемые параметры для компонента общих настроек
 * @property disableOk - Флаг блокировки кнопки OK для загрузки настроек
 * @property radioOption - Опция выбора импорта\экспорта настроек
 * @property uploadingError - Текст ошибки при загрузке настроек
 * @property selectedOption - Выбранная опция общих настроек
 * @property settingFileList - Список загруженных файлов настроек
 * @property onOk - Функция при нажатии на кнопку OK
 * @property onCancel - Функция при нажатии на кнопку Cancel
 * @property onChange - Функция при загрузке файла настроек
 * @property onRemove - Функция при удалении файла настроек
 * @property customRequest - Функция, проставляющая статус загрузки настроек
 * @property onClickOpenModal - Функция, которая вызывается при открытии модального окна
 * @property onChangeRadioOption - Функция, проставляющая опцию выбора импорта\экспорта настроек
 * @interface
 */
export interface CommonSettingComponentProps {
  disableOk: boolean;
  radioOption: string;
  uploadingError: string;
  selectedOption: string;
  settingFileList: UploadFile[];
  onOk: (event: MouseEvent) => void;
  onCancel: () => void;
  onChange: (info: UploadChangeParam) => void;
  onRemove: (file: UploadFile) => void | boolean | Promise<void | boolean>;
  customRequest: (options: any) => void;
  onClickOpenModal: (event: MouseEvent<HTMLButtonElement>) => void;
  onChangeRadioOption: (event: RadioChangeEvent) => void;
}

/**
 * Компонент общих настроек
 * @category Components
 */
const CommonSettingComponent: FC<CommonSettingComponentProps> = ({
  disableOk,
  radioOption,
  uploadingError,
  selectedOption,
  settingFileList,
  onOk,
  onCancel,
  onChange,
  onRemove,
  customRequest,
  onClickOpenModal,
  onChangeRadioOption
}) => {
  const { t } = useTranslation();

  const isDark = useSelector(selectIsDark);
  const searchEngine = useSelector(selectSearchEngine);

  return (
    <CollapseComponent
      icon={<CommonIcon />}
      title={t("commonSetting.title")}
      isDark={isDark}
      className="new-tab__settings-menu_common"
    >
      <div
        className={clsx(
          "new-tab__settings-menu_common-buttons-group",
          searchEngine,
          { dark: isDark }
        )}
      >
        {Object.values(BUTTON_NAMES).map(name => {
          return (
            <button
              className={`new-tab__settings-menu_common-${name}-btn`}
              onClick={onClickOpenModal}
              name={name}
              key={name}
            >
              {t(`commonSetting.${name}.title`)}
            </button>
          );
        })}
      </div>
      <Modal
        className={clsx("new-tab__settings-menu_common-modal", {
          dark: isDark
        })}
        width="400px"
        title={t(`commonSetting.${selectedOption}.title`)}
        open={Boolean(selectedOption)}
        centered
        onOk={onOk}
        onCancel={onCancel}
        okText={t("commonSetting.ok")}
        cancelText={t("commonSetting.cancel")}
        okButtonProps={{ disabled: disableOk }}
      >
        <div className="new-tab__settings-menu_common-modal-content">
          {selectedOption === BUTTON_NAMES.reset ? (
            <span>{t("commonSetting.reset.message")}</span>
          ) : (
            <>
              <Radio.Group
                className="new-tab__settings-menu_common-modal-content_radio-group"
                onChange={onChangeRadioOption}
                value={radioOption}
              >
                <Radio value={DEVICE_OPTION}>
                  {t(`commonSetting.${selectedOption}.device`)}
                </Radio>
              </Radio.Group>
              {radioOption === DEVICE_OPTION &&
                selectedOption === BUTTON_NAMES.import && (
                  <>
                    <Upload
                      accept={SETTINGS_FILE_TYPE}
                      maxCount={1}
                      fileList={settingFileList}
                      onChange={onChange}
                      onRemove={onRemove}
                      className="new-tab__settings-menu_common-modal-content_uploading"
                      customRequest={customRequest}
                    >
                      <Button
                        className="new-tab__settings-menu_common-modal-content_uploading-button"
                        icon={<UploadOutlined />}
                      >
                        {t("commonSetting.import.uploadTitle")}
                      </Button>
                    </Upload>
                    <div className="new-tab__settings-menu_common-modal-content_error-message">
                      {uploadingError}
                    </div>
                  </>
                )}
            </>
          )}
        </div>
      </Modal>
    </CollapseComponent>
  );
};

export default memo(CommonSettingComponent);
