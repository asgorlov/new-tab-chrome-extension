import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Collapse, Modal, Upload } from "antd";
import clsx from "clsx";
import { ReactComponent as WallpaperIcon } from "../../../../static/svgs/wallpaper-icon.svg";
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

interface WallpaperSettingProps {
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
  const { Panel } = Collapse;

  return (
    <>
      <Collapse accordion={true} bordered={false} expandIconPosition="end">
        <Panel
          className={clsx("new-tab__settings-menu_wallpaper", {
            dark: isDark
          })}
          header={
            <div
              className={clsx("new-tab__settings-menu_wallpaper-header", {
                dark: isDark
              })}
            >
              <WallpaperIcon />
              <span>{t("wallpaper.title")}</span>
            </div>
          }
          key={t("wallpaper.title")}
        >
          <div
            className={clsx("new-tab__settings-menu_wallpaper-content", {
              dark: isDark
            })}
          >
            <div className="new-tab__settings-menu_wallpaper-content_choice">
              <div className="new-tab__settings-menu_wallpaper-content_choice-group">
                {WALLPAPER_PRESETS.map(name => (
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
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
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
