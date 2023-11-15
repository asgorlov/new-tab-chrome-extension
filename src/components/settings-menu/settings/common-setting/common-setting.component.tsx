import React, { FC, memo, MouseEvent } from "react";
import { ReactComponent as CommonIcon } from "../../../../static/svgs/menu-settings/common-icon.svg";
import CollapseComponent from "../../../common/collapse/collapse.component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngine
} from "../../../../store/new-tab/new-tab.selectors";
import clsx from "clsx";
import { Radio } from "antd";
import {
  BUTTON_NAMES,
  DEVICE_OPTION,
  SETTINGS_FILE_TYPE
} from "../../../../constants/common-setting.constants";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { RadioChangeEvent } from "antd/es/radio/interface";
import UploadComponent from "../../../common/upload/upload.component";
import ModalComponent from "../../../common/modal/modal.component";
import RadioComponent from "../../../common/radio/radio.component";
import { SEARCH_THEMES } from "../../../../constants/search-engine.constants";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { CollapsedMenuSetting } from "../../../../constants/settings-menu.constants";
import {
  DARK_TEXT_COLOR,
  LIGHT_TEXT_COLOR
} from "../../../../constants/common.constants";

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
 * @property onClickOpenModal - Функция, которая вызывается при открытии модального окна
 * @property validateUploading - Функция валидации загруженного файла
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
  onClickOpenModal: (event: MouseEvent<HTMLButtonElement>) => void;
  validateUploading: (options: RcCustomRequestOptions) => Promise<void>;
  onChangeRadioOption: (event: RadioChangeEvent) => void;
}

/**
 * Компонент общих настроек
 * @category Components
 */
const CommonSettingComponent: FC<CommonSettingComponentProps> = memo(
  ({
    disableOk,
    radioOption,
    uploadingError,
    selectedOption,
    settingFileList,
    onOk,
    onCancel,
    onChange,
    onRemove,
    validateUploading,
    onClickOpenModal,
    onChangeRadioOption
  }) => {
    const { t } = useTranslation();

    const isDark = useSelector(selectIsDark);
    const searchEngine = useSelector(selectSearchEngine);

    const borderColor = isDark ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR;
    const showUpload =
      radioOption === DEVICE_OPTION && selectedOption === BUTTON_NAMES.import;
    const onMouseLeave = (e: MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.color = borderColor);
    const onMouseOver = (e: MouseEvent<HTMLButtonElement>) =>
      (e.currentTarget.style.color = SEARCH_THEMES[searchEngine]);

    return (
      <CollapseComponent
        icon={<CommonIcon />}
        type={CollapsedMenuSetting.COMMON}
        title={t("commonSetting.title")}
        className="new-tab__settings-menu_common"
      >
        <div
          className={clsx("new-tab__settings-menu_common_btn-group", {
            dark: isDark
          })}
        >
          {Object.values(BUTTON_NAMES).map(name => (
            <button
              onMouseLeave={onMouseLeave}
              onMouseOver={onMouseOver}
              children={t(`commonSetting.${name}.title`)}
              onClick={onClickOpenModal}
              style={{ color: borderColor }}
              name={name}
              key={name}
            />
          ))}
        </div>
        <ModalComponent
          isDark={isDark}
          title={t(`commonSetting.${selectedOption}.title`)}
          open={Boolean(selectedOption)}
          centered
          onOk={onOk}
          onCancel={onCancel}
          okText={t("commonSetting.ok")}
          cancelText={t("commonSetting.cancel")}
          okButtonProps={{ disabled: disableOk }}
        >
          <div
            className={clsx("new-tab__settings-menu_common-modal-content", {
              dark: isDark
            })}
          >
            {selectedOption === BUTTON_NAMES.reset ? (
              <span>{t("commonSetting.reset.message")}</span>
            ) : (
              <>
                <Radio.Group
                  className="new-tab__settings-menu_common-modal-content_radio-group"
                  onChange={onChangeRadioOption}
                  value={radioOption}
                >
                  <RadioComponent value={DEVICE_OPTION} isDark={isDark}>
                    {t(`commonSetting.${selectedOption}.device`)}
                  </RadioComponent>
                </Radio.Group>
                {showUpload && (
                  <UploadComponent
                    customRequest={validateUploading}
                    isDark={isDark}
                    uploadError={uploadingError}
                    uploadClassName="new-tab__settings-menu_common-modal-content_uploading"
                    accept={SETTINGS_FILE_TYPE}
                    fileList={settingFileList}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </>
            )}
          </div>
        </ModalComponent>
      </CollapseComponent>
    );
  }
);

export default CommonSettingComponent;
