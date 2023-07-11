import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";
import clsx from "clsx";
import { ReactComponent as WallpaperIcon } from "../../../static/svgs/wallpaper-icon.svg";
import { WALLPAPER_PRESETS } from "../../../constants/wallpaper.constants";

interface WallpaperSettingProps {
  isDark: boolean;
  wallpaper: string;
  searchEngine: string;
  onClickWallpaper: (wallpaper: string) => void;
}

const WallpaperSettingComponent: FC<WallpaperSettingProps> = ({
  isDark,
  wallpaper,
  searchEngine,
  onClickWallpaper
}) => {
  const { t } = useTranslation();
  const { Panel } = Collapse;

  return (
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
            <span>{t("wallpaper.choice")}</span>
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
                  src={require(`../../../static/imgs/${name}.png`)}
                  onClick={() => onClickWallpaper(name)}
                  alt={name}
                />
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

export default WallpaperSettingComponent;
