import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Upload } from "antd";
import clsx from "clsx";
import { ReactComponent as WallpaperIcon } from "../../../../static/svgs/menu-settings/wallpaper-icon.svg";
import { Checkbox } from "antd/lib";
import {
  ACCEPT_IMG_FORMAT,
  BOTH_INPUT_NAME,
  DARK_INPUT_NAME,
  LIGHT_INPUT_NAME,
  WALLPAPER_PRESETS
} from "../../../../constants/wallpaper.constants";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import CollapseComponent from "../collapse.component";

/**
 * Передаваемые параметры для компонента настройки фонового изображения
 * @property open - Флаг открытия окна загрузки
 * @property isDark - Флаг темной темы
 * @property oneToBoth - Флаг, показывающий использование одного пользовательского фона для темной и светлой темы
 * @property wallpaper - Название фона приложения
 * @property disabledOk - Флаг недоступности кнопки Ok окна загрузки
 * @property searchEngine - Выбранная поисковая система
 * @property darkFileList - Список файлов(в данном случае один) для темной темы
 * @property lightFileList - Список файлов(в данном случае один) для светлой темы
 * @property uploadingErrors - Ошибки при загрузке фоновых изображений
 * @property onOk - Функция, вызываемая при нажатии кнопки Ok окна загрузки
 * @property onCancel - Функция, вызываемая при нажатии кнопки Cancel окна загрузки
 * @property customRequest - Функция, вызываемая при загрузке изображения
 * @property onChangeUpload - Функция, вызываемая после удачной загрузки
 * @property onRemoveUpload - Функция, вызываемая после удаления загруженного файла
 * @property onClickCheckbox - Функция, переключающая режим загрузки изображения: одно или два для темной и светлой темы
 * @property onClickWallpaper - Функция выбора предустановленный фоновых изображений
 * @interface
 */
export interface WallpaperSettingProps {
  open: boolean;
  isDark: boolean;
  oneToBoth: boolean;
  wallpaper: string;
  disabledOk: boolean;
  searchEngine: string;
  darkFileList: UploadFile[];
  lightFileList: UploadFile[];
  uploadingErrors: string[];
  onOk: () => void;
  onCancel: () => void;
  customRequest: (option: any) => void;
  onChangeUpload: (info: UploadChangeParam, inputName: string) => void;
  onRemoveUpload: (inputName: string) => void;
  onClickCheckbox: () => void;
  onClickWallpaper: (value: string) => void;
}

/**
 * Компонент настройки фонового изображения
 * @category Components
 */
const WallpaperSettingComponent: FC<WallpaperSettingProps> = ({
  open,
  isDark,
  oneToBoth,
  wallpaper,
  disabledOk,
  searchEngine,
  darkFileList,
  lightFileList,
  uploadingErrors,
  onOk,
  onCancel,
  customRequest,
  onChangeUpload,
  onRemoveUpload,
  onClickCheckbox,
  onClickWallpaper
}) => {
  const { t } = useTranslation();
  const getImage = (name: string): ReactNode => {
    return (
      <img
        className={clsx(
          "new-tab__settings-menu_wallpaper-content_choice-option",
          { selected: wallpaper === name },
          searchEngine
        )}
        title={t(`wallpaper.${name}`)}
        key={name}
        src={require(`../../../../static/imgs/${name}.png`)}
        onClick={() => onClickWallpaper(name)}
        alt={name}
      />
    );
  };

  return (
    <>
      <CollapseComponent
        icon={<WallpaperIcon />}
        title={t("wallpaper.title")}
        isDark={isDark}
        className="new-tab__settings-menu_wallpaper"
      >
        <div className="new-tab__settings-menu_wallpaper-content_choice">
          <div className="new-tab__settings-menu_wallpaper-content_choice-group">
            {WALLPAPER_PRESETS.map(name => getImage(name))}
          </div>
        </div>
      </CollapseComponent>
      <Modal
        className={clsx("new-tab__settings-menu_wallpaper-modal", {
          dark: isDark
        })}
        width="400px"
        title={t("wallpaper.uploading")}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText={t("wallpaper.ok")}
        cancelText={t("wallpaper.cancel")}
        okButtonProps={{ disabled: disabledOk }}
      >
        <div className="new-tab__settings-menu_wallpaper-modal-content">
          <div className="new-tab__settings-menu_wallpaper-modal-content_uploading-group">
            <div
              className={clsx(
                "new-tab__settings-menu_wallpaper-modal-content_uploading",
                { "auto-width": oneToBoth }
              )}
            >
              <Upload
                listType="picture"
                fileList={lightFileList}
                accept={ACCEPT_IMG_FORMAT}
                maxCount={1}
                onChange={info =>
                  onChangeUpload(
                    info,
                    oneToBoth ? BOTH_INPUT_NAME : LIGHT_INPUT_NAME
                  )
                }
                onRemove={() =>
                  onRemoveUpload(oneToBoth ? BOTH_INPUT_NAME : LIGHT_INPUT_NAME)
                }
                customRequest={customRequest}
              >
                <Button
                  className="new-tab__settings-menu_wallpaper-modal-content_uploading-button"
                  icon={<UploadOutlined />}
                >
                  {t(
                    `wallpaper.${
                      oneToBoth ? "uploadForBoth" : "uploadForLight"
                    }`
                  )}
                </Button>
              </Upload>
              <div className="new-tab__settings-menu_wallpaper-modal-content_uploading-error-message">
                {uploadingErrors[0]}
              </div>
            </div>
            {!oneToBoth && (
              <div className="new-tab__settings-menu_wallpaper-modal-content_uploading">
                <Upload
                  listType="picture"
                  fileList={darkFileList}
                  accept={ACCEPT_IMG_FORMAT}
                  maxCount={1}
                  onChange={info => onChangeUpload(info, DARK_INPUT_NAME)}
                  onRemove={() => onRemoveUpload(DARK_INPUT_NAME)}
                  customRequest={customRequest}
                >
                  <Button
                    className="new-tab__settings-menu_wallpaper-modal-content_uploading-button"
                    icon={<UploadOutlined />}
                  >
                    {t("wallpaper.uploadForDark")}
                  </Button>
                </Upload>
                <div className="new-tab__settings-menu_wallpaper-modal-content_uploading-error-message">
                  {uploadingErrors[1]}
                </div>
              </div>
            )}
          </div>
          <Checkbox
            className="new-tab__settings-menu_wallpaper-modal-content_one-to-both"
            checked={oneToBoth}
            onClick={onClickCheckbox}
            children={t(`wallpaper.forBothThemes`)}
          />
        </div>
      </Modal>
    </>
  );
};

export default WallpaperSettingComponent;
