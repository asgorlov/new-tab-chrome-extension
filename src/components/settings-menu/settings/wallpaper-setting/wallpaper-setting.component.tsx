import React, { FC, memo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ReactComponent as WallpaperIcon } from "../../../../static/svgs/menu-settings/wallpaper-icon.svg";
import {
  ACCEPT_IMG_FORMAT,
  BOTH_INPUT_NAME,
  DARK_INPUT_NAME,
  LIGHT_INPUT_NAME,
  WALLPAPER_PRESETS
} from "../../../../constants/wallpaper.constants";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import CollapseComponent from "../../../common/collapse/collapse.component";
import UploadComponent from "../../../common/upload/upload.component";
import { getUploadingErrorKey } from "../../../../utils/wallpaper.utils";
import ModalComponent from "../../../common/modal/modal.component";
import CheckboxComponent from "../../../common/checkbox/checkbox.component";
import { SEARCH_THEMES } from "../../../../constants/search-engine.constants";
import { CollapsedMenuSetting } from "../../../../constants/settings-menu.constants";

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
  onChangeUpload: (info: UploadChangeParam, inputName: string) => void;
  onRemoveUpload: (inputName: string) => void;
  onClickCheckbox: () => void;
  onClickWallpaper: (value: string) => void;
}

/**
 * Компонент настройки фонового изображения
 * @category Components
 */
const WallpaperSettingComponent: FC<WallpaperSettingProps> = memo(
  ({
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
          style={{ borderColor: SEARCH_THEMES[searchEngine] }}
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
          type={CollapsedMenuSetting.WALLPAPER}
          title={t("wallpaper.title")}
          isDark={isDark}
          className="new-tab__settings-menu_wallpaper"
        >
          <div className="new-tab__settings-menu_wallpaper-content_choice-group">
            {WALLPAPER_PRESETS.map(name => getImage(name))}
          </div>
        </CollapseComponent>
        <ModalComponent
          isDark={isDark}
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
              <UploadComponent
                isDark={isDark}
                uploadClassName={clsx(
                  "new-tab__settings-menu_wallpaper-modal-content_uploading",
                  { "auto-width": oneToBoth }
                )}
                uploadButtonClassName="new-tab__settings-menu_wallpaper-modal-content_uploading-button"
                validateUploadedFile={getUploadingErrorKey}
                uploadButtonText={t(
                  `wallpaper.${oneToBoth ? "uploadForBoth" : "uploadForLight"}`
                )}
                uploadError={uploadingErrors[0]}
                fileList={lightFileList}
                accept={ACCEPT_IMG_FORMAT}
                onChange={info =>
                  onChangeUpload(
                    info,
                    oneToBoth ? BOTH_INPUT_NAME : LIGHT_INPUT_NAME
                  )
                }
                onRemove={() =>
                  onRemoveUpload(oneToBoth ? BOTH_INPUT_NAME : LIGHT_INPUT_NAME)
                }
              />
              {!oneToBoth && (
                <UploadComponent
                  isDark={isDark}
                  uploadClassName="new-tab__settings-menu_wallpaper-modal-content_uploading"
                  uploadButtonClassName="new-tab__settings-menu_wallpaper-modal-content_uploading-button"
                  validateUploadedFile={getUploadingErrorKey}
                  uploadButtonText={t("wallpaper.uploadForDark")}
                  uploadError={uploadingErrors[1]}
                  fileList={darkFileList}
                  accept={ACCEPT_IMG_FORMAT}
                  onChange={info => onChangeUpload(info, DARK_INPUT_NAME)}
                  onRemove={() => onRemoveUpload(DARK_INPUT_NAME)}
                />
              )}
            </div>
            <CheckboxComponent
              isDark={isDark}
              checked={oneToBoth}
              onClick={onClickCheckbox}
              children={t(`wallpaper.forBothThemes`)}
            />
          </div>
        </ModalComponent>
      </>
    );
  }
);

export default WallpaperSettingComponent;
